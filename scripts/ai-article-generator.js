/**
 * AI Article Generator for Decision Pages
 * Uses DeepSeek Reasoner API to generate comprehensive comparison articles
 */

/**
 * Generate a comprehensive tech article comparing decision alternatives
 * @param {Object} decision - The decision data object
 * @returns {Promise<string|null>} - Markdown article content or null on failure
 */
async function generateArticle(decision) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
        console.warn('DEEPSEEK_API_KEY not configured. Skipping article generation.');
        return null;
    }
    
    try {
        const prompt = buildPrompt(decision);
        const article = await callDeepSeekReasoner(apiKey, prompt);
        return article;
    } catch (error) {
        console.error('Article generation failed:', error.message);
        return null;
    }
}

/**
 * Build the prompt for the AI article generation
 * @param {Object} decision - The decision data
 * @returns {string} - Formatted prompt
 */
function buildPrompt(decision) {
    const { title, description, criteria, alternatives, results, scores, insights } = decision;
    
    // Build criteria section
    const criteriaSection = criteria.map(c => {
        let text = `- **${c.name}** (weight: ${c.weight})`;
        if (c.description) text += `\n  Description: ${c.description}`;
        if (c.rationale) text += `\n  Rationale for weight: ${c.rationale}`;
        return text;
    }).join('\n');
    
    // Build alternatives section
    const alternativesSection = alternatives.map((alt, index) => {
        let text = `${index + 1}. **${alt.name}**`;
        if (alt.description) text += `\n   Description: ${alt.description}`;
        if (alt.pros && alt.pros.length > 0) text += `\n   Pros: ${alt.pros.join(', ')}`;
        if (alt.cons && alt.cons.length > 0) text += `\n   Cons: ${alt.cons.join(', ')}`;
        if (alt.price) text += `\n   Price: $${alt.price}`;
        if (alt.rating) text += `\n   User Rating: ${alt.rating}/5`;
        if (alt.amazonUrl) text += `\n   Amazon Link: ${alt.amazonUrl}`;
        return text;
    }).join('\n\n');
    
    // Build detailed scoring section
    let scoringSection = '';
    if (scores) {
        scoringSection = '\n## Detailed Scoring with Explanations\n\n';
        alternatives.forEach(alt => {
            const altScores = scores[alt.id];
            if (altScores) {
                scoringSection += `### ${alt.name}\n`;
                criteria.forEach(criterion => {
                    const scoreData = altScores[criterion.id];
                    if (scoreData) {
                        const value = typeof scoreData === 'object' ? scoreData.value : scoreData;
                        const explanation = typeof scoreData === 'object' ? scoreData.explanation : null;
                        scoringSection += `- **${criterion.name}**: ${value}/5`;
                        if (explanation) {
                            scoringSection += `\n  *${explanation}*`;
                        }
                        scoringSection += '\n';
                    }
                });
                scoringSection += '\n';
            }
        });
    }
    
    // Build results section
    const resultsSection = results.map((r, index) => {
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
        return `${medal} **${r.name}**: ${r.totalScore.toFixed(2)} points (${r.percentage.toFixed(1)}%)`;
    }).join('\n');
    
    // Build insights section if available
    let insightsSection = '';
    if (insights) {
        insightsSection = '\n## AI-Generated Insights\n';
        if (insights.recommendation) {
            insightsSection += `\n**Recommendation**: ${insights.recommendation}\n`;
        }
        if (insights.decision_drivers && insights.decision_drivers.length > 0) {
            insightsSection += `\n**Key Decision Drivers**:\n${insights.decision_drivers.map(d => `- ${d}`).join('\n')}\n`;
        }
        if (insights.trade_offs) {
            insightsSection += `\n**Trade-offs**:\n`;
            Object.entries(insights.trade_offs).forEach(([alt, tradeoff]) => {
                insightsSection += `- ${alt}: ${tradeoff}\n`;
            });
        }
        if (insights.risks && insights.risks.length > 0) {
            insightsSection += `\n**Potential Risks**:\n${insights.risks.map(r => `- ${r}`).join('\n')}\n`;
        }
        if (insights.confidence) {
            insightsSection += `\n**Confidence Level**: ${insights.confidence.level}`;
            if (insights.confidence.explanation) {
                insightsSection += ` - ${insights.confidence.explanation}`;
            }
            insightsSection += '\n';
        }
    }
    
    const winner = results[0];
    
    return `You are a technical writer creating a comprehensive product/option comparison article for a decision-making website.

# Decision Context

**Title**: ${title}
**Description**: ${description || 'A systematic comparison to find the best option.'}

# Evaluation Criteria

The following criteria were used to evaluate each option, with weights indicating relative importance:

${criteriaSection}

# Alternatives Compared

${alternativesSection}

${scoringSection}

# Final Rankings

${resultsSection}

**Winner**: ${winner.name} with ${winner.totalScore.toFixed(2)} points (${winner.percentage.toFixed(1)}%)
${insightsSection}

---

# Your Task

Write a comprehensive, well-structured comparison article (800-1500 words) that:

1. **Executive Summary** (2-3 paragraphs): Open with a compelling overview of the decision, why it matters, and preview the winner with key differentiators.

2. **Methodology** (1 paragraph): Briefly explain the weighted criteria evaluation approach used.

3. **Criteria Deep-Dive** (1 section): Explain each evaluation criterion and why it matters for this decision.

4. **Head-to-Head Comparison** (main section): Analyze each alternative in detail, discussing their strengths and weaknesses based on the scores and explanations provided. Use the scoring explanations to justify ratings.

5. **Verdict & Recommendations** (conclusion): Summarize why the winner excels, when alternatives might be better choices, and provide actionable guidance.

## Writing Guidelines

- Use clear headings with markdown (##, ###)
- Include bullet points for easy scanning
- Maintain an objective, analytical tone
- Reference specific scores when discussing performance
- Use the provided explanations to add depth to your analysis
- Make the article informative and valuable to readers making similar decisions
- Do NOT use phrases like "based on our analysis" or "we found" - write in third person
- Do NOT include a title/h1 heading - the page template already has one
- Start directly with the executive summary content

## Amazon Affiliate Links

For EVERY product/alternative in this comparison, you MUST create Amazon affiliate links:
- Create search URLs in this exact format: https://www.amazon.com/s?k={product_name_url_encoded}&tag=optimind09-20
- URL encode the product name (replace spaces with + signs, keep alphanumeric and hyphens)
- Use markdown link format: [Check Price on Amazon](url) or [View on Amazon](url)
- Place these links in TWO locations:
  1. At the end of each product's detailed analysis section
  2. In a "Where to Buy" section at the end of the article with all products listed
- Example: For "MacBook Pro M3 16GB", use: https://www.amazon.com/s?k=MacBook+Pro+M3+16GB&tag=optimind09-20
- Include a brief call-to-action like "Check current pricing and reviews on Amazon"

## SEO Best Practices

Follow these SEO guidelines to maximize article visibility:
- Use the main topic/product names naturally in the first paragraph
- Include relevant keywords in headings (h2, h3) without keyword stuffing
- Write descriptive, benefit-focused subheadings that include product names
- Use semantic variations of key terms throughout the article
- Structure content with clear hierarchy (introduction → details → conclusion)
- Include comparison phrases like "vs", "compared to", "best for" where appropriate
- Write scannable content with short paragraphs (2-4 sentences)
- Use numbers and specific data points (scores, percentages, prices) for credibility
- End sections with clear takeaways or transitions
- Ensure the conclusion includes actionable recommendations with key terms

Output the article in markdown format.`;
}

/**
 * Call DeepSeek Reasoner API with retry logic
 * @param {string} apiKey - DeepSeek API key
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} - Generated article content
 */
async function callDeepSeekReasoner(apiKey, prompt) {
    const maxRetries = 2;
    const baseDelay = 2000;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
            
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-reasoner',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 4000,
                    temperature: 0.7
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid API response structure');
            }
            
            return data.choices[0].message.content;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(`Attempt ${attempt + 1}: Request timed out`);
            } else {
                console.warn(`Attempt ${attempt + 1}: ${error.message}`);
            }
            
            if (attempt < maxRetries) {
                const delay = baseDelay * Math.pow(2, attempt);
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}

/**
 * Generate a one-sentence summary for the decision guides index
 * @param {Object} decision - The decision data object
 * @returns {Promise<string|null>} - Summary text or null on failure
 */
async function generateSummary(decision) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
        return null;
    }
    
    const winner = decision.results[0];
    const prompt = `Write ONE compelling sentence (max 150 characters) that summarizes this decision comparison and announces the winner.

Decision: ${decision.title}
Description: ${decision.description || 'A product comparison'}
Winner: ${winner.name} with ${winner.percentage.toFixed(1)}% score
Alternatives compared: ${decision.alternatives.map(a => a.name).join(', ')}

Requirements:
- ONE sentence only
- Include the winner's name
- Make it engaging and informative for someone browsing a list of guides
- Max 150 characters
- No emoji or special formatting
- Do not start with "This comparison" or similar`;

    try {
        const response = await callDeepSeekChat(apiKey, prompt);
        return response ? response.trim() : null;
    } catch (error) {
        console.error('Summary generation failed:', error.message);
        return null;
    }
}

/**
 * Call DeepSeek Chat API (faster than Reasoner, good for short tasks)
 * @param {string} apiKey - DeepSeek API key
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} - Generated content
 */
async function callDeepSeekChat(apiKey, prompt) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid API response structure');
        }
        
        return data.choices[0].message.content;
    } catch (error) {
        clearTimeout(timeout);
        throw error;
    }
}

module.exports = { generateArticle, generateSummary };
