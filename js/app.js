/**
 * ThinkFlow AI - Main Application
 * Decision-making powered by AI
 */

import { StateManager } from './state.js';
import { AI, aiService } from './ai.js';
import { templates, getTemplate, createDecisionFromTemplate } from './templates.js';
import { DecisionDB } from './db.js';
import {
    debounce,
    formatDate,
    showToast,
    getScoreColorClass,
    validateScore,
    exportToJSON,
    exportToCSV,
    exportToMarkdown,
    generateShareUrl,
    parseShareUrl,
    encryptApiKey,
    decryptApiKey,
    getRankSuffix
} from './utils.js';
import { 
    generateAffiliateLink, 
    formatPrice, 
    trackAffiliateClick,
    FTC_DISCLOSURE 
} from './affiliate.js';
import { 
    getCategoryConfig, 
    getCategories, 
    researchProducts,
    evaluateAllProducts,
    getProductComparison 
} from './amazon-research.js';
import { Analytics } from './analytics.js';

// ========================================
// DOM Elements
// ========================================

const elements = {
    // Layout
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    mainContent: document.getElementById('mainContent'),
    
    // Views
    welcomeView: document.getElementById('welcomeView'),
    decisionView: document.getElementById('decisionView'),
    
    // Header
    decisionTitleContainer: document.getElementById('decisionTitleContainer'),
    decisionTitleInput: document.getElementById('decisionTitleInput'),
    saveStatus: document.getElementById('saveStatus'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Sidebar
    newDecisionBtn: document.getElementById('newDecisionBtn'),
    decisionSearch: document.getElementById('decisionSearch'),
    decisionList: document.getElementById('decisionList'),
    templateList: document.getElementById('templateList'),
    productTemplateList: document.getElementById('productTemplateList'),
    exportAllBtn: document.getElementById('exportAllBtn'),
    
    // Welcome
    welcomeNewBtn: document.getElementById('welcomeNewBtn'),
    welcomeTemplateBtn: document.getElementById('welcomeTemplateBtn'),
    welcomeProductBtn: document.getElementById('welcomeProductBtn'),
    productCategories: document.getElementById('productCategories'),
    
    // Progress Steps
    progressSteps: document.querySelectorAll('.step'),
    
    // Step Contents
    criteriaStep: document.getElementById('criteriaStep'),
    alternativesStep: document.getElementById('alternativesStep'),
    evaluationStep: document.getElementById('evaluationStep'),
    resultsStep: document.getElementById('resultsStep'),
    
    // Criteria
    criteriaList: document.getElementById('criteriaList'),
    addCriterionBtn: document.getElementById('addCriterionBtn'),
    generateCriteriaBtn: document.getElementById('generateCriteriaBtn'),
    toCriteriaNext: document.getElementById('toCriteriaNext'),
    
    // Alternatives
    alternativesList: document.getElementById('alternativesList'),
    addAlternativeBtn: document.getElementById('addAlternativeBtn'),
    generateAlternativesBtn: document.getElementById('generateAlternativesBtn'),
    toAlternativesPrev: document.getElementById('toAlternativesPrev'),
    toAlternativesNext: document.getElementById('toAlternativesNext'),
    
    // Evaluation
    evaluationMatrix: document.getElementById('evaluationMatrix'),
    matrixView: document.getElementById('matrixView'),
    cardsView: document.getElementById('cardsView'),
    aiEvaluateAllBtn: document.getElementById('aiEvaluateAllBtn'),
    evaluationProgress: document.getElementById('evaluationProgress'),
    evaluationProgressText: document.getElementById('evaluationProgressText'),
    toEvaluationPrev: document.getElementById('toEvaluationPrev'),
    toEvaluationNext: document.getElementById('toEvaluationNext'),
    
    // Results
    winnerCard: document.getElementById('winnerCard'),
    winnerName: document.getElementById('winnerName'),
    winnerScore: document.getElementById('winnerScore'),
    winnerStrengths: document.getElementById('winnerStrengths'),
    scoresTable: document.getElementById('scoresTable'),
    getAiInsightsBtn: document.getElementById('getAiInsightsBtn'),
    aiInsightsCard: document.getElementById('aiInsightsCard'),
    aiInsightsContent: document.getElementById('aiInsightsContent'),
    shareDecisionBtn: document.getElementById('shareDecisionBtn'),
    exportDecisionBtn: document.getElementById('exportDecisionBtn'),
    toResultsPrev: document.getElementById('toResultsPrev'),
    newDecisionFromResults: document.getElementById('newDecisionFromResults'),
    
    // Modals
    settingsModal: document.getElementById('settingsModal'),
    aiSuggestionsModal: document.getElementById('aiSuggestionsModal'),
    exportModal: document.getElementById('exportModal'),
    shareModal: document.getElementById('shareModal'),
    templatesModal: document.getElementById('templatesModal'),
    confirmModal: document.getElementById('confirmModal'),
    
    // AI Modal
    aiModalTitle: document.getElementById('aiModalTitle'),
    aiLoading: document.getElementById('aiLoading'),
    aiSuggestionsList: document.getElementById('aiSuggestionsList'),
    aiError: document.getElementById('aiError'),
    aiRegenerateBtn: document.getElementById('aiRegenerateBtn'),
    aiAcceptAllBtn: document.getElementById('aiAcceptAllBtn'),
    aiRetryBtn: document.getElementById('aiRetryBtn'),
    
    // Share Modal
    shareLink: document.getElementById('shareLink'),
    copyShareLink: document.getElementById('copyShareLink'),
    
    // Templates Modal
    templatesGrid: document.getElementById('templatesGrid'),
    
    // Confirm Modal
    confirmTitle: document.getElementById('confirmTitle'),
    confirmMessage: document.getElementById('confirmMessage'),
    confirmActionBtn: document.getElementById('confirmActionBtn'),
    
    // Toast
    toastContainer: document.getElementById('toastContainer')
};

// Chart instances
let rankingsChart = null;
let radarChart = null;

// Current AI context
let currentAIContext = {
    type: null, // 'criteria' or 'alternatives'
    suggestions: []
};

// ========================================
// Initialization
// ========================================

async function init() {
    // Initialize state
    await StateManager.init();
    
    // Pre-configure DeepSeek API key if not already set
    let state = StateManager.getState();
    if (!state.settings.apiKey) {
        await StateManager.updateSettings({
            aiProvider: 'deepseek',
            apiKey: encryptApiKey('sk-e9a2e97742854bcfa65a817495e7a59a')
        });
        // Reload state after updating
        state = StateManager.getState();
    }
    
    // Initialize AI service with the configured key
    await aiService.setConfig(
        state.settings.aiProvider || 'deepseek',
        state.settings.apiKey ? decryptApiKey(state.settings.apiKey) : ''
    );
    await AI.init();
    
    // Apply saved theme (default to light)
    const currentState = StateManager.getState();
    const theme = currentState.ui.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Initialize sidebar state (collapsed on mobile)
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.add('collapsed');
    }
    
    // Check for shared decision in URL
    const sharedDecision = parseShareUrl();
    if (sharedDecision) {
        await handleSharedDecision(sharedDecision);
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Subscribe to state changes
    setupStateSubscriptions();
    
    // Render initial UI
    renderDecisionList();
    renderTemplatesList();
    
    // Show appropriate view
    if (state.currentDecision) {
        showDecisionView();
    } else {
        showWelcomeView();
    }
}

/**
 * Handle shared decision from URL
 */
async function handleSharedDecision(sharedDecision) {
    const decision = await StateManager.createDecision({
        title: sharedDecision.title + ' (Imported)',
        description: sharedDecision.description,
        criteria: sharedDecision.criteria,
        alternatives: sharedDecision.alternatives,
        scores: sharedDecision.scores
    });
    
    showToast('Decision imported from shared link!', 'success');
    
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
    // Sidebar toggle
    elements.sidebarToggle.addEventListener('click', () => {
        elements.sidebar.classList.toggle('collapsed');
        StateManager.toggleSidebar();
    });
    
    // Handle window resize for sidebar
    window.addEventListener('resize', () => {
        // On desktop, remove collapsed if sidebar should be visible
        if (window.innerWidth > 768) {
            const state = StateManager.getState();
            if (!state.ui.sidebarOpen) {
                elements.sidebar.classList.remove('collapsed');
            }
        }
    });
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', async () => {
        await StateManager.toggleTheme();
        const state = StateManager.getState();
        document.documentElement.setAttribute('data-theme', state.ui.theme);
        
        // Re-render charts if on results page
        if (state.currentStep === 'results' && state.currentDecision) {
            const results = StateManager.calculateResults();
            if (results.length > 0 && state.currentDecision.criteria) {
                renderRankingsChart(results);
                renderRadarChart(results, state.currentDecision.criteria);
            }
        }
    });
    
    // New Decision buttons
    elements.newDecisionBtn.addEventListener('click', createNewDecision);
    elements.welcomeNewBtn.addEventListener('click', createNewDecision);
    elements.newDecisionFromResults.addEventListener('click', createNewDecision);
    
    // Product comparison button
    if (elements.welcomeProductBtn) {
        elements.welcomeProductBtn.addEventListener('click', () => openModal('templates'));
    }
    
    // Product category cards
    if (elements.productCategories) {
        elements.productCategories.addEventListener('click', (e) => {
            const categoryCard = e.target.closest('.category-card');
            if (categoryCard) {
                const category = categoryCard.dataset.category;
                startProductComparison(category);
            }
        });
    }
    
    // Templates
    elements.welcomeTemplateBtn.addEventListener('click', () => openModal('templates'));
    
    // Decision title editing
    elements.decisionTitleInput.addEventListener('input', debounce(updateDecisionTitle, 500));
    
    // Decision search
    elements.decisionSearch.addEventListener('input', debounce(handleDecisionSearch, 300));
    
    // Export
    elements.exportAllBtn.addEventListener('click', handleExportAll);
    
    // Criteria step
    elements.addCriterionBtn.addEventListener('click', addCriterion);
    elements.generateCriteriaBtn.addEventListener('click', generateCriteria);
    elements.toCriteriaNext.addEventListener('click', () => navigateToStep('alternatives'));
    
    // Alternatives step
    elements.addAlternativeBtn.addEventListener('click', addAlternative);
    elements.generateAlternativesBtn.addEventListener('click', generateAlternatives);
    elements.toAlternativesPrev.addEventListener('click', () => navigateToStep('criteria'));
    elements.toAlternativesNext.addEventListener('click', () => navigateToStep('evaluation'));
    
    // Evaluation step
    elements.aiEvaluateAllBtn.addEventListener('click', aiEvaluateAll);
    elements.toEvaluationPrev.addEventListener('click', () => navigateToStep('alternatives'));
    elements.toEvaluationNext.addEventListener('click', () => navigateToStep('results'));
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            elements.matrixView.style.display = view === 'matrix' ? 'block' : 'none';
            elements.cardsView.style.display = view === 'cards' ? 'block' : 'none';
        });
    });
    
    // Results step
    elements.getAiInsightsBtn.addEventListener('click', getAIInsights);
    elements.shareDecisionBtn.addEventListener('click', shareDecision);
    elements.exportDecisionBtn.addEventListener('click', () => openModal('export'));
    elements.toResultsPrev.addEventListener('click', () => navigateToStep('evaluation'));
    
    // Progress steps click
    elements.progressSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepName = step.dataset.step;
            if (StateManager.canProceed(stepName)) {
                navigateToStep(stepName);
            }
        });
    });
    
    // AI Modal
    elements.aiRegenerateBtn.addEventListener('click', regenerateAISuggestions);
    elements.aiAcceptAllBtn.addEventListener('click', acceptAllAISuggestions);
    elements.aiRetryBtn.addEventListener('click', retryAI);
    
    // Export Modal
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            const format = option.dataset.format;
            exportDecision(format);
            closeAllModals();
        });
    });
    
    // Share Modal
    elements.copyShareLink.addEventListener('click', copyShareLink);
    
    // Template list in sidebar
    elements.templateList.addEventListener('click', (e) => {
        const item = e.target.closest('.nav-item');
        if (item) {
            const templateId = item.dataset.template;
            applyTemplate(templateId);
        }
    });
    
    // Product template list in sidebar
    if (elements.productTemplateList) {
        elements.productTemplateList.addEventListener('click', (e) => {
            const item = e.target.closest('.nav-item');
            if (item) {
                const templateId = item.dataset.template;
                applyTemplate(templateId);
            }
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
        el.addEventListener('click', closeAllModals);
    });
    
    // Prevent modal content clicks from closing
    document.querySelectorAll('.modal-content').forEach(el => {
        el.addEventListener('click', (e) => e.stopPropagation());
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ========================================
// State Subscriptions
// ========================================

function setupStateSubscriptions() {
    StateManager.subscribe('currentDecision', (decision) => {
        if (decision) {
            showDecisionView();
            renderCurrentDecision();
        } else {
            showWelcomeView();
        }
    });
    
    StateManager.subscribe('decisions', () => {
        renderDecisionList();
    });
    
    StateManager.subscribe('currentStep', (step) => {
        updateProgressSteps(step);
        showStepContent(step);
    });
    
    StateManager.subscribe('ui', (ui) => {
        // Re-render charts when theme changes
        const state = StateManager.getState();
        if (state.currentStep === 'results' && state.currentDecision) {
            const results = StateManager.calculateResults();
            if (results.length > 0) {
                renderRankingsChart(results);
                renderRadarChart(results, state.currentDecision.criteria);
            }
        }
    });
}

// ========================================
// View Management
// ========================================

function showWelcomeView() {
    elements.welcomeView.classList.add('active');
    elements.decisionView.classList.remove('active');
    elements.decisionTitleContainer.style.display = 'none';
}

function showDecisionView() {
    elements.welcomeView.classList.remove('active');
    elements.decisionView.classList.add('active');
    elements.decisionTitleContainer.style.display = 'flex';
}

function updateProgressSteps(currentStep) {
    const steps = ['criteria', 'alternatives', 'evaluation', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    
    elements.progressSteps.forEach((stepEl, index) => {
        const stepName = stepEl.dataset.step;
        const stepIndex = steps.indexOf(stepName);
        
        stepEl.classList.remove('active', 'completed');
        
        if (stepIndex < currentIndex) {
            stepEl.classList.add('completed');
        } else if (stepIndex === currentIndex) {
            stepEl.classList.add('active');
        }
    });
}

function showStepContent(step) {
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    
    const stepElement = document.getElementById(`${step}Step`);
    if (stepElement) {
        stepElement.classList.add('active');
    }
    
    // Render step-specific content
    const state = StateManager.getState();
    if (state.currentDecision) {
        switch (step) {
            case 'criteria':
                renderCriteria();
                break;
            case 'alternatives':
                renderAlternatives();
                break;
            case 'evaluation':
                renderEvaluationMatrix();
                break;
            case 'results':
                renderResults();
                // Track comparison completion
                const decision = StateManager.getState().currentDecision;
                Analytics.trackComparisonCompleted({
                    category: decision?.category || 'general',
                    alternativesCount: decision?.alternatives?.length || 0,
                    isProductComparison: decision?.isProductComparison || false
                });
                break;
        }
    }
}

function navigateToStep(step) {
    StateManager.setStep(step);
}

// ========================================
// Decision Management
// ========================================

async function createNewDecision() {
    await StateManager.createDecision({
        title: 'Untitled Decision',
        description: ''
    });
    showToast('New decision created', 'success');
}

/**
 * Start a product comparison for a specific category
 */
async function startProductComparison(category) {
    const config = getCategoryConfig(category);
    if (!config) {
        showToast('Unknown product category', 'error');
        return;
    }
    
    // Create a new decision with product-specific criteria
    await StateManager.createDecision({
        title: `${config.name} Comparison`,
        description: `Compare ${config.name.toLowerCase()} to find the best option for your needs.`,
        category: category,
        isProductComparison: true,
        criteria: config.defaultCriteria.map((c, i) => ({
            id: `criterion-${i}`,
            name: c.name,
            weight: c.weight,
            description: c.description
        }))
    });
    
    // Track analytics
    Analytics.trackComparisonStarted(category);
    
    // Navigate to alternatives step since criteria are pre-filled
    StateManager.setStep('alternatives');
    
    showToast(`${config.name} comparison started! Add products to compare.`, 'success');
}

/**
 * AI-powered product research
 */
async function aiResearchProducts() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision) return;
    
    // Get category from decision or default to general
    const category = decision.category || 'laptop';
    const decisionTitle = decision.title || '';
    
    // Show loading state
    elements.generateAlternativesBtn.disabled = true;
    elements.generateAlternativesBtn.innerHTML = `
        <div class="spinner-small"></div>
        Researching products...
    `;
    
    try {
        // Research products using AI
        const products = await researchProducts(category, {
            maxProducts: 4,
            specificQuery: decisionTitle.includes('Comparison') ? null : decisionTitle
        });
        
        if (products.length === 0) {
            showToast('No products found. Try a different search.', 'warning');
            return;
        }
        
        // Add products as alternatives
        const alternatives = products.map(p => p.toAlternative());
        await StateManager.addAlternatives(alternatives);
        
        showToast(`Found ${products.length} products to compare!`, 'success');
        renderAlternatives();
        
    } catch (error) {
        console.error('Product research error:', error);
        showToast('Failed to research products. Please try again.', 'error');
    } finally {
        elements.generateAlternativesBtn.disabled = false;
        elements.generateAlternativesBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            ${decision.isProductComparison ? 'AI Research Products' : 'Suggest with AI'}
        `;
    }
}

async function updateDecisionTitle() {
    const title = elements.decisionTitleInput.value.trim();
    if (title) {
        elements.saveStatus.textContent = 'Saving...';
        elements.saveStatus.classList.add('saving');
        
        await StateManager.updateDecision({ title });
        
        elements.saveStatus.textContent = 'Saved';
        elements.saveStatus.classList.remove('saving');
    }
}

function handleDecisionSearch(e) {
    const query = e.target.value.toLowerCase();
    const items = elements.decisionList.querySelectorAll('.nav-item');
    
    items.forEach(item => {
        const title = item.querySelector('span:last-child').textContent.toLowerCase();
        item.style.display = title.includes(query) ? 'flex' : 'none';
    });
}

async function loadDecision(id) {
    await StateManager.loadDecision(id);
}

async function deleteDecision(id, e) {
    e.stopPropagation();
    
    elements.confirmTitle.textContent = 'Delete Decision';
    elements.confirmMessage.textContent = 'Are you sure you want to delete this decision? This cannot be undone.';
    elements.confirmActionBtn.onclick = async () => {
        await StateManager.deleteDecision(id);
        closeAllModals();
        showToast('Decision deleted', 'success');
    };
    
    openModal('confirm');
}

// ========================================
// Rendering Functions
// ========================================

function renderDecisionList() {
    const state = StateManager.getState();
    const decisions = state.decisions;
    
    if (decisions.length === 0) {
        elements.decisionList.innerHTML = `
            <li class="nav-item nav-item-empty">
                <span class="nav-icon">📋</span>
                <span>No decisions yet</span>
            </li>
        `;
        return;
    }
    
    elements.decisionList.innerHTML = decisions.map(d => `
        <li class="nav-item ${state.currentDecision?.id === d.id ? 'active' : ''}" 
            data-id="${d.id}" onclick="window.app.loadDecision('${d.id}')">
            <span class="nav-icon">📊</span>
            <span>${escapeHtml(d.title)}</span>
            <div class="nav-item-actions">
                <button class="btn-icon" onclick="window.app.deleteDecision('${d.id}', event)" title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </li>
    `).join('');
}

function renderTemplatesList() {
    elements.templatesGrid.innerHTML = templates.map(t => `
        <div class="template-card" data-template="${t.id}" onclick="window.app.applyTemplate('${t.id}')">
            <div class="template-icon">${t.icon}</div>
            <h4>${t.name}</h4>
            <p>${t.description}</p>
        </div>
    `).join('');
}

function renderCurrentDecision() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision) return;
    
    elements.decisionTitleInput.value = decision.title;
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Render current step content
    showStepContent(state.currentStep);
}

function updateNavigationButtons() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    // Criteria -> Alternatives
    elements.toCriteriaNext.disabled = (decision?.criteria?.length || 0) < 2;
    
    // Alternatives -> Evaluation
    elements.toAlternativesNext.disabled = (decision?.alternatives?.length || 0) < 2;
}

// ========================================
// Criteria Rendering
// ========================================

function renderCriteria() {
    const state = StateManager.getState();
    const criteria = state.currentDecision?.criteria || [];
    
    if (criteria.length === 0) {
        elements.criteriaList.innerHTML = `
            <div class="empty-state">
                <p>No criteria yet. Add criteria manually or use AI to generate them.</p>
            </div>
        `;
    } else {
        elements.criteriaList.innerHTML = criteria.map((c, index) => `
            <div class="criterion-card" data-id="${c.id}" data-index="${index}">
                <div class="criterion-header">
                    <div class="drag-handle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="5" r="1"></circle>
                            <circle cx="9" cy="12" r="1"></circle>
                            <circle cx="9" cy="19" r="1"></circle>
                            <circle cx="15" cy="5" r="1"></circle>
                            <circle cx="15" cy="12" r="1"></circle>
                            <circle cx="15" cy="19" r="1"></circle>
                        </svg>
                    </div>
                    <input type="text" class="criterion-name" value="${escapeHtml(c.name)}" 
                        onchange="window.app.updateCriterion('${c.id}', 'name', this.value)">
                    <div class="criterion-actions">
                        <button class="btn-icon" onclick="window.app.deleteCriterion('${c.id}')" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="criterion-body">
                    <div class="weight-control">
                        <span class="weight-label">Weight</span>
                        <input type="range" class="weight-slider" min="0.1" max="3" step="0.1" value="${c.weight}"
                            oninput="window.app.updateCriterionWeight('${c.id}', this.value, this)">
                        <span class="weight-value">${c.weight.toFixed(1)}</span>
                    </div>
                </div>
                <textarea class="criterion-description" placeholder="Description (optional)"
                    onchange="window.app.updateCriterion('${c.id}', 'description', this.value)">${escapeHtml(c.description || '')}</textarea>
            </div>
        `).join('');
        
        // Initialize Sortable for drag-and-drop
        if (typeof Sortable !== 'undefined') {
            new Sortable(elements.criteriaList, {
                handle: '.drag-handle',
                animation: 150,
                onEnd: (evt) => {
                    StateManager.reorderCriteria(evt.oldIndex, evt.newIndex);
                }
            });
        }
    }
    
    updateNavigationButtons();
}

async function addCriterion() {
    await StateManager.addCriterion();
    renderCriteria();
}

async function updateCriterion(id, field, value) {
    await StateManager.updateCriterion(id, { [field]: value });
}

async function updateCriterionWeight(id, value, slider) {
    const weight = parseFloat(value);
    slider.parentElement.querySelector('.weight-value').textContent = weight.toFixed(1);
    await StateManager.updateCriterion(id, { weight });
}

async function deleteCriterion(id) {
    await StateManager.deleteCriterion(id);
    renderCriteria();
    showToast('Criterion deleted', 'success');
}

// ========================================
// Alternatives Rendering
// ========================================

function renderAlternatives() {
    const state = StateManager.getState();
    const alternatives = state.currentDecision?.alternatives || [];
    const isProductComparison = state.currentDecision?.isProductComparison;
    
    if (alternatives.length === 0) {
        elements.alternativesList.innerHTML = `
            <div class="empty-state" style="grid-column: span 2;">
                <p>${isProductComparison 
                    ? 'Click "AI Research Products" to find products to compare, or add them manually.' 
                    : 'No alternatives yet. Add options to compare or let AI suggest some.'}</p>
            </div>
        `;
    } else {
        elements.alternativesList.innerHTML = alternatives.map(a => {
            // Check if this is a product with Amazon data
            if (a.isProduct || a.asin) {
                return renderProductCard(a);
            }
            
            // Standard alternative card
            return `
                <div class="alternative-card" data-id="${a.id}">
                    <div class="alternative-header">
                        <input type="text" class="alternative-name" value="${escapeHtml(a.name)}"
                            onchange="window.app.updateAlternative('${a.id}', 'name', this.value)">
                        <div class="criterion-actions">
                            <button class="btn-icon" onclick="window.app.deleteAlternative('${a.id}')" title="Delete">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <textarea class="alternative-description" placeholder="Description (optional)"
                        onchange="window.app.updateAlternative('${a.id}', 'description', this.value)">${escapeHtml(a.description || '')}</textarea>
                    ${a.pros?.length || a.cons?.length ? `
                        <div class="alternative-meta">
                            ${a.pros?.map(p => `<span class="alternative-tag pro">✓ ${escapeHtml(p)}</span>`).join('') || ''}
                            ${a.cons?.map(c => `<span class="alternative-tag con">✗ ${escapeHtml(c)}</span>`).join('') || ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    updateNavigationButtons();
}

/**
 * Render a product card with Amazon data
 */
function renderProductCard(product) {
    const priceDisplay = product.price ? formatPrice(product.price) : 'Check Price';
    const ratingStars = product.rating ? '⭐'.repeat(Math.round(product.rating)) : '';
    const amazonUrl = product.amazonUrl || (product.asin ? generateAffiliateLink(product.asin) : '');
    
    return `
        <div class="alternative-card product" data-id="${product.id}" data-asin="${product.asin || ''}">
            <div class="product-image">
                ${product.imageUrl 
                    ? `<img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" loading="lazy">`
                    : `<span class="product-image-placeholder">📦</span>`
                }
            </div>
            <div class="product-info">
                <div class="alternative-header">
                    <input type="text" class="alternative-name" value="${escapeHtml(product.name)}"
                        onchange="window.app.updateAlternative('${product.id}', 'name', this.value)">
                    <div class="criterion-actions">
                        <button class="btn-icon" onclick="window.app.deleteAlternative('${product.id}')" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="product-meta">
                    ${product.rating ? `
                        <div class="product-rating">
                            <span class="rating-stars">${ratingStars}</span>
                            <span class="rating-value">${product.rating.toFixed(1)}</span>
                            ${product.reviewCount ? `<span class="review-count">(${product.reviewCount.toLocaleString()})</span>` : ''}
                        </div>
                    ` : ''}
                    <div class="product-price">${priceDisplay}</div>
                </div>
                
                ${product.description ? `
                    <p class="product-description">${escapeHtml(product.description)}</p>
                ` : ''}
                
                ${product.specs && Object.keys(product.specs).length > 0 ? `
                    <div class="product-specs">
                        ${Object.entries(product.specs).slice(0, 4).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-label">${escapeHtml(key.replace(/_/g, ' '))}:</span>
                                <span class="spec-value">${escapeHtml(String(value))}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${product.pros?.length || product.cons?.length ? `
                    <div class="alternative-meta">
                        ${(product.pros || []).slice(0, 2).map(p => `<span class="alternative-tag pro">✓ ${escapeHtml(p)}</span>`).join('')}
                        ${(product.cons || []).slice(0, 2).map(c => `<span class="alternative-tag con">✗ ${escapeHtml(c)}</span>`).join('')}
                    </div>
                ` : ''}
                
                ${amazonUrl ? `
                    <a href="${amazonUrl}" 
                       class="btn btn-amazon btn-sm" 
                       target="_blank" 
                       rel="noopener sponsored"
                       onclick="window.trackAffiliateClick && window.trackAffiliateClick({asin: '${product.asin || 'search'}', productName: '${escapeHtml(product.name).replace(/'/g, "\\'")}', source: 'alternatives'})">
                        ${product.asin ? 'View on Amazon' : 'Search on Amazon'}
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

async function addAlternative() {
    await StateManager.addAlternative();
    renderAlternatives();
}

async function updateAlternative(id, field, value) {
    await StateManager.updateAlternative(id, { [field]: value });
}

async function deleteAlternative(id) {
    await StateManager.deleteAlternative(id);
    renderAlternatives();
    showToast('Alternative deleted', 'success');
}

// ========================================
// Evaluation Matrix
// ========================================

function renderEvaluationMatrix() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision) return;
    
    const criteria = decision.criteria || [];
    const alternatives = decision.alternatives || [];
    const scores = decision.scores || {};
    const maxScore = state.settings.scoreScale || 10;
    
    // Calculate progress
    const totalCells = criteria.length * alternatives.length;
    let filledCells = 0;
    
    // Build table header
    let html = `
        <thead>
            <tr>
                <th>Alternative</th>
                ${criteria.map(c => `<th title="${escapeHtml(c.description || '')}">${escapeHtml(c.name)}<br><small>w: ${c.weight}</small></th>`).join('')}
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    // Build rows
    for (const alt of alternatives) {
        let totalScore = 0;
        html += `<tr data-alternative="${alt.id}">`;
        html += `<td><strong>${escapeHtml(alt.name)}</strong></td>`;
        
        for (const criterion of criteria) {
            const scoreData = scores[alt.id]?.[criterion.id];
            const score = scoreData?.value || '';
            const explanation = scoreData?.explanation || '';
            
            if (score !== '') {
                filledCells++;
                totalScore += parseFloat(score) * criterion.weight;
            }
            
            // Generate star rating (1-5 stars)
            const currentScore = score !== '' ? parseInt(score) : 0;
            let starsHtml = '<div class="star-rating" data-alt="' + alt.id + '" data-criterion="' + criterion.id + '" title="' + escapeHtml(explanation) + '">';
            for (let i = 1; i <= maxScore; i++) {
                const filled = i <= currentScore ? 'filled' : '';
                starsHtml += `<span class="star ${filled}" data-value="${i}">★</span>`;
            }
            starsHtml += '</div>';
            
            html += `<td class="score-cell">${starsHtml}</td>`;
        }
        
        html += `<td class="total-cell">${totalScore.toFixed(1)}</td>`;
        html += `</tr>`;
    }
    
    html += `</tbody>`;
    elements.evaluationMatrix.innerHTML = html;
    
    // Add event listeners for star ratings
    document.querySelectorAll('.star-rating').forEach(rating => {
        const altId = rating.dataset.alt;
        const criterionId = rating.dataset.criterion;
        
        rating.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                const value = e.target.dataset.value;
                setScore(altId, criterionId, value);
            }
        });
        
        // Visual hover effect
        const stars = rating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = '#fbbf24';
                    } else {
                        s.style.color = '';
                    }
                });
            });
        });
        
        rating.addEventListener('mouseleave', () => {
            // Reset to current score
            const scoreData = scores[altId]?.[criterionId];
            const currentScore = scoreData?.value || 0;
            stars.forEach((s, i) => {
                if (i < currentScore) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = '';
                }
            });
        });
    });
    
    // Update progress
    const progress = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;
    elements.evaluationProgress.style.width = `${progress}%`;
    elements.evaluationProgressText.textContent = `${progress}% complete`;
}

async function setScore(altId, criterionId, value) {
    const state = StateManager.getState();
    const maxScore = state.settings.scoreScale || 5;
    const validatedScore = validateScore(value, maxScore);
    
    await StateManager.setScore(altId, criterionId, validatedScore);
    
    // Update the star rating display
    const rating = document.querySelector(`.star-rating[data-alt="${altId}"][data-criterion="${criterionId}"]`);
    if (rating) {
        const stars = rating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < validatedScore) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }
    
    // Update total for this row
    renderEvaluationMatrix();
}

// ========================================
// Results
// ========================================

function renderResults() {
    const results = StateManager.calculateResults();
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (results.length === 0) {
        return;
    }
    
    // Find the winning alternative's full data (including product info)
    const winner = results[0];
    const winnerAlt = decision.alternatives.find(a => a.id === winner.id);
    const isProduct = winnerAlt?.isProduct || winnerAlt?.asin;
    
    // Render winner card
    elements.winnerName.textContent = winner.name;
    elements.winnerScore.textContent = `${winner.totalScore.toFixed(1)} pts`;
    elements.winnerStrengths.innerHTML = winner.strengths
        .map(s => `<span class="strength-tag">✓ ${escapeHtml(s)}</span>`)
        .join('');
    
    // Add Amazon buy button for product winners
    const winnerCard = document.getElementById('winnerCard');
    const existingBuySection = winnerCard.querySelector('.winner-buy-section');
    if (existingBuySection) {
        existingBuySection.remove();
    }
    
    if (isProduct && winnerAlt.amazonUrl) {
        const amazonUrl = winnerAlt.amazonUrl;
        const priceDisplay = winnerAlt.price ? formatPrice(winnerAlt.price) : '';
        const hasRealAsin = winnerAlt.asin && winnerAlt.asin.length > 0;
        
        const buySection = document.createElement('div');
        buySection.className = 'winner-buy-section';
        buySection.innerHTML = `
            ${priceDisplay ? `<div class="winner-price">${priceDisplay}</div>` : ''}
            <a href="${amazonUrl}" 
               class="btn btn-amazon btn-lg" 
               target="_blank" 
               rel="noopener sponsored"
               onclick="window.trackAffiliateClick && window.trackAffiliateClick({asin: '${winnerAlt.asin || 'search'}', productName: '${escapeHtml(winner.name).replace(/'/g, "\\'")}', source: 'winner_card'})">
                <svg class="amazon-icon" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M15.93 17.09c-.18.16-.43.17-.63.06-.89-.74-1.05-1.08-1.54-1.79-1.47 1.5-2.51 1.95-4.42 1.95-2.25 0-4.01-1.39-4.01-4.17 0-2.18 1.17-3.64 2.86-4.38 1.46-.64 3.49-.76 5.04-.93v-.35c0-.64.05-1.4-.33-1.96-.32-.49-.95-.7-1.5-.7-1.02 0-1.93.53-2.15 1.61-.05.24-.23.47-.48.48l-2.66-.29c-.22-.05-.47-.22-.4-.55C6.26 3.37 8.74 2.5 10.94 2.5c1.14 0 2.63.3 3.53 1.17 1.14 1.06 1.03 2.48 1.03 4.03v3.65c0 1.1.45 1.58.88 2.18.15.21.18.46-.01.62-.48.4-1.35 1.14-1.82 1.56l-.62-.62z"/>
                </svg>
                ${hasRealAsin ? 'Buy Winner on Amazon' : 'Find Winner on Amazon'}
            </a>
        `;
        winnerCard.appendChild(buySection);
    }
    
    // Render scores table (using state and decision from above)
    const criteria = decision.criteria;
    
    let tableHtml = `
        <thead>
            <tr>
                <th>Rank</th>
                <th>Alternative</th>
                ${criteria.map(c => `<th>${escapeHtml(c.name)}</th>`).join('')}
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    for (const result of results) {
        const rowClass = result.rank === 1 ? 'rank-1' : '';
        tableHtml += `<tr class="${rowClass}">`;
        tableHtml += `<td><strong>${getRankSuffix(result.rank)}</strong></td>`;
        tableHtml += `<td>${escapeHtml(result.name)}</td>`;
        
        for (const criterion of criteria) {
            const score = result.criteriaScores[criterion.id] || 0;
            tableHtml += `<td>${score}</td>`;
        }
        
        tableHtml += `<td><strong>${result.totalScore.toFixed(1)}</strong></td>`;
        tableHtml += `</tr>`;
    }
    
    tableHtml += `</tbody>`;
    elements.scoresTable.innerHTML = tableHtml;
    
    // Render charts
    renderRankingsChart(results);
    renderRadarChart(results, criteria);
}

function renderRankingsChart(results) {
    const ctx = document.getElementById('rankingsChart');
    
    if (rankingsChart) {
        rankingsChart.destroy();
    }
    
    const colors = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 211, 238, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)'
    ];
    
    // Detect current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDarkTheme = currentTheme === 'dark';
    console.log('Rankings Chart - Current theme:', currentTheme, 'isDark:', isDarkTheme);
    
    const textColor = isDarkTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 46, 0.9)';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const tickColor = isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 46, 0.7)';
    
    console.log('Rankings Chart colors - text:', textColor, 'grid:', gridColor, 'tick:', tickColor);
    
    rankingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map(r => r.name),
            datasets: [{
                label: 'Total Score',
                data: results.map(r => r.totalScore),
                backgroundColor: results.map((_, i) => colors[i % colors.length]),
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    display: false 
                },
                tooltip: {
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { 
                        color: gridColor,
                        lineWidth: 1
                    },
                    ticks: { 
                        color: tickColor,
                        font: { size: 12, weight: '500' }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { 
                        color: textColor,
                        font: { size: 13, weight: '600' },
                        padding: 8
                    }
                }
            }
        }
    });
}

function renderRadarChart(results, criteria) {
    const ctx = document.getElementById('radarChart');
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    const colors = [
        { bg: 'rgba(99, 102, 241, 0.2)', border: 'rgba(99, 102, 241, 1)' },
        { bg: 'rgba(34, 211, 238, 0.2)', border: 'rgba(34, 211, 238, 1)' },
        { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 1)' }
    ];
    
    const topResults = results.slice(0, 3);
    
    // Detect current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDarkTheme = currentTheme === 'dark';
    console.log('Radar Chart - Current theme:', currentTheme, 'isDark:', isDarkTheme);
    
    const textColor = isDarkTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 46, 0.9)';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    const labelColor = isDarkTheme ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 26, 46, 0.8)';
    const tickColor = isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(26, 26, 46, 0.5)';
    
    console.log('Radar Chart colors - text:', textColor, 'label:', labelColor);
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: criteria.map(c => c.name),
            datasets: topResults.map((r, i) => ({
                label: r.name,
                data: criteria.map(c => r.criteriaScores[c.id] || 0),
                backgroundColor: colors[i].bg,
                borderColor: colors[i].border,
                borderWidth: 2,
                pointBackgroundColor: colors[i].border,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { 
                        color: textColor,
                        font: { size: 13, weight: '500' },
                        padding: 15
                    }
                },
                tooltip: {
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                r: {
                    angleLines: { 
                        color: gridColor,
                        lineWidth: 1
                    },
                    grid: { 
                        color: gridColor,
                        lineWidth: 1
                    },
                    pointLabels: { 
                        color: labelColor,
                        font: { size: 12, weight: '600' },
                        padding: 10
                    },
                    ticks: { 
                        color: tickColor,
                        backdropColor: 'transparent',
                        font: { size: 11 },
                        stepSize: 1
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    });
}

// ========================================
// AI Functions
// ========================================

async function generateCriteria() {
    if (!AI.isAvailable()) {
        showToast('Please configure your API key in Settings first', 'warning');
        openModal('settings');
        return;
    }
    
    currentAIContext.type = 'criteria';
    openModal('aiSuggestions');
    elements.aiModalTitle.textContent = 'AI Criteria Suggestions';
    elements.aiLoading.style.display = 'flex';
    elements.aiSuggestionsList.innerHTML = '';
    elements.aiError.style.display = 'none';
    
    try {
        const state = StateManager.getState();
        const suggestions = await AI.suggestCriteria(state.currentDecision);
        currentAIContext.suggestions = suggestions;
        renderAISuggestions(suggestions, 'criteria');
    } catch (error) {
        console.error('AI Error:', error);
        elements.aiError.style.display = 'block';
        elements.aiError.querySelector('p').textContent = error.message;
    } finally {
        elements.aiLoading.style.display = 'none';
    }
}

async function generateAlternatives() {
    if (!AI.isAvailable()) {
        showToast('Please configure your API key in Settings first', 'warning');
        return;
    }
    
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    // Use AI product research for product comparisons
    if (decision?.isProductComparison || decision?.category) {
        await aiResearchProducts();
        return;
    }
    
    currentAIContext.type = 'alternatives';
    openModal('aiSuggestions');
    elements.aiModalTitle.textContent = 'AI Alternative Suggestions';
    elements.aiLoading.style.display = 'flex';
    elements.aiSuggestionsList.innerHTML = '';
    elements.aiError.style.display = 'none';
    
    try {
        const suggestions = await AI.suggestAlternatives(decision);
        currentAIContext.suggestions = suggestions;
        renderAISuggestions(suggestions, 'alternatives');
    } catch (error) {
        console.error('AI Error:', error);
        elements.aiError.style.display = 'block';
        elements.aiError.querySelector('p').textContent = error.message;
    } finally {
        elements.aiLoading.style.display = 'none';
    }
}

function renderAISuggestions(suggestions, type) {
    elements.aiSuggestionsList.innerHTML = suggestions.map((s, i) => `
        <div class="ai-suggestion-card" data-index="${i}">
            <div class="ai-suggestion-header">
                <h4>${escapeHtml(s.name)}</h4>
                <button class="btn btn-sm btn-primary" onclick="window.app.acceptAISuggestion(${i})">
                    Accept
                </button>
            </div>
            <div class="ai-suggestion-body">
                <p>${escapeHtml(s.description || s.rationale || '')}</p>
                ${type === 'criteria' ? `
                    <div class="ai-suggestion-meta">
                        <span>Suggested weight: ${s.weight}</span>
                    </div>
                ` : ''}
                ${type === 'alternatives' && s.pros ? `
                    <div class="ai-suggestion-meta">
                        <span>Pros: ${s.pros.slice(0, 2).join(', ')}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

async function acceptAISuggestion(index) {
    const suggestion = currentAIContext.suggestions[index];
    
    if (currentAIContext.type === 'criteria') {
        await StateManager.addCriterion({
            name: suggestion.name,
            description: suggestion.description || suggestion.rationale,
            weight: suggestion.weight || 1.0
        });
        renderCriteria();
    } else {
        await StateManager.addAlternative({
            name: suggestion.name,
            description: suggestion.description,
            pros: suggestion.pros,
            cons: suggestion.cons
        });
        renderAlternatives();
    }
    
    // Mark as accepted in UI
    const card = document.querySelector(`.ai-suggestion-card[data-index="${index}"]`);
    if (card) {
        card.classList.add('selected');
        card.querySelector('button').textContent = 'Added ✓';
        card.querySelector('button').disabled = true;
    }
    
    showToast('Added!', 'success');
}

async function acceptAllAISuggestions() {
    if (currentAIContext.type === 'criteria') {
        await StateManager.addCriteria(currentAIContext.suggestions);
        renderCriteria();
    } else {
        await StateManager.addAlternatives(currentAIContext.suggestions);
        renderAlternatives();
    }
    
    closeAllModals();
    showToast('All suggestions added!', 'success');
}

async function regenerateAISuggestions() {
    if (currentAIContext.type === 'criteria') {
        await generateCriteria();
    } else {
        await generateAlternatives();
    }
}

function retryAI() {
    if (currentAIContext.type === 'criteria') {
        generateCriteria();
    } else {
        generateAlternatives();
    }
}

async function aiEvaluateAll() {
    if (!AI.isAvailable()) {
        showToast('Please configure your API key in Settings first', 'warning');
        openModal('settings');
        return;
    }
    
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision.alternatives?.length || !decision.criteria?.length) {
        showToast('Add alternatives and criteria first', 'warning');
        return;
    }
    
    elements.aiEvaluateAllBtn.disabled = true;
    elements.aiEvaluateAllBtn.innerHTML = `
        <div class="spinner" style="width: 16px; height: 16px;"></div>
        Evaluating...
    `;
    
    try {
        const allScores = {};
        
        for (const alt of decision.alternatives) {
            const scores = await AI.evaluateAlternative(decision, alt);
            allScores[alt.id] = {};
            
            for (const [criterionId, data] of Object.entries(scores)) {
                allScores[alt.id][criterionId] = {
                    value: data.score,
                    explanation: data.explanation
                };
            }
        }
        
        await StateManager.setAllScores(allScores);
        renderEvaluationMatrix();
        showToast('AI evaluation complete!', 'success');
    } catch (error) {
        console.error('AI Evaluation Error:', error);
        showToast('AI evaluation failed: ' + error.message, 'error');
    } finally {
        elements.aiEvaluateAllBtn.disabled = false;
        elements.aiEvaluateAllBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            AI Evaluate All
        `;
    }
}

async function getAIInsights() {
    if (!AI.isAvailable()) {
        showToast('Please configure your API key in Settings first', 'warning');
        openModal('settings');
        return;
    }
    
    elements.getAiInsightsBtn.disabled = true;
    elements.getAiInsightsBtn.innerHTML = `
        <div class="spinner" style="width: 16px; height: 16px;"></div>
        Analyzing...
    `;
    
    try {
        const state = StateManager.getState();
        const results = StateManager.calculateResults();
        const insights = await AI.generateInsights(state.currentDecision, results);
        
        elements.aiInsightsCard.style.display = 'block';
        elements.aiInsightsContent.innerHTML = `
            <div class="insight-section">
                <h5>Recommendation</h5>
                <p>${escapeHtml(insights.recommendation)}</p>
            </div>
            <div class="insight-section">
                <h5>Key Decision Drivers</h5>
                <p>${insights.decision_drivers.map(d => `• ${escapeHtml(d)}`).join('<br>')}</p>
            </div>
            <div class="insight-section">
                <h5>Trade-offs</h5>
                <p>${Object.entries(insights.trade_offs).map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}`).join('<br>')}</p>
            </div>
            <div class="insight-section">
                <h5>Potential Risks</h5>
                <p>${insights.risks.map(r => `• ${escapeHtml(r)}`).join('<br>')}</p>
            </div>
            <div class="insight-section">
                <h5>Sensitivity</h5>
                <p>${escapeHtml(insights.sensitivity)}</p>
            </div>
            <div class="insight-section">
                <h5>Confidence: ${escapeHtml(insights.confidence.level)}</h5>
                <p>${escapeHtml(insights.confidence.explanation)}</p>
            </div>
        `;
        
        showToast('AI insights generated!', 'success');
    } catch (error) {
        console.error('AI Insights Error:', error);
        showToast('Failed to generate insights: ' + error.message, 'error');
    } finally {
        elements.getAiInsightsBtn.disabled = false;
        elements.getAiInsightsBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Get AI Insights
        `;
    }
}

// ========================================
// Templates
// ========================================

async function applyTemplate(templateId) {
    const decisionData = createDecisionFromTemplate(templateId);
    if (decisionData) {
        await StateManager.createDecision(decisionData);
        
        // Track template usage
        Analytics.trackTemplateUsed(templateId);
        Analytics.trackComparisonStarted(decisionData.category || 'general');
        
        closeAllModals();
        showToast('Template applied!', 'success');
    }
}

// ========================================
// Export
// ========================================

async function handleExportAll() {
    const decisions = await DecisionDB.exportAll();
    const blob = new Blob([JSON.stringify(decisions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thinkflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('All decisions exported', 'success');
}

function exportDecision(format) {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision) return;
    
    switch (format) {
        case 'json':
            exportToJSON(decision);
            break;
        case 'csv':
            exportToCSV(decision);
            break;
        case 'markdown':
            exportToMarkdown(decision);
            break;
    }
    
    showToast(`Exported as ${format.toUpperCase()}`, 'success');
}

function shareDecision() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!decision) return;
    
    const shareUrl = generateShareUrl(decision);
    elements.shareLink.value = shareUrl;
    openModal('share');
}

function copyShareLink() {
    elements.shareLink.select();
    navigator.clipboard.writeText(elements.shareLink.value);
    showToast('Link copied to clipboard!', 'success');
}

// ========================================
// Modal Management
// ========================================

function openModal(modalName) {
    closeAllModals();
    const modal = document.getElementById(`${modalName}Modal`);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ========================================
// Keyboard Shortcuts
// ========================================

function handleKeyboardShortcuts(e) {
    // Escape to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl/Cmd + S to save (prevent default)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('Auto-saved', 'success');
    }
    
    // Ctrl/Cmd + N for new decision
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNewDecision();
    }
}

// ========================================
// Utility
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// Global Exports
// ========================================

window.app = {
    loadDecision,
    deleteDecision,
    applyTemplate,
    updateCriterion,
    updateCriterionWeight,
    deleteCriterion,
    updateAlternative,
    deleteAlternative,
    setScore,
    acceptAISuggestion
};

// ========================================
// Service Worker Registration
// ========================================

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registered:', registration.scope);
        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
        }
    }
}

// ========================================
// Initialize App
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    init();
    registerServiceWorker();
});
