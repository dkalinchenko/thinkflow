/**
 * AI-Powered Product Research for ThinkFlow
 * Uses curated product database with AI-powered matching
 */

import { AI, aiService } from './ai.js';
import { AffiliateProduct, generateAffiliateLink, generateSearchLink } from './affiliate.js';
import { loadProducts, getProductsByCategory, getAllProducts } from './product-database.js';

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
 * Research products from curated database with AI-powered selection
 * Uses curated product database instead of AI-generated products
 */
export async function researchProducts(category, options = {}) {
    const { 
        maxProducts = 5, 
        priceRange = null,
        criteria = [],
        specificQuery = null 
    } = options;
    
    const config = getCategoryConfig(category);
    if (!config && !specificQuery) {
        throw new Error(`Unknown category: ${category}`);
    }
    
    try {
        // Load products from database
        await loadProducts();
        
        // Get products for the category
        let products = getProductsByCategory(category);
        
        // If no products in category, return empty with message
        if (products.length === 0) {
            console.log(`No products found in category: ${category}`);
            // Fall back to all products if category is empty
            products = getAllProducts();
            if (products.length === 0) {
                throw new Error('No products available. Please add products to data/products.csv');
            }
        }
        
        // Filter by price range if specified
        if (priceRange) {
            products = products.filter(p => {
                if (!p.price) return true; // Include products without price
                if (priceRange.min && p.price < priceRange.min) return false;
                if (priceRange.max && p.price > priceRange.max) return false;
                return true;
            });
        }
        
        // If we have criteria and AI is available, use AI to select best matches
        if (criteria.length > 0 && aiService.isAvailable()) {
            products = await aiSelectProducts(products, criteria, maxProducts);
        } else {
            // Otherwise, return random selection up to maxProducts
            products = shuffleArray(products).slice(0, maxProducts);
        }
        
        // Convert to AffiliateProduct instances
        return products.map(p => new AffiliateProduct({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: p.price,
            rating: p.rating,
            reviewCount: 0, // CSV doesn't have this yet
            imageUrl: p.image_url || '',
            asin: '', // We don't have real ASINs
            amazonUrl: p.affiliate_link, // Use the curated affiliate link
            specs: p.specs || {},
            pros: [],
            cons: []
        }));
    } catch (error) {
        console.error('Product research error:', error);
        throw error;
    }
}

/**
 * Use AI to intelligently select best matching products from database
 */
async function aiSelectProducts(products, criteria, maxProducts) {
    if (products.length <= maxProducts) {
        return products;
    }
    
    // Build product summaries for AI
    const productSummaries = products.map((p, index) => ({
        index,
        name: p.name,
        price: p.price || 'Unknown',
        specs: p.specs || {},
        description: p.description || ''
    }));
    
    // Build criteria summary
    const criteriaSummary = criteria.map(c => 
        `${c.name} (weight: ${c.weight}): ${c.description || ''}`
    ).join('\n');
    
    const prompt = `You are a product selection expert. Given the following criteria and available products, select the ${maxProducts} products that best match the criteria.

CRITERIA (prioritize by weight):
${criteriaSummary}

AVAILABLE PRODUCTS:
${JSON.stringify(productSummaries, null, 2)}

Select the ${maxProducts} best matching products based on the criteria. Consider product names, specs, and descriptions.

Respond with ONLY a JSON array of product indices (0-based), ranked by match quality. Example: [2, 0, 4]`;

    try {
        const response = await aiService.call(prompt);
        
        // Parse the response to get indices
        let jsonStr = response;
        const arrayMatch = response.match(/\[[\d,\s]+\]/);
        if (arrayMatch) {
            jsonStr = arrayMatch[0];
        }
        
        const indices = JSON.parse(jsonStr);
        
        if (Array.isArray(indices) && indices.every(i => typeof i === 'number')) {
            // Return products in the order selected by AI
            return indices
                .filter(i => i >= 0 && i < products.length)
                .slice(0, maxProducts)
                .map(i => products[i]);
        }
    } catch (error) {
        console.error('AI product selection failed, using random selection:', error);
    }
    
    // Fallback to random selection
    return shuffleArray(products).slice(0, maxProducts);
}

/**
 * Shuffle array randomly
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
${product.price ? `Price: $${product.price}` : ''}
${product.rating ? `Rating: ${product.rating}/5` : ''}

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
        const systemPrompt = 'You are a product evaluation expert. Provide accurate ratings based on product specifications and general knowledge. Always respond with valid JSON.';
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        const response = await aiService.call(fullPrompt);
        
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
        const systemPrompt = 'You are a product comparison expert helping consumers make informed purchase decisions. Always respond with valid JSON.';
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        const response = await aiService.call(fullPrompt);
        
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
