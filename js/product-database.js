/**
 * Product Database Module
 * Loads and manages curated product data from CSV
 */

// In-memory product cache
let productsCache = null;
let loadingPromise = null;

/**
 * Parse CSV string into array of objects
 * Handles quoted fields, commas within quotes, and empty values
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];
    
    // Parse header row
    const headers = parseCSVRow(lines[0]);
    
    // Parse data rows
    const products = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = parseCSVRow(line);
        const product = {};
        
        headers.forEach((header, index) => {
            const value = values[index] || '';
            // Handle specs fields specially
            if (header.startsWith('specs_')) {
                if (!product.specs) product.specs = {};
                const specKey = header.replace('specs_', '');
                if (value) product.specs[specKey] = value;
            } else {
                product[header] = value;
            }
        });
        
        // Generate unique ID if not present
        if (!product.id) {
            product.id = `product_${i}_${Date.now()}`;
        }
        
        // Parse numeric fields
        if (product.price) {
            product.price = parseFloat(product.price) || null;
        }
        if (product.rating) {
            product.rating = parseFloat(product.rating) || null;
        }
        
        // Normalize category
        if (product.category) {
            product.category = product.category.toLowerCase().trim();
        }
        
        // Mark as product for rendering
        product.isProduct = true;
        
        products.push(product);
    }
    
    return products;
}

/**
 * Parse a single CSV row, handling quoted fields
 */
function parseCSVRow(row) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"') {
            if (inQuotes && row[i + 1] === '"') {
                // Escaped quote
                current += '"';
                i++;
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    // Push last value
    values.push(current.trim());
    
    return values;
}

/**
 * Load products from CSV file
 * Returns cached data if already loaded
 */
export async function loadProducts() {
    // Return cached products if available
    if (productsCache) {
        return productsCache;
    }
    
    // If already loading, return the existing promise
    if (loadingPromise) {
        return loadingPromise;
    }
    
    // Start loading
    loadingPromise = (async () => {
        try {
            const response = await fetch('./data/products.csv');
            if (!response.ok) {
                throw new Error(`Failed to load products: ${response.status}`);
            }
            
            const csvText = await response.text();
            productsCache = parseCSV(csvText);
            
            console.log(`Loaded ${productsCache.length} products from database`);
            return productsCache;
        } catch (error) {
            console.error('Error loading product database:', error);
            productsCache = []; // Set empty cache to prevent repeated failed loads
            throw error;
        } finally {
            loadingPromise = null;
        }
    })();
    
    return loadingPromise;
}

/**
 * Get all products
 */
export function getAllProducts() {
    return productsCache || [];
}

/**
 * Get products by category
 * @param {string} category - Category to filter by (laptop, smartphone, etc.)
 */
export function getProductsByCategory(category) {
    const products = productsCache || [];
    const normalizedCategory = category.toLowerCase().trim();
    
    // Handle category aliases
    const categoryAliases = {
        'laptops': 'laptop',
        'smartphones': 'smartphone',
        'phones': 'smartphone',
        'phone': 'smartphone',
        'headphones': 'headphones',
        'headphone': 'headphones',
        'cameras': 'camera',
        'tablets': 'tablet',
        'smartwatches': 'smartwatch',
        'watches': 'smartwatch'
    };
    
    const resolvedCategory = categoryAliases[normalizedCategory] || normalizedCategory;
    
    return products.filter(p => p.category === resolvedCategory);
}

/**
 * Get product by ID
 * @param {string} id - Product ID
 */
export function getProductById(id) {
    const products = productsCache || [];
    return products.find(p => p.id === id);
}

/**
 * Get products by IDs
 * @param {string[]} ids - Array of product IDs
 */
export function getProductsByIds(ids) {
    const products = productsCache || [];
    return ids.map(id => products.find(p => p.id === id)).filter(Boolean);
}

/**
 * Search products by name
 * @param {string} query - Search query
 * @param {string} category - Optional category filter
 */
export function searchProducts(query, category = null) {
    let products = productsCache || [];
    
    if (category) {
        products = getProductsByCategory(category);
    }
    
    const normalizedQuery = query.toLowerCase();
    
    return products.filter(p => 
        p.name.toLowerCase().includes(normalizedQuery) ||
        (p.description && p.description.toLowerCase().includes(normalizedQuery))
    );
}

/**
 * Get available categories
 */
export function getCategories() {
    const products = productsCache || [];
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
}

/**
 * Get product count by category
 */
export function getProductCountByCategory() {
    const products = productsCache || [];
    const counts = {};
    
    products.forEach(p => {
        counts[p.category] = (counts[p.category] || 0) + 1;
    });
    
    return counts;
}

/**
 * Reload products from CSV (clear cache)
 */
export async function reloadProducts() {
    productsCache = null;
    loadingPromise = null;
    return loadProducts();
}

/**
 * Check if products are loaded
 */
export function isLoaded() {
    return productsCache !== null;
}

/**
 * Get product database stats
 */
export function getStats() {
    const products = productsCache || [];
    return {
        total: products.length,
        byCategory: getProductCountByCategory(),
        categories: getCategories()
    };
}

export default {
    loadProducts,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    getProductsByIds,
    searchProducts,
    getCategories,
    getProductCountByCategory,
    reloadProducts,
    isLoaded,
    getStats
};
