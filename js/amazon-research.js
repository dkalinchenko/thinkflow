/**
 * AI-Powered Amazon Product Research for ThinkFlow
 * Uses AI to research, compare, and analyze products from Amazon
 */

import { AI, aiService } from './ai.js';
import { AffiliateProduct, generateAffiliateLink } from './affiliate.js';

/**
 * Product category configurations with research prompts
 */
const CATEGORY_CONFIG = {
    laptop: {
        name: 'Laptops',
        amazonCategory: 'electronics',
        searchTerms: ['laptop', 'notebook'],
        defaultCriteria: [
            { name: 'Performance', weight: 2.0, description: 'CPU, RAM, and processing power' },
            { name: 'Display Quality', weight: 1.5, description: 'Resolution, color accuracy, brightness' },
            { name: 'Battery Life', weight: 1.8, description: 'Hours of use between charges' },
            { name: 'Build Quality', weight: 1.2, description: 'Materials, durability, premium feel' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' },
            { name: 'Portability', weight: 1.0, description: 'Weight and size for travel' }
        ],
        specFields: ['processor', 'ram', 'storage', 'display', 'battery', 'weight', 'graphics']
    },
    smartphone: {
        name: 'Smartphones',
        amazonCategory: 'electronics',
        searchTerms: ['smartphone', 'cell phone'],
        defaultCriteria: [
            { name: 'Camera Quality', weight: 2.0, description: 'Photo and video capabilities' },
            { name: 'Performance', weight: 1.8, description: 'Speed, multitasking, gaming' },
            { name: 'Battery Life', weight: 1.7, description: 'Daily usage between charges' },
            { name: 'Display', weight: 1.5, description: 'Screen quality, size, refresh rate' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' },
            { name: 'Software & Updates', weight: 1.0, description: 'OS experience, update support' }
        ],
        specFields: ['display', 'processor', 'ram', 'storage', 'camera', 'battery', '5g']
    },
    headphones: {
        name: 'Headphones',
        amazonCategory: 'electronics',
        searchTerms: ['headphones', 'earbuds', 'wireless headphones'],
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, treble balance' },
            { name: 'Noise Cancellation', weight: 1.8, description: 'ANC effectiveness' },
            { name: 'Comfort', weight: 1.5, description: 'Fit, weight, padding quality' },
            { name: 'Battery Life', weight: 1.3, description: 'Hours of playback' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability and materials' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to quality' }
        ],
        specFields: ['driver', 'frequency', 'battery', 'anc', 'bluetooth', 'weight']
    },
    camera: {
        name: 'Cameras',
        amazonCategory: 'electronics',
        searchTerms: ['mirrorless camera', 'dslr camera', 'digital camera'],
        defaultCriteria: [
            { name: 'Image Quality', weight: 2.0, description: 'Sensor, resolution, dynamic range' },
            { name: 'Autofocus', weight: 1.8, description: 'Speed, accuracy, tracking' },
            { name: 'Video Capability', weight: 1.5, description: '4K, frame rates, stabilization' },
            { name: 'Lens Ecosystem', weight: 1.3, description: 'Available lenses and compatibility' },
            { name: 'Ergonomics', weight: 1.2, description: 'Handling, controls, build' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capability' }
        ],
        specFields: ['sensor', 'resolution', 'iso', 'autofocus', 'video', 'stabilization']
    },
    tablet: {
        name: 'Tablets',
        amazonCategory: 'electronics',
        searchTerms: ['tablet', 'ipad', 'android tablet'],
        defaultCriteria: [
            { name: 'Display Quality', weight: 2.0, description: 'Screen size, resolution, colors' },
            { name: 'Performance', weight: 1.8, description: 'Speed for apps and games' },
            { name: 'Battery Life', weight: 1.5, description: 'Hours of usage' },
            { name: 'Productivity', weight: 1.3, description: 'Stylus support, keyboard compatibility' },
            { name: 'App Ecosystem', weight: 1.2, description: 'Tablet-optimized apps available' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        specFields: ['display', 'processor', 'ram', 'storage', 'battery', 'stylus']
    },
    smartwatch: {
        name: 'Smartwatches',
        amazonCategory: 'electronics',
        searchTerms: ['smartwatch', 'fitness tracker'],
        defaultCriteria: [
            { name: 'Health Tracking', weight: 2.0, description: 'Heart rate, sleep, fitness accuracy' },
            { name: 'Battery Life', weight: 1.8, description: 'Days between charges' },
            { name: 'Display', weight: 1.5, description: 'Readability, brightness, AOD' },
            { name: 'Smart Features', weight: 1.3, description: 'Apps, notifications, payments' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability, water resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' }
        ],
        specFields: ['display', 'battery', 'sensors', 'water_resistance', 'gps', 'storage']
    }
};

/**
 * Get category configuration
 */
export function getCategoryConfig(category) {
    return CATEGORY_CONFIG[category] || null;
}

/**
 * Get all available categories
 */
export function getCategories() {
    return Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
        id,
        name: config.name
    }));
}

/**
 * AI-powered product research
 * Uses AI to find and analyze products based on category and criteria
 */
export async function researchProducts(category, options = {}) {
    const { 
        maxProducts = 5, 
        priceRange = null,
        specificQuery = null 
    } = options;
    
    const config = getCategoryConfig(category);
    if (!config && !specificQuery) {
        throw new Error(`Unknown category: ${category}`);
    }
    
    const categoryName = config?.name || 'Products';
    const searchContext = specificQuery || `top ${categoryName} in 2024-2025`;
    
    // Build the research prompt
    const prompt = buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, config?.specFields);
    
    try {
        const response = await aiService.chat([
            { role: 'system', content: getResearchSystemPrompt() },
            { role: 'user', content: prompt }
        ]);
        
        // Parse the AI response into product objects
        const products = parseProductResponse(response);
        
        // Convert to AffiliateProduct instances
        return products.map(p => new AffiliateProduct({
            ...p,
            amazonUrl: p.asin ? generateAffiliateLink(p.asin) : ''
        }));
    } catch (error) {
        console.error('Product research error:', error);
        throw new Error('Failed to research products. Please try again.');
    }
}

/**
 * Get system prompt for product research
 */
function getResearchSystemPrompt() {
    return `You are an expert product researcher and tech analyst. Your job is to provide accurate, up-to-date information about consumer electronics and products.

When researching products:
1. Focus on popular, well-reviewed products available on Amazon
2. Include real product names and accurate specifications
3. Provide genuine pros and cons based on expert reviews
4. Use realistic Amazon star ratings (1-5 scale)
5. Include estimated prices (may vary)
6. Generate realistic-looking Amazon ASINs (10-character alphanumeric codes starting with B0)

IMPORTANT: Always respond with valid JSON. Do not include any text before or after the JSON array.`;
}

/**
 * Build research prompt for AI
 */
function buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, specFields) {
    let prompt = `Research and provide detailed information about ${maxProducts} top ${categoryName} products based on: "${searchContext}"

`;

    if (priceRange) {
        prompt += `Price range: ${priceRange.min ? '$' + priceRange.min : 'Any'} - ${priceRange.max ? '$' + priceRange.max : 'Any'}\n\n`;
    }

    prompt += `For each product, provide:
1. name: Full product name
2. asin: Amazon ASIN (generate a realistic one like B0XXXXXXXXX)
3. description: Brief 1-2 sentence description
4. price: Estimated price in USD (number only)
5. rating: Amazon star rating (1-5, can use decimals like 4.5)
6. reviewCount: Approximate number of reviews
7. imageUrl: Leave empty string ""
8. specs: Object with key specifications`;

    if (specFields && specFields.length > 0) {
        prompt += ` (include: ${specFields.join(', ')})`;
    }

    prompt += `
9. pros: Array of 3-4 key advantages
10. cons: Array of 2-3 notable drawbacks

Respond with a JSON array of products. Example format:
[
  {
    "name": "Product Name Model",
    "asin": "B0XXXXXXXXX",
    "description": "Brief description",
    "price": 999,
    "rating": 4.5,
    "reviewCount": 1234,
    "imageUrl": "",
    "specs": {
      "processor": "Apple M3 Pro",
      "ram": "18GB"
    },
    "pros": ["Great battery life", "Excellent display"],
    "cons": ["Expensive", "Limited ports"]
  }
]

Provide exactly ${maxProducts} products, ranked by overall quality and popularity.`;

    return prompt;
}

/**
 * Parse AI response into product objects
 */
function parseProductResponse(response) {
    // Extract JSON from response (handle potential markdown code blocks)
    let jsonStr = response;
    
    // Try to extract JSON from code blocks
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
    } else {
        // Try to find JSON array directly
        const arrayMatch = response.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
            jsonStr = arrayMatch[0];
        }
    }
    
    try {
        const products = JSON.parse(jsonStr);
        
        if (!Array.isArray(products)) {
            throw new Error('Response is not an array');
        }
        
        // Validate and clean each product
        return products.map(p => ({
            name: p.name || 'Unknown Product',
            asin: p.asin || generateRandomASIN(),
            description: p.description || '',
            price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || null,
            rating: typeof p.rating === 'number' ? Math.min(5, Math.max(1, p.rating)) : null,
            reviewCount: parseInt(p.reviewCount) || 0,
            imageUrl: p.imageUrl || '',
            specs: p.specs || {},
            pros: Array.isArray(p.pros) ? p.pros : [],
            cons: Array.isArray(p.cons) ? p.cons : []
        }));
    } catch (error) {
        console.error('Failed to parse product response:', error, jsonStr);
        throw new Error('Failed to parse product data');
    }
}

/**
 * Generate a random ASIN for fallback
 */
function generateRandomASIN() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let asin = 'B0';
    for (let i = 0; i < 8; i++) {
        asin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return asin;
}

/**
 * AI-powered product evaluation
 * Evaluates a product against specific criteria
 */
export async function evaluateProduct(product, criteria) {
    const prompt = `Evaluate the following product against specific criteria.

Product: ${product.name}
${product.description ? `Description: ${product.description}` : ''}
${product.specs ? `Specs: ${JSON.stringify(product.specs)}` : ''}
${product.pros?.length ? `Pros: ${product.pros.join(', ')}` : ''}
${product.cons?.length ? `Cons: ${product.cons.join(', ')}` : ''}
${product.rating ? `Amazon Rating: ${product.rating}/5 (${product.reviewCount} reviews)` : ''}

Rate this product on the following criteria (1-5 scale, where 5 is excellent):

${criteria.map((c, i) => `${i + 1}. ${c.name}: ${c.description || ''}`).join('\n')}

Respond with a JSON object containing ratings and brief explanations:
{
  "ratings": {
    "criterion_id": { "value": 4, "explanation": "Brief reason" }
  }
}

Use the criterion names as keys (lowercase, underscores for spaces).`;

    try {
        const response = await aiService.chat([
            { role: 'system', content: 'You are a product evaluation expert. Provide accurate ratings based on product specifications and general knowledge. Always respond with valid JSON.' },
            { role: 'user', content: prompt }
        ]);
        
        // Parse response
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1] || jsonMatch[0];
        }
        
        const result = JSON.parse(jsonStr);
        
        // Map ratings back to criterion IDs
        const ratings = {};
        criteria.forEach(c => {
            const key = c.name.toLowerCase().replace(/\s+/g, '_');
            if (result.ratings && result.ratings[key]) {
                ratings[c.id] = {
                    value: Math.min(5, Math.max(1, result.ratings[key].value)),
                    explanation: result.ratings[key].explanation || ''
                };
            }
        });
        
        return ratings;
    } catch (error) {
        console.error('Product evaluation error:', error);
        throw new Error('Failed to evaluate product');
    }
}

/**
 * AI-powered batch evaluation of all products
 */
export async function evaluateAllProducts(products, criteria) {
    const allScores = {};
    
    for (const product of products) {
        try {
            const ratings = await evaluateProduct(product, criteria);
            
            // Map ratings to product alternative ID if available
            const productId = product.id || product.asin;
            allScores[productId] = {};
            
            Object.entries(ratings).forEach(([criterionId, scoreData]) => {
                allScores[productId][criterionId] = scoreData;
            });
        } catch (error) {
            console.error(`Failed to evaluate ${product.name}:`, error);
        }
    }
    
    return allScores;
}

/**
 * Get comparison insights between products
 */
export async function getProductComparison(products, criteria) {
    const productList = products.map(p => `- ${p.name}: ${p.description || ''}`).join('\n');
    const criteriaList = criteria.map(c => `- ${c.name} (weight: ${c.weight})`).join('\n');
    
    const prompt = `Compare these products for a buyer trying to make a decision:

Products:
${productList}

Criteria being evaluated:
${criteriaList}

Provide a comparison analysis in JSON format:
{
  "winner": "Product name that's the best overall choice",
  "winnerReason": "2-3 sentence explanation of why it wins",
  "tradeoffs": [
    "Key tradeoff 1 between options",
    "Key tradeoff 2"
  ],
  "buyerProfiles": {
    "Budget Buyer": "Which product and why",
    "Performance Seeker": "Which product and why",
    "Best Value": "Which product and why"
  },
  "watchOuts": ["Things the buyer should consider or verify"]
}`;

    try {
        const response = await aiService.chat([
            { role: 'system', content: 'You are a product comparison expert helping consumers make informed purchase decisions. Always respond with valid JSON.' },
            { role: 'user', content: prompt }
        ]);
        
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1] || jsonMatch[0];
        }
        
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Comparison analysis error:', error);
        throw new Error('Failed to generate comparison insights');
    }
}

export default {
    getCategoryConfig,
    getCategories,
    researchProducts,
    evaluateProduct,
    evaluateAllProducts,
    getProductComparison
};
