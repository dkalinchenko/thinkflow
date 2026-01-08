/**
 * State Management for ThinkFlow AI
 * Simple reactive state management
 */

import { DecisionDB, SettingsDB } from './db.js';
import { generateId, deepClone, calculateTotalScore } from './utils.js';

/**
 * Application State
 */
const state = {
    // Current decision being edited
    currentDecision: null,
    
    // All decisions list
    decisions: [],
    
    // Current step in the wizard
    currentStep: 'criteria', // criteria, alternatives, evaluation, results
    
    // UI state
    ui: {
        sidebarOpen: true,
        theme: 'light',
        evaluationView: 'matrix' // matrix or cards
    },
    
    // Settings
    settings: {
        aiProvider: 'deepseek',
        apiKey: '',
        scoreScale: 5, // 5-star rating system
        affiliateTag: 'thinkflow-20', // Amazon Associates tracking ID
        affiliateEnabled: true
    },
    
    // Listeners for state changes
    _listeners: new Map()
};

/**
 * State Manager
 */
export const StateManager = {
    /**
     * Get current state
     */
    getState() {
        return deepClone(state);
    },
    
    /**
     * Subscribe to state changes
     */
    subscribe(key, callback) {
        if (!state._listeners.has(key)) {
            state._listeners.set(key, new Set());
        }
        state._listeners.get(key).add(callback);
        
        // Return unsubscribe function
        return () => {
            state._listeners.get(key)?.delete(callback);
        };
    },
    
    /**
     * Notify listeners of state change
     */
    _notify(key) {
        const listeners = state._listeners.get(key);
        if (listeners) {
            listeners.forEach(callback => callback(state[key]));
        }
        
        // Also notify global listeners
        const globalListeners = state._listeners.get('*');
        if (globalListeners) {
            globalListeners.forEach(callback => callback(state));
        }
    },
    
    /**
     * Initialize state from storage
     */
    async init() {
        // Load all decisions
        state.decisions = await DecisionDB.getAll();
        
        // Load settings
        const settings = await SettingsDB.getAll();
        state.settings = { ...state.settings, ...settings };
        
        // Load theme preference
        const savedTheme = await SettingsDB.get('theme', 'dark');
        state.ui.theme = savedTheme;
        
        this._notify('decisions');
        this._notify('settings');
        this._notify('ui');
    },
    
    // ========================================
    // Decision Operations
    // ========================================
    
    /**
     * Create a new decision
     */
    async createDecision(data = {}) {
        const decision = await DecisionDB.create({
            title: data.title || 'Untitled Decision',
            description: data.description || '',
            category: data.category || 'General',
            criteria: data.criteria || [],
            alternatives: data.alternatives || [],
            scores: data.scores || {},
            evaluators: data.evaluators || [{ id: 'default', name: 'You', isDefault: true }]
        });
        
        state.decisions.unshift(decision);
        state.currentDecision = decision;
        state.currentStep = 'criteria';
        
        this._notify('decisions');
        this._notify('currentDecision');
        this._notify('currentStep');
        
        return decision;
    },
    
    /**
     * Load a decision
     */
    async loadDecision(id) {
        const decision = await DecisionDB.get(id);
        if (decision) {
            state.currentDecision = decision;
            state.currentStep = this._determineStep(decision);
            
            this._notify('currentDecision');
            this._notify('currentStep');
        }
        return decision;
    },
    
    /**
     * Determine which step to show based on decision state
     */
    _determineStep(decision) {
        if (!decision.criteria || decision.criteria.length < 2) {
            return 'criteria';
        }
        if (!decision.alternatives || decision.alternatives.length < 2) {
            return 'alternatives';
        }
        // Check if there are any scores
        const hasScores = Object.keys(decision.scores || {}).length > 0;
        if (!hasScores) {
            return 'evaluation';
        }
        return 'results';
    },
    
    /**
     * Update current decision
     */
    async updateDecision(updates) {
        if (!state.currentDecision) return null;
        
        const updated = await DecisionDB.update(state.currentDecision.id, updates);
        state.currentDecision = updated;
        
        // Update in decisions list
        const index = state.decisions.findIndex(d => d.id === updated.id);
        if (index !== -1) {
            state.decisions[index] = updated;
        }
        
        this._notify('currentDecision');
        this._notify('decisions');
        
        return updated;
    },
    
    /**
     * Delete a decision
     */
    async deleteDecision(id) {
        await DecisionDB.delete(id);
        
        state.decisions = state.decisions.filter(d => d.id !== id);
        
        if (state.currentDecision?.id === id) {
            state.currentDecision = null;
            state.currentStep = 'criteria';
        }
        
        this._notify('decisions');
        this._notify('currentDecision');
    },
    
    /**
     * Close current decision
     */
    closeDecision() {
        state.currentDecision = null;
        state.currentStep = 'criteria';
        
        this._notify('currentDecision');
        this._notify('currentStep');
    },
    
    // ========================================
    // Criteria Operations
    // ========================================
    
    /**
     * Add a criterion
     */
    async addCriterion(criterion = {}) {
        if (!state.currentDecision) return;
        
        const newCriterion = {
            id: generateId(),
            name: criterion.name || 'New Criterion',
            description: criterion.description || '',
            weight: criterion.weight || 1.0
        };
        
        const criteria = [...(state.currentDecision.criteria || []), newCriterion];
        await this.updateDecision({ criteria });
        
        return newCriterion;
    },
    
    /**
     * Update a criterion
     */
    async updateCriterion(criterionId, updates) {
        if (!state.currentDecision) return;
        
        const criteria = state.currentDecision.criteria.map(c =>
            c.id === criterionId ? { ...c, ...updates } : c
        );
        
        await this.updateDecision({ criteria });
    },
    
    /**
     * Delete a criterion
     */
    async deleteCriterion(criterionId) {
        if (!state.currentDecision) return;
        
        const criteria = state.currentDecision.criteria.filter(c => c.id !== criterionId);
        
        // Also remove scores for this criterion
        const scores = { ...state.currentDecision.scores };
        for (const altId in scores) {
            if (scores[altId][criterionId]) {
                delete scores[altId][criterionId];
            }
        }
        
        await this.updateDecision({ criteria, scores });
    },
    
    /**
     * Reorder criteria
     */
    async reorderCriteria(fromIndex, toIndex) {
        if (!state.currentDecision) return;
        
        const criteria = [...state.currentDecision.criteria];
        const [removed] = criteria.splice(fromIndex, 1);
        criteria.splice(toIndex, 0, removed);
        
        await this.updateDecision({ criteria });
    },
    
    /**
     * Add multiple criteria (from AI or template)
     */
    async addCriteria(criteriaList) {
        if (!state.currentDecision) return;
        
        const newCriteria = criteriaList.map(c => ({
            id: generateId(),
            name: c.name,
            description: c.description || '',
            weight: c.weight || 1.0
        }));
        
        const criteria = [...(state.currentDecision.criteria || []), ...newCriteria];
        await this.updateDecision({ criteria });
        
        return newCriteria;
    },
    
    // ========================================
    // Alternatives Operations
    // ========================================
    
    /**
     * Add an alternative
     */
    async addAlternative(alternative = {}) {
        if (!state.currentDecision) return;
        
        const newAlternative = {
            id: generateId(),
            name: alternative.name || 'New Alternative',
            description: alternative.description || '',
            pros: alternative.pros || [],
            cons: alternative.cons || [],
            // Product-specific fields for Amazon integration
            isProduct: alternative.isProduct || false,
            asin: alternative.asin || '',
            price: alternative.price || null,
            rating: alternative.rating || null,
            reviewCount: alternative.reviewCount || 0,
            imageUrl: alternative.imageUrl || '',
            amazonUrl: alternative.amazonUrl || '',
            specs: alternative.specs || {}
        };
        
        const alternatives = [...(state.currentDecision.alternatives || []), newAlternative];
        await this.updateDecision({ alternatives });
        
        return newAlternative;
    },
    
    /**
     * Update an alternative
     */
    async updateAlternative(alternativeId, updates) {
        if (!state.currentDecision) return;
        
        const alternatives = state.currentDecision.alternatives.map(a =>
            a.id === alternativeId ? { ...a, ...updates } : a
        );
        
        await this.updateDecision({ alternatives });
    },
    
    /**
     * Delete an alternative
     */
    async deleteAlternative(alternativeId) {
        if (!state.currentDecision) return;
        
        const alternatives = state.currentDecision.alternatives.filter(a => a.id !== alternativeId);
        
        // Also remove scores for this alternative
        const scores = { ...state.currentDecision.scores };
        delete scores[alternativeId];
        
        await this.updateDecision({ alternatives, scores });
    },
    
    /**
     * Add multiple alternatives (from AI or product research)
     */
    async addAlternatives(alternativesList) {
        if (!state.currentDecision) return;
        
        const newAlternatives = alternativesList.map(a => ({
            id: generateId(),
            name: a.name,
            description: a.description || '',
            pros: a.pros || [],
            cons: a.cons || [],
            // Product-specific fields
            isProduct: a.isProduct || false,
            asin: a.asin || '',
            price: a.price || null,
            rating: a.rating || null,
            reviewCount: a.reviewCount || 0,
            imageUrl: a.imageUrl || '',
            amazonUrl: a.amazonUrl || '',
            specs: a.specs || {}
        }));
        
        const alternatives = [...(state.currentDecision.alternatives || []), ...newAlternatives];
        await this.updateDecision({ alternatives });
        
        return newAlternatives;
    },
    
    // ========================================
    // Score Operations
    // ========================================
    
    /**
     * Set a score
     */
    async setScore(alternativeId, criterionId, score, explanation = '') {
        if (!state.currentDecision) return;
        
        const scores = { ...state.currentDecision.scores };
        if (!scores[alternativeId]) {
            scores[alternativeId] = {};
        }
        
        scores[alternativeId][criterionId] = {
            value: score,
            explanation
        };
        
        await this.updateDecision({ scores });
    },
    
    /**
     * Set multiple scores for an alternative (from AI)
     */
    async setAlternativeScores(alternativeId, scoreMap) {
        if (!state.currentDecision) return;
        
        const scores = { ...state.currentDecision.scores };
        scores[alternativeId] = { ...scores[alternativeId], ...scoreMap };
        
        await this.updateDecision({ scores });
    },
    
    /**
     * Set all scores (from AI bulk evaluation)
     */
    async setAllScores(allScores) {
        if (!state.currentDecision) return;
        await this.updateDecision({ scores: allScores });
    },
    
    /**
     * Get score for an alternative-criterion pair
     */
    getScore(alternativeId, criterionId) {
        if (!state.currentDecision) return null;
        return state.currentDecision.scores?.[alternativeId]?.[criterionId];
    },
    
    /**
     * Calculate results
     */
    calculateResults() {
        const decision = state.currentDecision;
        if (!decision) return [];
        
        const results = decision.alternatives.map(alt => {
            const scores = decision.scores[alt.id] || {};
            const criteriaScores = {};
            
            for (const criterion of decision.criteria) {
                const scoreData = scores[criterion.id];
                criteriaScores[criterion.id] = scoreData?.value || 0;
            }
            
            const { total, maxPossible, percentage } = calculateTotalScore(
                criteriaScores,
                decision.criteria
            );
            
            return {
                id: alt.id,
                name: alt.name,
                description: alt.description,
                totalScore: total,
                maxPossible,
                percentage,
                criteriaScores,
                strengths: this._findStrengths(criteriaScores, decision.criteria),
                weaknesses: this._findWeaknesses(criteriaScores, decision.criteria)
            };
        });
        
        // Sort by total score (descending)
        results.sort((a, b) => b.totalScore - a.totalScore);
        
        // Add ranks
        results.forEach((r, i) => {
            r.rank = i + 1;
        });
        
        return results;
    },
    
    /**
     * Find strengths (top scoring criteria)
     */
    _findStrengths(scores, criteria) {
        return criteria
            .filter(c => (scores[c.id] || 0) >= 4) // 4-5 stars
            .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
            .slice(0, 3)
            .map(c => c.name);
    },
    
    /**
     * Find weaknesses (low scoring criteria)
     */
    _findWeaknesses(scores, criteria) {
        return criteria
            .filter(c => (scores[c.id] || 0) <= 2) // 1-2 stars
            .sort((a, b) => (scores[a.id] || 0) - (scores[b.id] || 0))
            .slice(0, 3)
            .map(c => c.name);
    },
    
    // ========================================
    // Navigation
    // ========================================
    
    /**
     * Set current step
     */
    setStep(step) {
        state.currentStep = step;
        this._notify('currentStep');
    },
    
    /**
     * Can proceed to next step?
     */
    canProceed(step) {
        const decision = state.currentDecision;
        if (!decision) return false;
        
        switch (step) {
            case 'alternatives':
                return (decision.criteria?.length || 0) >= 2;
            case 'evaluation':
                return (decision.alternatives?.length || 0) >= 2;
            case 'results':
                return true; // Can always view results
            default:
                return true;
        }
    },
    
    // ========================================
    // UI State
    // ========================================
    
    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        state.ui.sidebarOpen = !state.ui.sidebarOpen;
        this._notify('ui');
    },
    
    /**
     * Set theme
     */
    async setTheme(theme) {
        state.ui.theme = theme;
        await SettingsDB.set('theme', theme);
        this._notify('ui');
    },
    
    /**
     * Toggle theme
     */
    async toggleTheme() {
        const newTheme = state.ui.theme === 'dark' ? 'light' : 'dark';
        await this.setTheme(newTheme);
    },
    
    /**
     * Set evaluation view mode
     */
    setEvaluationView(view) {
        state.ui.evaluationView = view;
        this._notify('ui');
    },
    
    // ========================================
    // Settings
    // ========================================
    
    /**
     * Update settings
     */
    async updateSettings(newSettings) {
        for (const [key, value] of Object.entries(newSettings)) {
            await SettingsDB.set(key, value);
            state.settings[key] = value;
        }
        this._notify('settings');
    },
    
    /**
     * Get setting value
     */
    getSetting(key) {
        return state.settings[key];
    }
};

export default StateManager;
