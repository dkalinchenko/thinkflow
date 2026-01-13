/**
 * Lazy Loading Module
 * Dynamically imports heavy modules only when needed
 */

// Cached module references
let chartModule = null;
let amazonResearchModule = null;
let sortableLoaded = false;

/**
 * Lazy load Chart.js
 */
export async function loadChartModule() {
    if (chartModule) return chartModule;
    
    console.log('📦 Lazy loading Chart.js module...');
    try {
        // Dynamic import of Chart.js from CDN
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js');
        chartModule = window.Chart;
        console.log('✅ Chart.js loaded');
        return chartModule;
    } catch (error) {
        console.error('❌ Failed to load Chart.js:', error);
        throw error;
    }
}

/**
 * Lazy load Amazon Research module
 */
export async function loadAmazonResearchModule() {
    if (amazonResearchModule) return amazonResearchModule;
    
    console.log('📦 Lazy loading Amazon Research module...');
    try {
        amazonResearchModule = await import('./amazon-research.js');
        console.log('✅ Amazon Research module loaded');
        return amazonResearchModule;
    } catch (error) {
        console.error('❌ Failed to load Amazon Research module:', error);
        throw error;
    }
}

/**
 * Helper to load external scripts dynamically
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Lazy load SortableJS
 */
export async function loadSortableModule() {
    if (sortableLoaded && window.Sortable) return window.Sortable;
    
    console.log('📦 Lazy loading Sortable.js module...');
    try {
        await loadScript('https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js');
        sortableLoaded = true;
        console.log('✅ Sortable.js loaded');
        return window.Sortable;
    } catch (error) {
        console.error('❌ Failed to load Sortable.js:', error);
        throw error;
    }
}

/**
 * Preload modules in the background
 */
export function preloadModules() {
    // Start loading modules in background after a delay
    setTimeout(() => {
        loadChartModule().catch(() => {});
        loadSortableModule().catch(() => {});
        loadAmazonResearchModule().catch(() => {});
    }, 2000); // Wait 2 seconds after page load
}

export default {
    loadChartModule,
    loadSortableModule,
    loadAmazonResearchModule,
    preloadModules
};
