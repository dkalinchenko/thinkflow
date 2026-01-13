/**
 * AI-Powered Amazon Product Research for OptiMind
 * Uses AI to research, compare, and analyze products from Amazon
 */

import { AI, aiService } from './ai.js';
import { AffiliateProduct, generateSearchLink } from './affiliate.js';

/**
 * Product category configurations with research prompts
 */
const CATEGORY_CONFIG = {
    laptop: {
        name: 'Laptops',
        amazonCategory: 'electronics',
        searchTerms: ['laptop', 'notebook'],
        priceRanges: {
            low: { min: 300, max: 700, label: 'Budget ($300-$700)' },
            mid: { min: 700, max: 1500, label: 'Mid-Range ($700-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
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
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 900, label: 'Mid-Range ($500-$900)' },
            high: { min: 900, max: null, label: 'Premium ($900+)' }
        },
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
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 300, label: 'Mid-Range ($150-$300)' },
            high: { min: 300, max: null, label: 'Premium ($300+)' }
        },
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
        priceRanges: {
            low: { min: 400, max: 1000, label: 'Entry-Level ($400-$1,000)' },
            mid: { min: 1000, max: 2500, label: 'Mid-Range ($1,000-$2,500)' },
            high: { min: 2500, max: null, label: 'Professional ($2,500+)' }
        },
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
        priceRanges: {
            low: { min: 150, max: 400, label: 'Budget ($150-$400)' },
            mid: { min: 400, max: 800, label: 'Mid-Range ($400-$800)' },
            high: { min: 800, max: null, label: 'Premium ($800+)' }
        },
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
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Health Tracking', weight: 2.0, description: 'Heart rate, sleep, fitness accuracy' },
            { name: 'Battery Life', weight: 1.8, description: 'Days between charges' },
            { name: 'Display', weight: 1.5, description: 'Readability, brightness, AOD' },
            { name: 'Smart Features', weight: 1.3, description: 'Apps, notifications, payments' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability, water resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' }
        ],
        specFields: ['display', 'battery', 'sensors', 'water_resistance', 'gps', 'storage']
    },
    
    // Home Appliances
    refrigerator: {
        name: 'Refrigerators',
        amazonCategory: 'appliances',
        searchTerms: ['refrigerator', 'fridge'],
        priceRanges: {
            low: { min: 500, max: 1200, label: 'Budget ($500-$1,200)' },
            mid: { min: 1200, max: 2500, label: 'Mid-Range ($1,200-$2,500)' },
            high: { min: 2500, max: null, label: 'Premium ($2,500+)' }
        },
        defaultCriteria: [
            { name: 'Storage Capacity', weight: 2.0, description: 'Total and usable space' },
            { name: 'Energy Efficiency', weight: 1.8, description: 'Energy Star rating, cost' },
            { name: 'Features', weight: 1.5, description: 'Ice maker, water dispenser' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, warranty' }
        ],
        specFields: ['capacity', 'energy_rating', 'dimensions', 'features', 'type']
    },
    'washing machine': {
        name: 'Washing Machines',
        amazonCategory: 'appliances',
        searchTerms: ['washing machine', 'washer'],
        priceRanges: {
            low: { min: 400, max: 800, label: 'Budget ($400-$800)' },
            mid: { min: 800, max: 1500, label: 'Mid-Range ($800-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Stain removal, wash quality' },
            { name: 'Capacity', weight: 1.8, description: 'Load size' },
            { name: 'Energy Efficiency', weight: 1.7, description: 'Operating costs' },
            { name: 'Reliability', weight: 1.6, description: 'Brand reputation, warranty' }
        ],
        specFields: ['capacity', 'energy_rating', 'rpm', 'dimensions', 'type']
    },
    dishwasher: {
        name: 'Dishwashers',
        amazonCategory: 'appliances',
        searchTerms: ['dishwasher'],
        priceRanges: {
            low: { min: 400, max: 700, label: 'Budget ($400-$700)' },
            mid: { min: 700, max: 1200, label: 'Mid-Range ($700-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Wash quality' },
            { name: 'Noise Level', weight: 1.7, description: 'Decibel rating' },
            { name: 'Energy Efficiency', weight: 1.5, description: 'Water and electricity usage' },
            { name: 'Capacity', weight: 1.6, description: 'Place settings' }
        ],
        specFields: ['capacity', 'noise_level', 'energy_rating', 'dimensions', 'racks']
    },
    'vacuum cleaner': {
        name: 'Vacuum Cleaners',
        amazonCategory: 'appliances',
        searchTerms: ['vacuum cleaner', 'vacuum'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 600, label: 'Mid-Range ($300-$600)' },
            high: { min: 600, max: null, label: 'Premium ($600+)' }
        },
        defaultCriteria: [
            { name: 'Suction Power', weight: 2.0, description: 'Cleaning effectiveness' },
            { name: 'Filtration', weight: 1.7, description: 'HEPA filter, allergen capture' },
            { name: 'Versatility', weight: 1.6, description: 'Attachments, surfaces' },
            { name: 'Battery Life', weight: 1.5, description: 'Runtime for cordless' }
        ],
        specFields: ['suction_power', 'filter', 'battery', 'weight', 'type']
    },
    'air purifier': {
        name: 'Air Purifiers',
        amazonCategory: 'appliances',
        searchTerms: ['air purifier'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Filtration Quality', weight: 2.0, description: 'HEPA, particle capture' },
            { name: 'Room Coverage', weight: 1.8, description: 'Square footage, CADR' },
            { name: 'Noise Level', weight: 1.6, description: 'Sound at different speeds' },
            { name: 'Filter Cost', weight: 1.5, description: 'Replacement costs' }
        ],
        specFields: ['cadr', 'coverage', 'filter_type', 'noise_level', 'dimensions']
    },
    'coffee maker': {
        name: 'Coffee Makers',
        amazonCategory: 'appliances',
        searchTerms: ['coffee maker', 'espresso machine'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 400, label: 'Mid-Range ($150-$400)' },
            high: { min: 400, max: null, label: 'Premium ($400+)' }
        },
        defaultCriteria: [
            { name: 'Coffee Quality', weight: 2.0, description: 'Brew temperature, taste' },
            { name: 'Convenience', weight: 1.7, description: 'Ease of use, programmable' },
            { name: 'Capacity', weight: 1.5, description: 'Cup/carafe size' },
            { name: 'Cleaning', weight: 1.3, description: 'Maintenance ease' }
        ],
        specFields: ['capacity', 'brew_type', 'features', 'dimensions', 'grinder']
    },
    
    // Fitness Equipment
    treadmill: {
        name: 'Treadmills',
        amazonCategory: 'sports',
        searchTerms: ['treadmill', 'running machine'],
        priceRanges: {
            low: { min: 300, max: 800, label: 'Budget ($300-$800)' },
            mid: { min: 800, max: 1800, label: 'Mid-Range ($800-$1,800)' },
            high: { min: 1800, max: null, label: 'Premium ($1,800+)' }
        },
        defaultCriteria: [
            { name: 'Motor Power', weight: 1.9, description: 'Continuous horsepower' },
            { name: 'Running Surface', weight: 1.8, description: 'Belt size, cushioning' },
            { name: 'Build Quality', weight: 1.7, description: 'Stability, weight capacity' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline, connectivity' }
        ],
        specFields: ['motor_hp', 'belt_size', 'weight_capacity', 'incline', 'speed_range']
    },
    'exercise bike': {
        name: 'Exercise Bikes',
        amazonCategory: 'sports',
        searchTerms: ['exercise bike', 'stationary bike', 'spin bike'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Ride Quality', weight: 2.0, description: 'Smoothness, resistance' },
            { name: 'Comfort', weight: 1.8, description: 'Seat, adjustability' },
            { name: 'Build Quality', weight: 1.6, description: 'Stability, durability' },
            { name: 'Features', weight: 1.5, description: 'Console, programs' }
        ],
        specFields: ['flywheel', 'resistance_type', 'weight_capacity', 'adjustability', 'dimensions']
    },
    elliptical: {
        name: 'Elliptical Machines',
        amazonCategory: 'sports',
        searchTerms: ['elliptical machine', 'elliptical trainer', 'cross trainer'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Stride Length', weight: 2.0, description: 'Natural movement' },
            { name: 'Resistance', weight: 1.8, description: 'Smoothness, levels' },
            { name: 'Build Quality', weight: 1.7, description: 'Stability' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline' }
        ],
        specFields: ['stride_length', 'resistance_levels', 'weight_capacity', 'incline', 'programs']
    },
    'rowing machine': {
        name: 'Rowing Machines',
        amazonCategory: 'sports',
        searchTerms: ['rowing machine', 'rower'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Resistance Quality', weight: 2.0, description: 'Smoothness, resistance type' },
            { name: 'Build Quality', weight: 1.8, description: 'Frame durability' },
            { name: 'Comfort', weight: 1.6, description: 'Seat, footrests, handle' },
            { name: 'Monitor', weight: 1.5, description: 'Display, tracking' }
        ],
        specFields: ['resistance_type', 'rail_length', 'weight_capacity', 'dimensions', 'monitor']
    },
    'fitness tracker': {
        name: 'Fitness Trackers',
        amazonCategory: 'sports',
        searchTerms: ['fitness tracker', 'activity tracker', 'smart band'],
        priceRanges: {
            low: { min: 30, max: 100, label: 'Budget ($30-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Tracking Accuracy', weight: 2.0, description: 'Heart rate, steps, sleep' },
            { name: 'Battery Life', weight: 1.8, description: 'Days per charge' },
            { name: 'Features', weight: 1.6, description: 'GPS, SpO2, workout modes' },
            { name: 'App Quality', weight: 1.5, description: 'Data insights, goals' }
        ],
        specFields: ['battery_life', 'sensors', 'gps', 'water_resistance', 'compatibility']
    },
    'yoga mat': {
        name: 'Yoga Mats',
        amazonCategory: 'sports',
        searchTerms: ['yoga mat', 'exercise mat'],
        priceRanges: {
            low: { min: 15, max: 40, label: 'Budget ($15-$40)' },
            mid: { min: 40, max: 100, label: 'Mid-Range ($40-$100)' },
            high: { min: 100, max: null, label: 'Premium ($100+)' }
        },
        defaultCriteria: [
            { name: 'Grip & Traction', weight: 2.0, description: 'Slip resistance' },
            { name: 'Cushioning', weight: 1.8, description: 'Thickness, comfort' },
            { name: 'Material Quality', weight: 1.7, description: 'Durability, eco-friendly' },
            { name: 'Size & Portability', weight: 1.4, description: 'Dimensions, weight' }
        ],
        specFields: ['thickness', 'material', 'dimensions', 'weight', 'texture']
    },
    'home gym': {
        name: 'Home Gym Equipment',
        amazonCategory: 'sports',
        searchTerms: ['adjustable dumbbells', 'weight set', 'home gym'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 700, label: 'Mid-Range ($300-$700)' },
            high: { min: 700, max: null, label: 'Premium ($700+)' }
        },
        defaultCriteria: [
            { name: 'Weight Range', weight: 2.0, description: 'Min/max weight' },
            { name: 'Build Quality', weight: 1.9, description: 'Durability, safety' },
            { name: 'Space Efficiency', weight: 1.7, description: 'Footprint, storage' },
            { name: 'Versatility', weight: 1.6, description: 'Exercise variety' }
        ],
        specFields: ['weight_range', 'adjustment_type', 'dimensions', 'material', 'warranty']
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
    
    // Log price constraint for debugging
    if (priceRange) {
        console.log(`🎯 Price constraint active for ${categoryName}:`, priceRange);
    } else {
        console.log(`📊 No price constraint for ${categoryName} - showing all prices`);
    }
    
    // Build the combined prompt with system instructions
    const systemPrompt = getResearchSystemPrompt();
    const userPrompt = buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, config?.specFields);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    
    try {
        console.log(`🔍 Requesting AI to research ${maxProducts} ${categoryName} products...`);
        console.log(`📝 Prompt preview:`, userPrompt.substring(0, 300) + '...');
        
        // Use aiService.call() which handles the API request
        const response = await aiService.call(fullPrompt, { skipCache: true });
        
        console.log(`📦 AI returned product data, parsing...`);
        
        // Parse the AI response into product objects
        const products = parseProductResponse(response);
        
        console.log(`✨ Successfully parsed ${products.length} products from AI response`);
        
        // Convert to AffiliateProduct instances
        return products.map(p => new AffiliateProduct({
            ...p,
            amazonUrl: generateSearchLink(p.name) // Use search link based on product name
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

IMPORTANT: Always respond with valid JSON. Do not include any text before or after the JSON array.`;
}

/**
 * Build research prompt for AI
 */
function buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, specFields) {
    let prompt = `Research and provide detailed information about ${maxProducts} top ${categoryName} products based on: "${searchContext}"

`;

    if (priceRange) {
        prompt += `IMPORTANT PRICE CONSTRAINT:\n`;
        if (priceRange.min && priceRange.max) {
            prompt += `- ONLY include products priced between $${priceRange.min} and $${priceRange.max}\n`;
        } else if (priceRange.min) {
            prompt += `- ONLY include products priced at $${priceRange.min} or higher\n`;
        } else if (priceRange.max) {
            prompt += `- ONLY include products priced up to $${priceRange.max}\n`;
        }
        
        // Handle excluded ranges (for non-contiguous selections like low + high)
        if (priceRange.excludeRanges && priceRange.excludeRanges.length > 0) {
            prompt += `- EXCLUDE products in these price ranges:\n`;
            priceRange.excludeRanges.forEach(range => {
                if (range.min && range.max) {
                    prompt += `  * $${range.min} to $${range.max}\n`;
                }
            });
        }
        
        prompt += `- Do NOT suggest products outside this price range under any circumstances\n\n`;
    }

    prompt += `For each product, provide:
1. name: Full product name (exact model/variant)
2. description: Brief 1-2 sentence description
3. price: Estimated price in USD (number only)
4. rating: Amazon star rating (1-5, can use decimals like 4.5)
5. reviewCount: Approximate number of reviews
6. imageUrl: Leave empty string ""
7. specs: Object with key specifications`;

    if (specFields && specFields.length > 0) {
        prompt += ` (include: ${specFields.join(', ')})`;
    }

    prompt += `
8. pros: Array of 3-4 key advantages
9. cons: Array of 2-3 notable drawbacks

Respond with a JSON array of products. Example format:
[
  {
    "name": "Product Name Model",
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

`;

    if (priceRange) {
        prompt += `CRITICAL REMINDER: All ${maxProducts} products MUST be within the specified price range. Do not include any products outside the price constraints.\n\n`;
    }

    prompt += `Provide exactly ${maxProducts} products, ranked by overall quality and popularity`;
    
    if (priceRange) {
        prompt += ` within the specified price range`;
    }
    
    prompt += `.`;

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

Rate this product on the following criteria using a 1-5 star scale:
- 1 star: Poor/Significantly below expectations
- 2 stars: Below average/Some major limitations  
- 3 stars: Average/Acceptable but not exceptional
- 4 stars: Good/Above average with minor limitations
- 5 stars: Excellent/Outstanding in this area

Criteria to evaluate:
${criteria.map((c, i) => `${i + 1}. ${c.name}: ${c.description || ''}`).join('\n')}

IMPORTANT: Use the FULL range (1-5). Don't cluster all scores around 3-4. Be decisive and differentiate clearly between products. A product can excel in one area (5 stars) and be weak in another (1-2 stars). This helps users understand real trade-offs. Reserve 5 stars for truly exceptional performance and use 1-2 stars for genuine weaknesses.

Respond with a JSON object containing ratings and brief explanations (2-3 sentences each):
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
            
            // Map ratings to product alternative ID
            const productId = product.id || product.name;
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
