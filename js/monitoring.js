/**
 * Performance Monitoring and Error Tracking for OptiMind
 * Tracks Web Vitals and application errors
 */

/**
 * Web Vitals Tracking
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.errors = [];
        this.maxErrors = 50; // Keep last 50 errors
    }
    
    /**
     * Initialize performance monitoring
     */
    init() {
        this.trackWebVitals();
        this.setupErrorTracking();
        this.trackPageLoad();
        
        console.log('📊 Performance monitoring initialized');
    }
    
    /**
     * Track Core Web Vitals
     */
    trackWebVitals() {
        // Track Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                    this.logMetric('LCP', this.metrics.lcp);
                });
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            } catch (e) {
                console.warn('LCP tracking not supported');
            }
            
            // Track First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                        this.logMetric('FID', this.metrics.fid);
                    });
                });
                fidObserver.observe({ type: 'first-input', buffered: true });
            } catch (e) {
                console.warn('FID tracking not supported');
            }
            
            // Track Cumulative Layout Shift (CLS)
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    this.metrics.cls = clsValue;
                });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
            } catch (e) {
                console.warn('CLS tracking not supported');
            }
        }
    }
    
    /**
     * Track page load performance
     */
    trackPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                this.metrics.pageLoad = pageLoadTime;
                this.metrics.domReady = domReadyTime;
                
                this.logMetric('Page Load', pageLoadTime);
                this.logMetric('DOM Ready', domReadyTime);
                
                // Log summary
                this.logPerformanceSummary();
            }, 0);
        });
    }
    
    /**
     * Setup global error tracking
     */
    setupErrorTracking() {
        // Track uncaught errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'error',
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });
        });
        
        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'unhandledRejection',
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack,
                timestamp: new Date().toISOString()
            });
        });
    }
    
    /**
     * Log an error
     */
    logError(error) {
        this.errors.push(error);
        
        // Keep only last N errors
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }
        
        console.error('❌ Error tracked:', error);
        
        // In production, you would send this to your error tracking service
        // this.sendToErrorService(error);
    }
    
    /**
     * Log a performance metric
     */
    logMetric(name, value) {
        const rating = this.getMetricRating(name, value);
        const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
        
        console.log(`${emoji} ${name}: ${Math.round(value)}ms (${rating})`);
    }
    
    /**
     * Get metric rating based on Web Vitals thresholds
     */
    getMetricRating(name, value) {
        const thresholds = {
            LCP: { good: 2500, poor: 4000 },
            FID: { good: 100, poor: 300 },
            CLS: { good: 0.1, poor: 0.25 },
            'Page Load': { good: 3000, poor: 5000 },
            'DOM Ready': { good: 1500, poor: 3000 }
        };
        
        const threshold = thresholds[name];
        if (!threshold) return 'unknown';
        
        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }
    
    /**
     * Log performance summary
     */
    logPerformanceSummary() {
        console.group('📊 Performance Summary');
        console.log('Metrics:', this.metrics);
        console.log('Error count:', this.errors.length);
        console.groupEnd();
    }
    
    /**
     * Get all metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }
    
    /**
     * Get all errors
     */
    getErrors() {
        return [...this.errors];
    }
    
    /**
     * Track custom timing
     */
    startTimer(name) {
        return {
            name,
            start: performance.now(),
            end: () => {
                const duration = performance.now() - this.start;
                console.log(`⏱️ ${name}: ${Math.round(duration)}ms`);
                return duration;
            }
        };
    }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
