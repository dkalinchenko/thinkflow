/**
 * Drag & Drop Module
 * Provides drag and drop functionality for reordering criteria and alternatives
 */

import { StateManager } from './state.js';
import { showToast } from './utils.js';

let criteriaSortable = null;
let alternativesSortable = null;

/**
 * Initialize drag & drop for criteria and alternatives
 */
export async function initDragDrop() {
    // Lazy load Sortable.js if not already loaded
    if (typeof Sortable === 'undefined') {
        try {
            // Dynamic import from lazy-loader
            const { loadSortableModule } = await import('./lazy-loader.js');
            await loadSortableModule();
        } catch (error) {
            console.warn('⚠️ Sortable.js not loaded, drag & drop disabled');
            return;
        }
    }

    initCriteriaDragDrop();
    initAlternativesDragDrop();

    console.log('✅ Drag & Drop initialized');
}

/**
 * Initialize drag & drop for criteria list
 */
export function initCriteriaDragDrop() {
    if (typeof Sortable === 'undefined') return;

    const criteriaList = document.getElementById('criteriaList');
    if (!criteriaList) return;

    // Destroy existing sortable
    if (criteriaSortable) {
        criteriaSortable.destroy();
    }

    criteriaSortable = new Sortable(criteriaList, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        onEnd: async (evt) => {
            if (evt.oldIndex === evt.newIndex) return;

            try {
                const state = StateManager.getState();
                const decision = state.currentDecision;
                if (!decision) return;

                // Reorder criteria array
                const criteria = [...decision.criteria];
                const [movedItem] = criteria.splice(evt.oldIndex, 1);
                criteria.splice(evt.newIndex, 0, movedItem);

                // Update state
                await StateManager.updateDecision({
                    ...decision,
                    criteria
                });

                showToast('Criteria reordered', 'success');
            } catch (error) {
                console.error('Error reordering criteria:', error);
                showToast('Failed to reorder criteria', 'error');
                // Revert DOM order
                evt.item.remove();
                if (evt.oldIndex < evt.newIndex) {
                    criteriaList.insertBefore(evt.item, criteriaList.children[evt.oldIndex]);
                } else {
                    criteriaList.insertBefore(evt.item, criteriaList.children[evt.oldIndex + 1]);
                }
            }
        }
    });
}

/**
 * Initialize drag & drop for alternatives list
 */
export function initAlternativesDragDrop() {
    if (typeof Sortable === 'undefined') return;

    const alternativesList = document.getElementById('alternativesList');
    if (!alternativesList) return;

    // Destroy existing sortable
    if (alternativesSortable) {
        alternativesSortable.destroy();
    }

    alternativesSortable = new Sortable(alternativesList, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        onEnd: async (evt) => {
            if (evt.oldIndex === evt.newIndex) return;

            try {
                const state = StateManager.getState();
                const decision = state.currentDecision;
                if (!decision) return;

                // Reorder alternatives array
                const alternatives = [...decision.alternatives];
                const [movedItem] = alternatives.splice(evt.oldIndex, 1);
                alternatives.splice(evt.newIndex, 0, movedItem);

                // Update state
                await StateManager.updateDecision({
                    ...decision,
                    alternatives
                });

                showToast('Alternatives reordered', 'success');
            } catch (error) {
                console.error('Error reordering alternatives:', error);
                showToast('Failed to reorder alternatives', 'error');
                // Revert DOM order
                evt.item.remove();
                if (evt.oldIndex < evt.newIndex) {
                    alternativesList.insertBefore(evt.item, alternativesList.children[evt.oldIndex]);
                } else {
                    alternativesList.insertBefore(evt.item, alternativesList.children[evt.oldIndex + 1]);
                }
            }
        }
    });
}

/**
 * Destroy all sortable instances
 */
export function destroyDragDrop() {
    if (criteriaSortable) {
        criteriaSortable.destroy();
        criteriaSortable = null;
    }
    if (alternativesSortable) {
        alternativesSortable.destroy();
        alternativesSortable = null;
    }
}

/**
 * Refresh drag & drop (useful after DOM updates)
 */
export function refreshDragDrop() {
    initCriteriaDragDrop();
    initAlternativesDragDrop();
}

export default {
    initDragDrop,
    initCriteriaDragDrop,
    initAlternativesDragDrop,
    destroyDragDrop,
    refreshDragDrop
};
