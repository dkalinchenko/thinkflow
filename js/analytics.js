/**
 * Analytics & Conversion Tracking for ThinkFlow
 * Tracks user behavior and affiliate conversions
 */

// Analytics storage key
const ANALYTICS_KEY = 'thinkflow_analytics';

/**
 * Analytics data structure
 */
const defaultAnalytics = {
    pageViews: 0,
    comparisonsStarted: 0,
    comparisonsCompleted: 0,
    affiliateClicks: 0,
    productCategoryCounts: {},
    templateUsage: {},
    firstVisit: null,
    lastVisit: null,
    sessions: []
};

/**
 * Load analytics from localStorage
 */
function loadAnalytics() {
    try {
        const stored = localStorage.getItem(ANALYTICS_KEY);
        return stored ? { ...defaultAnalytics, ...JSON.parse(stored) } : { ...defaultAnalytics };
    } catch (e) {
        console.error('Failed to load analytics:', e);
        return { ...defaultAnalytics };
    }
}

/**
 * Save analytics to localStorage
 */
function saveAnalytics(data) {
    try {
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save analytics:', e);
    }
}

/**
 * Analytics Manager
 */
export const Analytics = {
    /**
     * Initialize analytics and track page view
     */
    init() {
        const analytics = loadAnalytics();
        const now = Date.now();
        
        // Track first visit
        if (!analytics.firstVisit) {
            analytics.firstVisit = now;
        }
        
        // Track session
        const sessionId = `session_${now}`;
        analytics.sessions.push({
            id: sessionId,
            start: now,
            events: []
        });
        
        // Keep only last 30 sessions
        if (analytics.sessions.length > 30) {
            analytics.sessions = analytics.sessions.slice(-30);
        }
        
        analytics.lastVisit = now;
        analytics.pageViews++;
        
        saveAnalytics(analytics);
        
        console.log('Analytics initialized', { pageViews: analytics.pageViews });
    },
    
    /**
     * Track comparison started
     */
    trackComparisonStarted(category = 'general') {
        const analytics = loadAnalytics();
        analytics.comparisonsStarted++;
        
        // Track category
        analytics.productCategoryCounts[category] = 
            (analytics.productCategoryCounts[category] || 0) + 1;
        
        this._addEvent('comparison_started', { category });
        saveAnalytics(analytics);
    },
    
    /**
     * Track comparison completed (reached results)
     */
    trackComparisonCompleted(data = {}) {
        const analytics = loadAnalytics();
        analytics.comparisonsCompleted++;
        
        this._addEvent('comparison_completed', data);
        saveAnalytics(analytics);
    },
    
    /**
     * Track template usage
     */
    trackTemplateUsed(templateId) {
        const analytics = loadAnalytics();
        analytics.templateUsage[templateId] = 
            (analytics.templateUsage[templateId] || 0) + 1;
        
        this._addEvent('template_used', { templateId });
        saveAnalytics(analytics);
    },
    
    /**
     * Track affiliate click
     */
    trackAffiliateClick(data) {
        const analytics = loadAnalytics();
        analytics.affiliateClicks++;
        
        this._addEvent('affiliate_click', data);
        saveAnalytics(analytics);
    },
    
    /**
     * Track custom event
     */
    trackEvent(eventName, data = {}) {
        this._addEvent(eventName, data);
    },
    
    /**
     * Add event to current session
     */
    _addEvent(eventName, data) {
        const analytics = loadAnalytics();
        const currentSession = analytics.sessions[analytics.sessions.length - 1];
        
        if (currentSession) {
            currentSession.events.push({
                name: eventName,
                data,
                timestamp: Date.now()
            });
            
            // Keep only last 100 events per session
            if (currentSession.events.length > 100) {
                currentSession.events = currentSession.events.slice(-100);
            }
            
            saveAnalytics(analytics);
        }
    },
    
    /**
     * Get analytics summary
     */
    getSummary() {
        const analytics = loadAnalytics();
        
        const completionRate = analytics.comparisonsStarted > 0
            ? (analytics.comparisonsCompleted / analytics.comparisonsStarted * 100).toFixed(1)
            : 0;
        
        return {
            pageViews: analytics.pageViews,
            comparisonsStarted: analytics.comparisonsStarted,
            comparisonsCompleted: analytics.comparisonsCompleted,
            completionRate: `${completionRate}%`,
            affiliateClicks: analytics.affiliateClicks,
            topCategories: Object.entries(analytics.productCategoryCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5),
            topTemplates: Object.entries(analytics.templateUsage)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5),
            firstVisit: analytics.firstVisit ? new Date(analytics.firstVisit).toLocaleDateString() : 'N/A',
            lastVisit: analytics.lastVisit ? new Date(analytics.lastVisit).toLocaleDateString() : 'N/A',
            totalSessions: analytics.sessions.length
        };
    },
    
    /**
     * Get affiliate click statistics
     */
    getAffiliateStats() {
        const analytics = loadAnalytics();
        const clicks = [];
        
        analytics.sessions.forEach(session => {
            session.events
                .filter(e => e.name === 'affiliate_click')
                .forEach(e => clicks.push(e));
        });
        
        const now = Date.now();
        const day = 24 * 60 * 60 * 1000;
        
        return {
            total: analytics.affiliateClicks,
            last24Hours: clicks.filter(c => now - c.timestamp < day).length,
            last7Days: clicks.filter(c => now - c.timestamp < 7 * day).length,
            last30Days: clicks.filter(c => now - c.timestamp < 30 * day).length,
            clicksByProduct: clicks.reduce((acc, c) => {
                const name = c.data?.productName || 'Unknown';
                acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {}),
            clicksBySource: clicks.reduce((acc, c) => {
                const source = c.data?.source || 'unknown';
                acc[source] = (acc[source] || 0) + 1;
                return acc;
            }, {})
        };
    },
    
    /**
     * Export analytics data
     */
    exportData() {
        const analytics = loadAnalytics();
        return JSON.stringify(analytics, null, 2);
    },
    
    /**
     * Clear all analytics data
     */
    clearData() {
        localStorage.removeItem(ANALYTICS_KEY);
        console.log('Analytics data cleared');
    }
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
    // Initialize analytics on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Analytics.init());
    } else {
        Analytics.init();
    }
    
    // Expose for debugging
    window.ThinkFlowAnalytics = Analytics;
}

export default Analytics;
