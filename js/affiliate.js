/**
 * Amazon Affiliate Integration for OptiMind
 * Handles affiliate link generation, tracking, and compliance
 */

// Configuration - Replace with your actual Amazon Associates ID
const AFFILIATE_CONFIG = {
    tag: 'optimind09-20', // Your Amazon Associates tracking ID
    marketplace: 'amazon.com',
    enabled: true
};

/**
 * Generate an Amazon affiliate link from ASIN
 * @param {string} asin - Amazon Standard Identification Number
 * @param {string} tag - Optional override for affiliate tag
 * @returns {string} - Full Amazon affiliate URL
 */
export function generateAffiliateLink(asin, tag = AFFILIATE_CONFIG.tag) {
    if (!asin) return '#';
    return `https://www.${AFFILIATE_CONFIG.marketplace}/dp/${asin}?tag=${tag}`;
}

/**
 * Generate Amazon search affiliate link
 * @param {string} query - Search query (product name)
 * @param {string} category - Optional Amazon category
 * @returns {string} - Amazon search URL with affiliate tag
 */
export function generateSearchLink(query, category = null) {
    if (!query) return '#';
    const encodedQuery = encodeURIComponent(query);
    // Build URL with optional category filter
    let url = `https://www.${AFFILIATE_CONFIG.marketplace}/s?k=${encodedQuery}`;
    if (category) {
        url += `&i=${category}`;
    }
    url += `&tag=${AFFILIATE_CONFIG.tag}`;
    return url;
}

/**
 * Extract ASIN from various Amazon URL formats
 * @param {string} url - Amazon product URL
 * @returns {string|null} - Extracted ASIN or null
 */
export function extractASIN(url) {
    if (!url) return null;
    
    // Match various Amazon URL patterns
    const patterns = [
        /\/dp\/([A-Z0-9]{10})/i,
        /\/product\/([A-Z0-9]{10})/i,
        /\/gp\/product\/([A-Z0-9]{10})/i,
        /\/ASIN\/([A-Z0-9]{10})/i,
        /amazon\.com.*?\/([A-Z0-9]{10})(?:[/?]|$)/i
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    
    return null;
}

/**
 * Track affiliate link click (for analytics)
 * @param {Object} data - Click data (asin is optional)
 */
export function trackAffiliateClick(data) {
    const { asin = null, productName, source, decisionId = null } = data;
    
    // Log to console for development
    console.log('Affiliate click tracked:', {
        productName,
        source,
        asin,
        decisionId,
        timestamp: new Date().toISOString()
    });
    
    // Store click in localStorage for basic analytics
    const clicks = JSON.parse(localStorage.getItem('optimind_affiliate_clicks') || '[]');
    clicks.push({
        productName,
        source,
        asin,
        decisionId,
        timestamp: Date.now()
    });
    
    // Keep only last 100 clicks
    if (clicks.length > 100) {
        clicks.splice(0, clicks.length - 100);
    }
    
    localStorage.setItem('optimind_affiliate_clicks', JSON.stringify(clicks));
    
    // Future: Send to analytics service
    // analytics.track('affiliate_click', data);
}

/**
 * Get affiliate click statistics
 * @returns {Object} - Click statistics
 */
export function getClickStats() {
    const clicks = JSON.parse(localStorage.getItem('optimind_affiliate_clicks') || '[]');
    
    const stats = {
        totalClicks: clicks.length,
        last24Hours: 0,
        last7Days: 0,
        topProducts: {}
    };
    
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    
    clicks.forEach(click => {
        const age = now - click.timestamp;
        if (age < day) stats.last24Hours++;
        if (age < 7 * day) stats.last7Days++;
        
        if (click.productName) {
            stats.topProducts[click.productName] = (stats.topProducts[click.productName] || 0) + 1;
        }
    });
    
    return stats;
}

/**
 * Product data structure for affiliate products
 */
export class AffiliateProduct {
    constructor(data = {}) {
        this.asin = data.asin || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this.price = data.price || null;
        this.rating = data.rating || null;
        this.reviewCount = data.reviewCount || 0;
        this.imageUrl = data.imageUrl || '';
        this.category = data.category || '';
        this.specs = data.specs || {};
        this.pros = data.pros || [];
        this.cons = data.cons || [];
        this.amazonUrl = this.asin ? generateAffiliateLink(this.asin) : '';
    }
    
    /**
     * Convert to alternative format for decision matrix
     */
    toAlternative() {
        return {
            name: this.name,
            description: this.description,
            asin: this.asin,
            price: this.price,
            rating: this.rating,
            reviewCount: this.reviewCount,
            imageUrl: this.imageUrl,
            specs: this.specs,
            pros: this.pros,
            cons: this.cons,
            amazonUrl: this.amazonUrl,
            isProduct: true
        };
    }
}

/**
 * Format price for display
 * @param {number} price - Price in cents or dollars
 * @param {boolean} inCents - Whether price is in cents
 * @returns {string} - Formatted price string
 */
export function formatPrice(price, inCents = false) {
    if (price === null || price === undefined) return 'Check Price';
    const dollars = inCents ? price / 100 : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(dollars);
}

/**
 * Generate Amazon product card HTML
 * @param {AffiliateProduct} product - Product data
 * @param {Object} options - Display options
 * @returns {string} - HTML string
 */
export function generateProductCardHTML(product, options = {}) {
    const { showBuyButton = true, compact = false } = options;
    
    const priceDisplay = formatPrice(product.price);
    const ratingStars = product.rating ? '⭐'.repeat(Math.round(product.rating)) : '';
    
    return `
        <div class="product-card ${compact ? 'compact' : ''}" data-asin="${product.asin}">
            ${product.imageUrl ? `
                <div class="product-image">
                    <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                </div>
            ` : ''}
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                ${product.rating ? `
                    <div class="product-rating">
                        <span class="rating-stars">${ratingStars}</span>
                        <span class="rating-value">${product.rating.toFixed(1)}</span>
                        ${product.reviewCount ? `<span class="review-count">(${product.reviewCount.toLocaleString()})</span>` : ''}
                    </div>
                ` : ''}
                <div class="product-price">${priceDisplay}</div>
                ${showBuyButton && product.asin ? `
                    <a href="${product.amazonUrl}" 
                       class="btn btn-amazon" 
                       target="_blank" 
                       rel="noopener sponsored"
                       onclick="window.trackAffiliateClick && window.trackAffiliateClick({asin: '${product.asin}', productName: '${product.name.replace(/'/g, "\\'")}', source: 'product_card'})">
                        <svg class="amazon-icon" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M15.93 17.09c-.18.16-.43.17-.63.06-.89-.74-1.05-1.08-1.54-1.79-1.47 1.5-2.51 1.95-4.42 1.95-2.25 0-4.01-1.39-4.01-4.17 0-2.18 1.17-3.64 2.86-4.38 1.46-.64 3.49-.76 5.04-.93v-.35c0-.64.05-1.4-.33-1.96-.32-.49-.95-.7-1.5-.7-1.02 0-1.93.53-2.15 1.61-.05.24-.23.47-.48.48l-2.66-.29c-.22-.05-.47-.22-.4-.55C6.26 3.37 8.74 2.5 10.94 2.5c1.14 0 2.63.3 3.53 1.17 1.14 1.06 1.03 2.48 1.03 4.03v3.65c0 1.1.45 1.58.88 2.18.15.21.18.46-.01.62-.48.4-1.35 1.14-1.82 1.56l-.62-.62z"/>
                        </svg>
                        View on Amazon
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * FTC Disclosure text for affiliate links
 */
export const FTC_DISCLOSURE = {
    short: 'As an Amazon Associate, we earn from qualifying purchases.',
    full: 'OptiMind is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click on product links and make a purchase, we may earn a commission at no additional cost to you.',
    inline: 'Affiliate link'
};

/**
 * Check if affiliate features are enabled
 */
export function isAffiliateEnabled() {
    return AFFILIATE_CONFIG.enabled && AFFILIATE_CONFIG.tag;
}

/**
 * Get affiliate configuration
 */
export function getAffiliateConfig() {
    return { ...AFFILIATE_CONFIG };
}

// Expose tracking function globally for onclick handlers
if (typeof window !== 'undefined') {
    window.trackAffiliateClick = trackAffiliateClick;
}

export default {
    generateAffiliateLink,
    generateSearchLink,
    extractASIN,
    trackAffiliateClick,
    getClickStats,
    AffiliateProduct,
    formatPrice,
    generateProductCardHTML,
    FTC_DISCLOSURE,
    isAffiliateEnabled,
    getAffiliateConfig
};
