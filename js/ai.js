/**
 * AI Service Adapter for OptiMind AI
 * Handles communication with AI providers (DeepSeek, OpenAI, etc.)
 */

import { AICacheDB, SettingsDB } from './db.js';
import { hashString, decryptApiKey } from './utils.js';

/**
 * AI Provider Configurations
 */
const PROVIDERS = {
    deepseek: {
        name: 'DeepSeek',
        baseUrl: 'https://api.deepseek.com/v1',
        model: 'deepseek-chat',
        maxTokens: 2000
    },
    openai: {
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-4-turbo-preview',
        maxTokens: 2000
    },
    anthropic: {
        name: 'Anthropic',
        baseUrl: 'https://api.anthropic.com/v1',
        model: 'claude-3-sonnet-20240229',
        maxTokens: 2000
    }
};

/**
 * AI Service Class
 */
class AIService {
    constructor() {
        this.provider = 'deepseek';
        this.apiKey = null;
        this.initialized = false;
    }
    
    /**
     * Initialize AI service with settings
     */
    async init() {
        const provider = await SettingsDB.get('aiProvider', 'deepseek');
        const encryptedKey = await SettingsDB.get('apiKey', '');
        
        this.provider = provider;
        this.apiKey = encryptedKey ? decryptApiKey(encryptedKey) : null;
        this.initialized = true;
    }
    
    /**
     * Check if AI is available
     */
    isAvailable() {
        return this.initialized && this.apiKey && this.apiKey.length > 0;
    }
    
    /**
     * Set provider and API key
     */
    async setConfig(provider, apiKey) {
        this.provider = provider;
        this.apiKey = apiKey;
    }
    
    /**
     * Make API call to AI provider
     */
    async call(prompt, options = {}) {
        if (!this.isAvailable()) {
            throw new Error('AI service not configured. Please add your API key in Settings.');
        }
        
        const config = PROVIDERS[this.provider];
        if (!config) {
            throw new Error(`Unknown AI provider: ${this.provider}`);
        }
        
        // Check cache first
        const cacheKey = await hashString(prompt + this.provider);
        const cached = await AICacheDB.get(cacheKey);
        if (cached && !options.skipCache) {
            return cached;
        }
        
        // Make API call
        const response = await this._makeRequest(config, prompt, options);
        
        // Cache response
        if (response) {
            await AICacheDB.set(cacheKey, response);
        }
        
        return response;
    }
    
    /**
     * Make HTTP request to AI provider
     */
    async _makeRequest(config, prompt, options) {
        const { temperature = 0.3, maxTokens = config.maxTokens } = options;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
        
        // Add provider-specific headers
        if (this.provider === 'anthropic') {
            headers['x-api-key'] = this.apiKey;
            headers['anthropic-version'] = '2023-06-01';
            delete headers['Authorization'];
        }
        
        const body = this._buildRequestBody(config, prompt, { temperature, maxTokens });
        
        try {
            const response = await fetch(`${config.baseUrl}/chat/completions`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.error?.message || `API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this._parseResponse(data);
        } catch (error) {
            console.error('AI API Error:', error);
            throw error;
        }
    }
    
    /**
     * Build request body based on provider
     */
    _buildRequestBody(config, prompt, options) {
        if (this.provider === 'anthropic') {
            return {
                model: config.model,
                max_tokens: options.maxTokens,
                messages: [{ role: 'user', content: prompt }]
            };
        }
        
        // OpenAI/DeepSeek compatible format
        return {
            model: config.model,
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert decision-making consultant. Always respond with valid JSON when requested.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        };
    }
    
    /**
     * Parse response from AI provider
     */
    _parseResponse(data) {
        if (this.provider === 'anthropic') {
            return data.content?.[0]?.text || '';
        }
        
        return data.choices?.[0]?.message?.content || '';
    }
    
    /**
     * Parse JSON from AI response (handles markdown code blocks)
     */
    parseJSON(response) {
        // Try direct parse first
        try {
            return JSON.parse(response);
        } catch (e) {
            // Try to extract JSON from markdown code block
            const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1]);
            }
            
            // Try to find JSON array or object
            const arrayMatch = response.match(/\[[\s\S]*\]/);
            if (arrayMatch) {
                return JSON.parse(arrayMatch[0]);
            }
            
            const objectMatch = response.match(/\{[\s\S]*\}/);
            if (objectMatch) {
                return JSON.parse(objectMatch[0]);
            }
            
            throw new Error('Could not parse JSON from AI response');
        }
    }
}

// Singleton instance
export const aiService = new AIService();

/**
 * AI Prompt Templates
 */
export const AIPrompts = {
    /**
     * Generate criteria for a decision
     */
    generateCriteria(decision, count = 5) {
        return `You are an expert decision-making consultant. Analyze this decision context:

Title: ${decision.title}
Description: ${decision.description || 'No description provided'}
${decision.alternatives?.length ? `Alternatives being considered: ${decision.alternatives.map(a => a.name).join(', ')}` : ''}

Generate ${count} evaluation criteria that are:
1. Specific to this decision context
2. Measurable or clearly evaluable
3. Important for making the right choice
4. Not redundant with each other
${decision.criteria?.length ? `5. Different from existing criteria: ${decision.criteria.map(c => c.name).join(', ')}` : ''}

For each criterion, provide:
- name: Clear, concise name (2-5 words)
- description: Why this matters for THIS specific decision (1-2 sentences)
- weight: Recommended importance (0.5-3.0, where 1.0=normal importance)
- rationale: Brief explanation of the weight recommendation

Return ONLY a JSON array with no additional text: [{"name": "...", "description": "...", "weight": 1.0, "rationale": "..."}]`;
    },
    
    /**
     * Generate alternatives for a decision
     */
    generateAlternatives(decision, count = 5) {
        return `You are a decision-making advisor. Based on this decision:

Title: ${decision.title}
Description: ${decision.description || 'No description provided'}
Evaluation Criteria: ${decision.criteria?.map(c => `${c.name} (weight: ${c.weight})`).join(', ') || 'Not yet defined'}

Suggest ${count} viable alternatives/options that:
1. Are realistic and feasible
2. Provide genuine variety (different trade-offs)
3. Can be evaluated against the stated criteria
${decision.alternatives?.length ? `4. Are different from existing alternatives: ${decision.alternatives.map(a => a.name).join(', ')}` : ''}

For each alternative, provide:
- name: Clear, specific name
- description: Brief overview (2-3 sentences)
- pros: Top 2-3 advantages
- cons: Top 2-3 disadvantages
- feasibility: Assessment of how realistic this option is (Low/Medium/High)

Return ONLY a JSON array with no additional text: [{"name": "...", "description": "...", "pros": ["..."], "cons": ["..."], "feasibility": "..."}]`;
    },
    
    /**
     * Evaluate an alternative against a criterion
     */
    evaluateScore(decision, alternative, criterion) {
        return `You are an objective analyst evaluating decision alternatives.

Context:
Decision: ${decision.title}
${decision.description ? `Description: ${decision.description}` : ''}

Alternative: ${alternative.name}
${alternative.description ? `Details: ${alternative.description}` : ''}

Criterion: ${criterion.name}
${criterion.description ? `Definition: ${criterion.description}` : ''}

Provide an objective score from 1-5 stars where:
- 1 star: Poor/Significantly below expectations
- 2 stars: Below average/Some major limitations
- 3 stars: Average/Acceptable but not exceptional
- 4 stars: Good/Above average with minor limitations
- 5 stars: Excellent/Outstanding in this area

IMPORTANT: Use the FULL range (1-5). Don't cluster scores around 3-4. Be decisive and differentiate clearly between alternatives. Reserve 5 stars for truly exceptional performance and 1-2 stars for genuine weaknesses.

Also provide a brief explanation (2-3 sentences) for your score.

Return ONLY JSON with no additional text: {"score": <number>, "explanation": "..."}`;
    },
    
    /**
     * Batch evaluate all scores for an alternative
     */
    evaluateAlternative(decision, alternative) {
        const criteriaList = decision.criteria.map(c => 
            `- ${c.name}: ${c.description || 'No description'}`
        ).join('\n');
        
        return `You are an objective analyst evaluating decision alternatives.

Decision: ${decision.title}
${decision.description ? `Description: ${decision.description}` : ''}

Alternative to evaluate: ${alternative.name}
${alternative.description ? `Details: ${alternative.description}` : ''}

Criteria to evaluate:
${criteriaList}

For each criterion, provide a score from 1-5 stars where:
- 1 star: Poor/Significantly below expectations
- 2 stars: Below average/Some major limitations
- 3 stars: Average/Acceptable but not exceptional
- 4 stars: Good/Above average with minor limitations
- 5 stars: Excellent/Outstanding in this area

CRITICAL: Use the FULL range (1-5). Don't cluster all scores around 3-4. Be decisive and differentiate clearly. A product can have 5 stars in one area and 2 stars in another. This helps users understand real trade-offs. Reserve 5 stars for truly exceptional performance and use 1-2 stars for genuine weaknesses.

For each criterion, also provide a brief explanation (2-3 sentences) justifying your score.

Return ONLY a JSON object with no additional text, where keys are criterion names:
{
  "criterion_name": {"score": <number>, "explanation": "..."},
  ...
}`;
    },
    
    /**
     * Generate insights on decision results
     */
    generateInsights(decision, results) {
        const rankedResults = results
            .map(r => `${r.rank}. ${r.name}: ${r.totalScore} points (${r.percentage}%)`)
            .join('\n');
        
        return `You are a decision analyst. Review these decision results:

Decision: ${decision.title}
${decision.description ? `Context: ${decision.description}` : ''}

Criteria (with weights):
${decision.criteria.map(c => `- ${c.name} (weight: ${c.weight})`).join('\n')}

Results (ranked by weighted score):
${rankedResults}

Provide strategic insights:

1. recommendation: Which alternative would you recommend and why? (2-3 sentences)
2. decision_drivers: Which 2-3 criteria had the most impact on the results?
3. trade_offs: For the top 2-3 alternatives, what are the key trade-offs?
4. risks: What are potential risks or concerns with the top choice?
5. sensitivity: How sensitive is this decision? Would small changes in weights significantly change the outcome?
6. confidence: Rate your confidence in this decision (Low/Medium/High) and explain why.

Return ONLY JSON with no additional text:
{
  "recommendation": "...",
  "decision_drivers": ["...", "..."],
  "trade_offs": {"Alternative Name": "trade-off description", ...},
  "risks": ["...", "..."],
  "sensitivity": "...",
  "confidence": {"level": "...", "explanation": "..."}
}`;
    }
};

/**
 * High-level AI functions for the app
 */
export const AI = {
    /**
     * Generate criteria suggestions
     */
    async suggestCriteria(decision, count = 5) {
        const prompt = AIPrompts.generateCriteria(decision, count);
        const response = await aiService.call(prompt);
        return aiService.parseJSON(response);
    },
    
    /**
     * Generate alternative suggestions
     */
    async suggestAlternatives(decision, count = 5) {
        const prompt = AIPrompts.generateAlternatives(decision, count);
        const response = await aiService.call(prompt);
        return aiService.parseJSON(response);
    },
    
    /**
     * Evaluate a single score
     */
    async evaluateScore(decision, alternative, criterion) {
        const prompt = AIPrompts.evaluateScore(decision, alternative, criterion);
        const response = await aiService.call(prompt);
        return aiService.parseJSON(response);
    },
    
    /**
     * Evaluate all scores for an alternative
     */
    async evaluateAlternative(decision, alternative) {
        const prompt = AIPrompts.evaluateAlternative(decision, alternative);
        const response = await aiService.call(prompt);
        const parsed = aiService.parseJSON(response);
        
        // Map results to criterion IDs
        const scores = {};
        for (const criterion of decision.criteria) {
            const result = parsed[criterion.name];
            if (result) {
                scores[criterion.id] = {
                    score: result.score,
                    explanation: result.explanation
                };
            }
        }
        
        return scores;
    },
    
    /**
     * Evaluate all alternatives
     */
    async evaluateAll(decision) {
        const results = {};
        
        for (const alternative of decision.alternatives) {
            results[alternative.id] = await this.evaluateAlternative(decision, alternative);
        }
        
        return results;
    },
    
    /**
     * Generate insights on results
     */
    async generateInsights(decision, results) {
        const prompt = AIPrompts.generateInsights(decision, results);
        const response = await aiService.call(prompt);
        return aiService.parseJSON(response);
    },
    
    /**
     * Check if AI is available
     */
    isAvailable() {
        return aiService.isAvailable();
    },
    
    /**
     * Initialize AI service
     */
    async init() {
        await aiService.init();
    }
};

export default AI;
