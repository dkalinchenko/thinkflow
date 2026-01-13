/**
 * Tooltips Module
 * Provides tooltip functionality using Tippy.js
 */

// Initialize Tippy.js for all elements with data-tooltip attribute
export function initTooltips() {
    if (typeof tippy === 'undefined') {
        console.warn('Tippy.js not loaded, tooltips disabled');
        return;
    }

    // Initialize tooltips for elements with data-tooltip attribute
    tippy('[data-tooltip]', {
        content(reference) {
            const title = reference.getAttribute('data-tooltip');
            return title;
        },
        placement: 'top',
        arrow: true,
        theme: 'optimind',
        delay: [300, 0], // 300ms delay on show, instant hide
        duration: [200, 150],
        animation: 'shift-away',
    });

    console.log('✅ Tooltips initialized');
}

// Add tooltip to a specific element
export function addTooltip(element, content, options = {}) {
    if (typeof tippy === 'undefined' || !element) return null;

    return tippy(element, {
        content,
        placement: options.placement || 'top',
        arrow: true,
        theme: 'optimind',
        delay: [300, 0],
        duration: [200, 150],
        animation: 'shift-away',
        ...options
    });
}

// Update tooltip content
export function updateTooltip(element, newContent) {
    if (!element || !element._tippy) return;
    element._tippy.setContent(newContent);
}

// Destroy tooltip
export function destroyTooltip(element) {
    if (!element || !element._tippy) return;
    element._tippy.destroy();
}

// Re-initialize tooltips (useful after DOM updates)
export function refreshTooltips() {
    initTooltips();
}

export default {
    initTooltips,
    addTooltip,
    updateTooltip,
    destroyTooltip,
    refreshTooltips
};
