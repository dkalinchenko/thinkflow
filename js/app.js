/**
 * OptiMind AI - Main Application
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
    generateSearchLink, 
    formatPrice, 
    trackAffiliateClick,
    FTC_DISCLOSURE 
} from './affiliate.js';
// Amazon Research - Lazy loaded when needed
// import will be done dynamically to reduce initial bundle size
import { Analytics } from './analytics.js';
import { performanceMonitor } from './monitoring.js';
import { initTooltips, refreshTooltips } from './tooltips.js';
import { initInlineEditing, makeEditable, validateName, validateWeight } from './inline-edit.js';
import { initDragDrop, refreshDragDrop } from './drag-drop.js';
import { loadChartModule, loadSortableModule, loadAmazonResearchModule, preloadModules } from './lazy-loader.js';

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
    // Initialize performance monitoring
    performanceMonitor.init();
    
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
    
    // Register service worker
    registerServiceWorker();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize inline editing
    initInlineEditing();
    
    // Initialize drag & drop (will lazy load Sortable.js when needed)
    initDragDrop();
    
    // Preload heavy modules in background
    preloadModules();
    
    // Check for template URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');
    
    if (templateId) {
        // Auto-load template from URL parameter
        await applyTemplate(templateId);
        // Clear the URL parameter
        window.history.replaceState({}, '', window.location.pathname);
    } else if (state.currentDecision) {
        // Show existing decision
        showDecisionView();
    } else {
        // Show welcome screen
        showWelcomeView();
    }
}

/**
 * Register service worker for offline support
 */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registered:', registration.scope);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        showToast('App updated! Refresh to see changes.', 'info', 5000);
                    }
                });
            });
        } catch (error) {
            console.warn('⚠️ Service Worker registration failed:', error);
        }
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
    
    // Theme toggle (optional - may not exist if theme toggle removed)
    if (elements.themeToggle) {
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
    }
    
    // New Decision buttons
    if (elements.newDecisionBtn) {
        elements.newDecisionBtn.addEventListener('click', createNewDecision);
    }
    if (elements.welcomeNewBtn) {
        elements.welcomeNewBtn.addEventListener('click', createNewDecision);
    }
    if (elements.newDecisionFromResults) {
        elements.newDecisionFromResults.addEventListener('click', createNewDecision);
    }
    
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
    if (elements.welcomeTemplateBtn) {
        elements.welcomeTemplateBtn.addEventListener('click', () => openModal('templates'));
    }
    
    // Template quick links
    document.querySelectorAll('.template-link-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const templateId = btn.dataset.template;
            await applyTemplate(templateId);
        });
    });
    
    // Decision title editing
    if (elements.decisionTitleInput) {
        elements.decisionTitleInput.addEventListener('input', debounce(updateDecisionTitle, 500));
    }
    
    // Decision search
    if (elements.decisionSearch) {
        elements.decisionSearch.addEventListener('input', debounce(handleDecisionSearch, 300));
    }
    
    // Export
    if (elements.exportAllBtn) {
        elements.exportAllBtn.addEventListener('click', handleExportAll);
    }
    
    // Criteria step
    if (elements.addCriterionBtn) {
        elements.addCriterionBtn.addEventListener('click', addCriterion);
    }
    if (elements.generateCriteriaBtn) {
        elements.generateCriteriaBtn.addEventListener('click', generateCriteria);
    }
    if (elements.toCriteriaNext) {
        elements.toCriteriaNext.addEventListener('click', () => navigateToStep('alternatives'));
    }
    
    // Alternatives step
    if (elements.addAlternativeBtn) {
        elements.addAlternativeBtn.addEventListener('click', addAlternative);
    }
    if (elements.generateAlternativesBtn) {
        elements.generateAlternativesBtn.addEventListener('click', generateAlternatives);
    }
    if (elements.toAlternativesPrev) {
        elements.toAlternativesPrev.addEventListener('click', () => navigateToStep('criteria'));
    }
    if (elements.toAlternativesNext) {
        elements.toAlternativesNext.addEventListener('click', () => navigateToStep('evaluation'));
    }
    
    // Evaluation step
    if (elements.aiEvaluateAllBtn) {
        elements.aiEvaluateAllBtn.addEventListener('click', aiEvaluateAll);
    }
    if (elements.toEvaluationPrev) {
        elements.toEvaluationPrev.addEventListener('click', () => navigateToStep('alternatives'));
    }
    if (elements.toEvaluationNext) {
        elements.toEvaluationNext.addEventListener('click', () => navigateToStep('results'));
    }
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            if (elements.matrixView) {
                elements.matrixView.style.display = view === 'matrix' ? 'block' : 'none';
            }
            if (elements.cardsView) {
                elements.cardsView.style.display = view === 'cards' ? 'block' : 'none';
            }
        });
    });
    
    // Results step
    if (elements.getAiInsightsBtn) {
        elements.getAiInsightsBtn.addEventListener('click', getAIInsights);
    }
    if (elements.shareDecisionBtn) {
        elements.shareDecisionBtn.addEventListener('click', shareDecision);
    }
    if (elements.exportDecisionBtn) {
        elements.exportDecisionBtn.addEventListener('click', () => openModal('export'));
    }
    if (elements.toResultsPrev) {
        elements.toResultsPrev.addEventListener('click', () => navigateToStep('evaluation'));
    }
    
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
    if (elements.aiRegenerateBtn) {
        elements.aiRegenerateBtn.addEventListener('click', regenerateAISuggestions);
    }
    if (elements.aiAcceptAllBtn) {
        elements.aiAcceptAllBtn.addEventListener('click', acceptAllAISuggestions);
    }
    if (elements.aiRetryBtn) {
        elements.aiRetryBtn.addEventListener('click', retryAI);
    }
    
    // Export Modal
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            const format = option.dataset.format;
            exportDecision(format);
            closeAllModals();
        });
    });
    
    // Share Modal
    if (elements.copyShareLink) {
        elements.copyShareLink.addEventListener('click', copyShareLink);
    }
    
    // Template list in sidebar
    if (elements.templateList) {
        elements.templateList.addEventListener('click', (e) => {
            const item = e.target.closest('.nav-item');
            if (item) {
                const templateId = item.dataset.template;
                applyTemplate(templateId);
            }
        });
    }
    
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
    
    // Price targeting modal
    document.querySelectorAll('input[name="priceMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            togglePriceContent(e.target.value);
        });
    });
    
    const priceConfirmBtn = document.getElementById('priceConfirmBtn');
    if (priceConfirmBtn) {
        priceConfirmBtn.addEventListener('click', handlePriceModalSubmit);
    }
    
    const priceSkipBtn = document.getElementById('priceSkipBtn');
    if (priceSkipBtn) {
        priceSkipBtn.addEventListener('click', handlePriceSkip);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    document.addEventListener('keydown', handleArrowKeyNavigation);
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
    // Lazy load amazon-research module
    const { getCategoryConfig } = await loadAmazonResearchModule();
    
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
    
    // Transform price constraint to priceRange format
    const priceRange = await transformPriceConstraint(decision.priceConstraint, category);
    
    // Debug logging
    console.log('💰 Price constraint from decision:', decision.priceConstraint);
    console.log('💰 Transformed price range for AI:', priceRange);
    
    // Show skeleton in alternatives list
    showAlternativesSkeleton();
    
    // Show loading modal
    showAILoadingModal(
        'Researching Products...',
        'AI is searching for the best products that match your criteria and price range'
    );
    
    try {
        // Lazy load amazon-research module
        const { researchProducts } = await loadAmazonResearchModule();
        
        // Research products using AI
        const products = await researchProducts(category, {
            maxProducts: 4,
            priceRange: priceRange,
            specificQuery: decisionTitle.includes('Comparison') ? null : decisionTitle
        });
        
        hideAILoadingModal();
        
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
        hideAILoadingModal();
        showToast('Failed to research products. Please try again.', 'error');
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

/**
 * Show skeleton loading for decision list
 */
function showDecisionListSkeleton() {
    elements.decisionList.innerHTML = Array(3).fill(0).map(() => `
        <li class="nav-item">
            <div class="skeleton skeleton-decision-item"></div>
        </li>
    `).join('');
}

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
    console.log('📋 Rendering templates list. Total templates:', templates.length);
    console.log('🔍 Template IDs:', templates.map(t => t.id));
    
    // Check for specific templates
    const elliptical = templates.find(t => t.id === 'elliptical-comparison');
    const homeGym = templates.find(t => t.id === 'home-gym-equipment-comparison');
    const vacuum = templates.find(t => t.id === 'vacuum-cleaner-comparison');
    
    console.log('✅ Elliptical template found:', !!elliptical);
    console.log('✅ Home Gym template found:', !!homeGym);
    console.log('✅ Vacuum template found:', !!vacuum);
    
    elements.templatesGrid.innerHTML = templates.map(t => `
        <div class="template-card" data-template="${t.id}" onclick="console.log('🖱️ Clicked:', '${t.id}'); window.app.applyTemplate('${t.id}')">
            <div class="template-icon">${t.icon}</div>
            <h4>${t.name}</h4>
            <p>${t.description}</p>
        </div>
    `).join('');
    
    console.log('✅ Templates rendered to DOM');
    console.log('✅ window.app.applyTemplate available:', typeof window.app?.applyTemplate === 'function');
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

/**
 * Show skeleton loading for criteria
 */
function showCriteriaSkeleton() {
    elements.criteriaList.innerHTML = Array(3).fill(0).map(() => `
        <div class="skeleton skeleton-criterion"></div>
    `).join('');
}

function renderCriteria() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    const criteria = decision?.criteria || [];
    
    // Disable Generate AI button if criteria were pre-populated from template
    const isTemplateWithCriteria = decision?.isProductComparison && criteria.length >= 2;
    const generateBtn = elements.generateCriteriaBtn;
    
    if (generateBtn) {
        if (isTemplateWithCriteria) {
            generateBtn.disabled = true;
            generateBtn.title = 'Criteria already provided by template. You can edit them or add more manually.';
            generateBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Criteria Provided by Template
            `;
        } else {
            generateBtn.disabled = false;
            generateBtn.title = 'Use AI to suggest criteria for your decision';
            generateBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Generate with AI
            `;
        }
    }
    
    if (criteria.length === 0) {
        elements.criteriaList.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    <path d="M9 12h6m-6 4h6"></path>
                </svg>
                <h3 class="empty-state-title">No Criteria Yet</h3>
                <p class="empty-state-description">Criteria are the factors you'll use to evaluate your options. For example: price, quality, speed.</p>
                <div class="empty-state-actions">
                    <button class="btn btn-secondary" onclick="window.app.addCriterion()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Your First Criterion
                    </button>
                </div>
            </div>
        `;
    } else {
        elements.criteriaList.innerHTML = criteria.map((c, index) => `
            <div class="criterion-card" data-id="${c.id}" data-index="${index}">
                <div class="criterion-header">
                    <div class="drag-handle" data-tooltip="Drag to reorder">
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
                        <button class="btn-icon" onclick="window.app.deleteCriterion('${c.id}')" data-tooltip="Delete criterion">
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
        
        // Refresh drag & drop (using module)
        refreshDragDrop();
        
        // Refresh tooltips after DOM update
        refreshTooltips();
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
    const state = StateManager.getState();
    const criterion = state.currentDecision?.criteria.find(c => c.id === id);

    if (!criterion) return;

    elements.confirmTitle.textContent = 'Delete Criterion';
    elements.confirmMessage.textContent = `Are you sure you want to delete "${criterion.name}"? This will also remove all scores for this criterion.`;
    elements.confirmActionBtn.onclick = async () => {
        await StateManager.deleteCriterion(id);
        renderCriteria();
        closeAllModals();
        showToast('Criterion deleted', 'success');
    };

    openModal('confirm');
}

// Inline editing for criterion name
function editCriterionName(id, element) {
    const originalValue = element.textContent;
    
    // Create input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'criterion-name inline-editor';
    input.value = originalValue;
    
    // Replace content
    element.textContent = '';
    element.appendChild(input);
    element.classList.add('editing');
    
    // Focus and select
    input.focus();
    input.select();
    
    // Save function
    const save = async () => {
        const newValue = input.value.trim();
        
        if (!newValue) {
            showToast('Name cannot be empty', 'error');
            input.focus();
            return;
        }
        
        if (newValue !== originalValue) {
            await updateCriterion(id, 'name', newValue);
            element.textContent = newValue;
            showToast('Criterion updated', 'success');
        } else {
            element.textContent = originalValue;
        }
        
        element.classList.remove('editing');
    };
    
    // Event listeners
    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        } else if (e.key === 'Escape') {
            element.textContent = originalValue;
            element.classList.remove('editing');
        }
    });
}

// Inline editing for alternative name
function editAlternativeName(id, element) {
    const originalValue = element.textContent;
    
    // Create input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'alternative-name inline-editor';
    input.value = originalValue;
    
    // Replace content
    element.textContent = '';
    element.appendChild(input);
    element.classList.add('editing');
    
    // Focus and select
    input.focus();
    input.select();
    
    // Save function
    const save = async () => {
        const newValue = input.value.trim();
        
        if (!newValue) {
            showToast('Name cannot be empty', 'error');
            input.focus();
            return;
        }
        
        if (newValue !== originalValue) {
            await updateAlternative(id, 'name', newValue);
            element.textContent = newValue;
            showToast('Alternative updated', 'success');
        } else {
            element.textContent = originalValue;
        }
        
        element.classList.remove('editing');
    };
    
    // Event listeners
    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        } else if (e.key === 'Escape') {
            element.textContent = originalValue;
            element.classList.remove('editing');
        }
    });
}

// ========================================
// Alternatives Rendering
// ========================================

/**
 * Show skeleton loading for alternatives
 */
function showAlternativesSkeleton() {
    elements.alternativesList.innerHTML = Array(2).fill(0).map(() => `
        <div class="skeleton skeleton-alternative"></div>
    `).join('');
}

function renderAlternatives() {
    const state = StateManager.getState();
    const alternatives = state.currentDecision?.alternatives || [];
    const isProductComparison = state.currentDecision?.isProductComparison;
    
    // Render price constraint display
    renderPriceConstraintDisplay();
    
    if (alternatives.length === 0) {
        elements.alternativesList.innerHTML = `
            <div class="empty-state" style="grid-column: span 2;">
                <svg class="empty-state-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 class="empty-state-title">No Alternatives Yet</h3>
                <p class="empty-state-description">${isProductComparison 
                    ? 'Alternatives are the different products you\'re considering. Use AI to research products automatically, or add them manually.' 
                    : 'Alternatives are the different options you\'re choosing between. For example: different job offers, vacation destinations, or laptops.'}</p>
                <div class="empty-state-actions">
                    ${isProductComparison ? `
                        <button class="btn btn-ai" onclick="window.app.generateAlternatives()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                            AI Research Products
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="window.app.addAlternative()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Your First Alternative
                        </button>
                    `}
                </div>
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
                        <div class="drag-handle" data-tooltip="Drag to reorder">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="5" r="1"></circle>
                                <circle cx="9" cy="12" r="1"></circle>
                                <circle cx="9" cy="19" r="1"></circle>
                                <circle cx="15" cy="5" r="1"></circle>
                                <circle cx="15" cy="12" r="1"></circle>
                                <circle cx="15" cy="19" r="1"></circle>
                            </svg>
                        </div>
                        <div class="alternative-name inline-editable" 
                             data-id="${a.id}" 
                             data-field="name" 
                             data-value="${escapeHtml(a.name)}"
                             data-tooltip="Click to edit"
                             onclick="window.app.editAlternativeName('${a.id}', this)">${escapeHtml(a.name)}</div>
                        <div class="criterion-actions">
                            <button class="btn-icon" onclick="window.app.deleteAlternative('${a.id}')" data-tooltip="Delete alternative">
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
        
        // Refresh drag & drop (using module)
        refreshDragDrop();
        
        // Refresh tooltips after DOM update
        refreshTooltips();
    }
    
    updateNavigationButtons();
}

/**
 * Render a product card with Amazon data
 */
function renderProductCard(product) {
    const priceDisplay = product.price ? formatPrice(product.price) : 'Check Price';
    const ratingStars = product.rating ? '⭐'.repeat(Math.round(product.rating)) : '';
    // Use Amazon search link with affiliate tag instead of direct ASIN link
    const amazonUrl = generateSearchLink(product.name);
    
    return `
        <div class="alternative-card product" data-id="${product.id}">
            <div class="drag-handle" data-tooltip="Drag to reorder" style="position: absolute; top: 8px; left: 8px; z-index: 1;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="5" r="1"></circle>
                    <circle cx="9" cy="12" r="1"></circle>
                    <circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle>
                    <circle cx="15" cy="12" r="1"></circle>
                    <circle cx="15" cy="19" r="1"></circle>
                </svg>
            </div>
            <div class="product-image">
                ${product.imageUrl 
                    ? `<img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" loading="lazy">`
                    : `<span class="product-image-placeholder">📦</span>`
                }
            </div>
            <div class="product-info">
                <div class="alternative-header">
                    <div class="alternative-name inline-editable" 
                         data-id="${product.id}" 
                         data-field="name" 
                         data-value="${escapeHtml(product.name)}"
                         data-tooltip="Click to edit product name"
                         onclick="window.app.editAlternativeName('${product.id}', this)">${escapeHtml(product.name)}</div>
                    <div class="criterion-actions">
                        <button class="btn-icon" onclick="window.app.deleteAlternative('${product.id}')" data-tooltip="Delete product">
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
                                <span class="spec-label">${escapeHtml(key.replace(/_/g, ' '))}</span>
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
                       onclick="window.trackAffiliateClick && window.trackAffiliateClick({productName: '${escapeHtml(product.name).replace(/'/g, "\\'")}', source: 'alternatives'})">
                        View on Amazon
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
    const state = StateManager.getState();
    const alternative = state.currentDecision?.alternatives.find(a => a.id === id);
    
    if (!alternative) return;
    
    elements.confirmTitle.textContent = 'Delete Alternative';
    elements.confirmMessage.textContent = `Are you sure you want to delete "${alternative.name}"? This will also remove all scores for this alternative.`;
    elements.confirmActionBtn.onclick = async () => {
        await StateManager.deleteAlternative(id);
        renderAlternatives();
        closeAllModals();
        showToast('Alternative deleted', 'success');
    };
    
    openModal('confirm');
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
    
    // Generate winner explanation from score explanations
    const winnerScores = decision.scores[winner.id] || {};
    const winnerExplanations = [];
    decision.criteria.forEach(c => {
        if (winnerScores[c.id]?.explanation) {
            winnerExplanations.push(`<p><strong>${escapeHtml(c.name)}:</strong> ${escapeHtml(winnerScores[c.id].explanation)}</p>`);
        }
    });
    const winnerExplanation = winnerExplanations.length > 0 
        ? `<div class="winner-explanation">
            <h4>AI Evaluation for ${escapeHtml(winner.name)}</h4>
            ${winnerExplanations.join('')}
           </div>`
        : '';
    
    // Render winner card
    elements.winnerName.textContent = winner.name;
    elements.winnerScore.textContent = `${winner.totalScore.toFixed(1)} pts`;
    elements.winnerStrengths.innerHTML = winner.strengths
        .map(s => `<span class="strength-tag">✓ ${escapeHtml(s)}</span>`)
        .join('');
    
    // Add winner explanation if available
    const winnerCard = document.getElementById('winnerCard');
    const existingExplanation = winnerCard.querySelector('.winner-explanation');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    if (winnerExplanation) {
        // Insert after winnerStrengths element
        const strengthsElement = document.getElementById('winnerStrengths');
        if (strengthsElement) {
            strengthsElement.insertAdjacentHTML('afterend', winnerExplanation);
        }
    }
    
    // Add Amazon buy button for product winners
    const existingBuySection = winnerCard.querySelector('.winner-buy-section');
    if (existingBuySection) {
        existingBuySection.remove();
    }
    
    if (isProduct && winnerAlt) {
        // Use Amazon search link with affiliate tag instead of direct ASIN link
        const amazonUrl = generateSearchLink(winnerAlt.name);
        const priceDisplay = winnerAlt.price ? formatPrice(winnerAlt.price) : '';
        
        const buySection = document.createElement('div');
        buySection.className = 'winner-buy-section';
        buySection.innerHTML = `
            ${priceDisplay ? `<div class="winner-price">${priceDisplay}</div>` : ''}
            <a href="${amazonUrl}" 
               class="btn btn-amazon btn-lg" 
               target="_blank" 
               rel="noopener sponsored"
               onclick="window.trackAffiliateClick && window.trackAffiliateClick({productName: '${escapeHtml(winner.name).replace(/'/g, "\\'")}', source: 'winner_card'})">
                <svg class="amazon-icon" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M15.93 17.09c-.18.16-.43.17-.63.06-.89-.74-1.05-1.08-1.54-1.79-1.47 1.5-2.51 1.95-4.42 1.95-2.25 0-4.01-1.39-4.01-4.17 0-2.18 1.17-3.64 2.86-4.38 1.46-.64 3.49-.76 5.04-.93v-.35c0-.64.05-1.4-.33-1.96-.32-.49-.95-.7-1.5-.7-1.02 0-1.93.53-2.15 1.61-.05.24-.23.47-.48.48l-2.66-.29c-.22-.05-.47-.22-.4-.55C6.26 3.37 8.74 2.5 10.94 2.5c1.14 0 2.63.3 3.53 1.17 1.14 1.06 1.03 2.48 1.03 4.03v3.65c0 1.1.45 1.58.88 2.18.15.21.18.46-.01.62-.48.4-1.35 1.14-1.82 1.56l-.62-.62z"/>
                </svg>
                Buy Winner on Amazon
            </a>
        `;
        winnerCard.appendChild(buySection);
    }
    
    // Render scores table with expandable rows for explanations
    const criteria = decision.criteria;
    
    let tableHtml = `
        <thead>
            <tr>
                <th>Rank</th>
                <th>Alternative</th>
                ${criteria.map(c => `<th>${escapeHtml(c.name)}</th>`).join('')}
                <th>Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;
    
    for (const result of results) {
        const alt = decision.alternatives.find(a => a.id === result.id);
        const altScores = decision.scores[result.id] || {};
        const hasExplanations = decision.criteria.some(c => altScores[c.id]?.explanation);
        const isProductAlt = alt?.isProduct;
        const amazonUrl = isProductAlt ? generateSearchLink(result.name) : null;
        
        const rowClass = result.rank === 1 ? 'rank-1' : '';
        const mainRowId = `result-row-${result.id}`;
        const expandRowId = `result-expand-${result.id}`;
        
        // Main row
        tableHtml += `<tr class="${rowClass}" id="${mainRowId}" ${hasExplanations ? 'style="cursor: pointer;"' : ''} 
                         onclick="${hasExplanations ? `toggleExplanationRow('${expandRowId}', '${mainRowId}')` : ''}">`;
        tableHtml += `<td><strong>${getRankSuffix(result.rank)}</strong></td>`;
        
        // Alternative name with Amazon link if product
        if (amazonUrl) {
            tableHtml += `<td>
                <a href="${amazonUrl}" target="_blank" rel="noopener sponsored" 
                   onclick="event.stopPropagation(); window.trackAffiliateClick && window.trackAffiliateClick({productName: '${escapeHtml(result.name).replace(/'/g, "\\'")}', source: 'results_table'});" 
                   style="color: inherit; text-decoration: underline;">
                    ${escapeHtml(result.name)} 
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: middle;">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </td>`;
        } else {
            tableHtml += `<td>${escapeHtml(result.name)}</td>`;
        }
        
        for (const criterion of criteria) {
            const score = result.criteriaScores[criterion.id] || 0;
            tableHtml += `<td>${score}</td>`;
        }
        
        tableHtml += `<td><strong>${result.totalScore.toFixed(1)}</strong></td>`;
        tableHtml += `<td>${hasExplanations ? '<span class="expand-icon">▼</span>' : ''}</td>`;
        tableHtml += `</tr>`;
        
        // Expandable explanation row
        if (hasExplanations) {
            tableHtml += `<tr class="explanation-row" id="${expandRowId}" style="display: none;">`;
            tableHtml += `<td colspan="${criteria.length + 4}">`;
            tableHtml += `<div class="explanation-content">`;
            tableHtml += `<h4>AI Evaluation for ${escapeHtml(result.name)}</h4>`;
            
            criteria.forEach(c => {
                if (altScores[c.id]?.explanation) {
                    tableHtml += `<p><strong>${escapeHtml(c.name)}:</strong> ${escapeHtml(altScores[c.id].explanation)}</p>`;
                }
            });
            
            tableHtml += `</div></td></tr>`;
        }
    }
    
    tableHtml += `</tbody>`;
    elements.scoresTable.innerHTML = tableHtml;
    
    // Render charts
    renderRankingsChart(results);
    renderRadarChart(results, criteria);
}

// Toggle explanation row visibility
window.toggleExplanationRow = function(expandRowId, mainRowId) {
    const expandRow = document.getElementById(expandRowId);
    const mainRow = document.getElementById(mainRowId);
    const icon = mainRow.querySelector('.expand-icon');
    
    if (expandRow.style.display === 'none') {
        expandRow.style.display = 'table-row';
        if (icon) icon.textContent = '▲';
    } else {
        expandRow.style.display = 'none';
        if (icon) icon.textContent = '▼';
    }
};

async function renderRankingsChart(results) {
    // Lazy load Chart.js if not available
    if (typeof Chart === 'undefined') {
        try {
            await loadChartModule();
        } catch (error) {
            console.error('Cannot render chart: Chart.js failed to load');
            return;
        }
    }

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

async function renderRadarChart(results, criteria) {
    // Lazy load Chart.js if not available
    if (typeof Chart === 'undefined') {
        try {
            await loadChartModule();
        } catch (error) {
            console.error('Cannot render chart: Chart.js failed to load');
            return;
        }
    }

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
    
    // Show skeleton in criteria list
    showCriteriaSkeleton();
    
    // Show loading modal
    showAILoadingModal(
        'Generating Criteria...',
        'AI is analyzing your decision to suggest relevant evaluation criteria'
    );
    
    currentAIContext.type = 'criteria';
    
    try {
        const state = StateManager.getState();
        const suggestions = await AI.suggestCriteria(state.currentDecision);
        currentAIContext.suggestions = suggestions;
        
        // Hide loading modal and show results
        hideAILoadingModal();
        
        openModal('aiSuggestions');
        elements.aiModalTitle.textContent = 'AI Criteria Suggestions';
        elements.aiLoading.style.display = 'none';
        elements.aiSuggestionsList.innerHTML = '';
        elements.aiError.style.display = 'none';
        
        renderAISuggestions(suggestions, 'criteria');
    } catch (error) {
        console.error('AI Error:', error);
        hideAILoadingModal();
        
        openModal('aiSuggestions');
        elements.aiModalTitle.textContent = 'AI Criteria Suggestions';
        elements.aiLoading.style.display = 'none';
        elements.aiError.style.display = 'block';
        elements.aiError.querySelector('p').textContent = error.message;
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
    
    // Show loading modal
    showAILoadingModal(
        'Generating Alternatives...',
        'AI is brainstorming different options for your decision'
    );
    
    currentAIContext.type = 'alternatives';
    
    try {
        const suggestions = await AI.suggestAlternatives(decision);
        currentAIContext.suggestions = suggestions;
        
        // Hide loading modal and show results
        hideAILoadingModal();
        
        openModal('aiSuggestions');
        elements.aiModalTitle.textContent = 'AI Alternative Suggestions';
        elements.aiLoading.style.display = 'none';
        elements.aiSuggestionsList.innerHTML = '';
        elements.aiError.style.display = 'none';
        
        renderAISuggestions(suggestions, 'alternatives');
    } catch (error) {
        console.error('AI Error:', error);
        hideAILoadingModal();
        
        openModal('aiSuggestions');
        elements.aiModalTitle.textContent = 'AI Alternative Suggestions';
        elements.aiLoading.style.display = 'none';
        elements.aiError.style.display = 'block';
        elements.aiError.querySelector('p').textContent = error.message;
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
    
    // Show loading modal
    showAILoadingModal(
        'Evaluating Alternatives...',
        `AI is analyzing ${decision.alternatives.length} alternatives across ${decision.criteria.length} criteria`
    );
    
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
        hideAILoadingModal();
        renderEvaluationMatrix();
        showToast('AI evaluation complete!', 'success');
    } catch (error) {
        console.error('AI Evaluation Error:', error);
        hideAILoadingModal();
        showToast('AI evaluation failed: ' + error.message, 'error');
    }
}

async function getAIInsights() {
    if (!AI.isAvailable()) {
        showToast('Please configure your API key in Settings first', 'warning');
        openModal('settings');
        return;
    }
    
    // Show loading modal
    showAILoadingModal(
        'Generating Insights...',
        'AI is analyzing your decision results to provide strategic recommendations'
    );
    
    try {
        const state = StateManager.getState();
        const results = StateManager.calculateResults();
        const insights = await AI.generateInsights(state.currentDecision, results);
        
        hideAILoadingModal();
        
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
        hideAILoadingModal();
        showToast('Failed to generate insights: ' + error.message, 'error');
    }
}

// ========================================
// Templates
// ========================================

async function applyTemplate(templateId) {
    console.log('🎯 applyTemplate called with ID:', templateId);
    
    try {
        const decisionData = createDecisionFromTemplate(templateId);
        console.log('📋 Decision data created:', decisionData ? 'success' : 'failed');
        
        if (decisionData) {
            await StateManager.createDecision(decisionData);
            console.log('✅ Decision created in state');

            // Track template usage
            Analytics.trackTemplateUsed(templateId);
            Analytics.trackComparisonStarted(decisionData.category || 'general');

            closeAllModals();
            console.log('✅ Modals closed');

            // Show price targeting modal for product comparisons
            if (decisionData.isProductComparison && decisionData.category) {
                console.log('💰 Showing price targeting modal for:', decisionData.category);
                await showPriceTargetingModal(decisionData.category);
            }

            showToast('Template applied!', 'success');
            console.log('✅ Template applied successfully!');
        } else {
            console.error('❌ Failed to create decision data from template');
            showToast('Failed to apply template', 'error');
        }
    } catch (error) {
        console.error('❌ Error in applyTemplate:', error);
        showToast('Error applying template: ' + error.message, 'error');
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
    a.download = `optimind-backup-${new Date().toISOString().split('T')[0]}.json`;
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
// Modal Management with Focus Trapping
// ========================================

// Track focus before modal opens
let previousFocusedElement = null;
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function openModal(modalName) {
    closeAllModals();
    const modal = document.getElementById(`${modalName}Modal`);
    if (modal) {
        // Store currently focused element
        previousFocusedElement = document.activeElement;
        
        // Open modal
        modal.classList.add('active');
        
        // Focus first focusable element in modal
        const firstFocusable = modal.querySelector(focusableSelectors);
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        // Trap focus in modal
        modal.addEventListener('keydown', handleModalKeyDown);
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
        modal.removeEventListener('keydown', handleModalKeyDown);
    });
    
    // Restore focus to previously focused element
    if (previousFocusedElement) {
        previousFocusedElement.focus();
        previousFocusedElement = null;
    }
}

/**
 * Handle keyboard navigation in modals
 */
function handleModalKeyDown(e) {
    const modal = e.currentTarget;
    
    // Close on ESC key
    if (e.key === 'Escape') {
        closeAllModals();
        return;
    }
    
    // Trap focus on TAB key
    if (e.key === 'Tab') {
        const focusableElements = Array.from(modal.querySelectorAll(focusableSelectors))
            .filter(el => !el.disabled && el.offsetParent !== null);
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift+Tab: focus last element if on first
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            // Tab: focus first element if on last
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

// ========================================
// Price Targeting Modal
// ========================================

/**
 * Show price targeting modal with category-specific ranges
 */
async function showPriceTargetingModal(category) {
    // Lazy load amazon-research module
    const { getCategoryConfig } = await loadAmazonResearchModule();
    
    const config = getCategoryConfig(category);
    if (!config || !config.priceRanges) {
        // No price ranges for this category, skip modal
        return;
    }
    
    // Populate preset ranges
    const presetRanges = document.getElementById('presetRanges');
    presetRanges.innerHTML = Object.entries(config.priceRanges).map(([key, range]) => `
        <label class="preset-range-item">
            <input type="checkbox" name="presetRange" value="${key}" class="preset-range-checkbox">
            <span class="preset-range-label">${range.label}</span>
        </label>
    `).join('');
    
    // Get existing constraint if editing
    const existingConstraint = StateManager.getPriceConstraint();
    if (existingConstraint) {
        if (existingConstraint.type === 'manual') {
            document.querySelector('input[name="priceMode"][value="manual"]').checked = true;
            document.getElementById('minPriceInput').value = existingConstraint.min || '';
            document.getElementById('maxPriceInput').value = existingConstraint.max || '';
            togglePriceContent('manual');
        } else if (existingConstraint.type === 'preset') {
            document.querySelector('input[name="priceMode"][value="preset"]').checked = true;
            existingConstraint.ranges.forEach(range => {
                const checkbox = document.querySelector(`input[name="presetRange"][value="${range}"]`);
                if (checkbox) checkbox.checked = true;
            });
            togglePriceContent('preset');
        } else if (existingConstraint.type === 'skip') {
            document.querySelector('input[name="priceMode"][value="skip"]').checked = true;
            togglePriceContent('skip');
        }
    } else {
        // Default to preset mode
        document.querySelector('input[name="priceMode"][value="preset"]').checked = true;
        togglePriceContent('preset');
    }
    
    openModal('priceTargeting');
    
    // Return a promise that resolves when the modal is closed
    return new Promise((resolve) => {
        window._priceTargetingResolve = resolve;
    });
}

/**
 * Toggle visibility of price content sections
 */
function togglePriceContent(mode) {
    document.getElementById('manualPriceContent').style.display = mode === 'manual' ? 'block' : 'none';
    document.getElementById('presetPriceContent').style.display = mode === 'preset' ? 'block' : 'none';
    document.getElementById('skipPriceContent').style.display = mode === 'skip' ? 'block' : 'none';
}

/**
 * Handle price modal submission
 */
async function handlePriceModalSubmit() {
    const mode = document.querySelector('input[name="priceMode"]:checked')?.value;
    
    if (!mode) {
        showToast('Please select a price option', 'warning');
        return;
    }
    
    let constraint = null;
    
    if (mode === 'manual') {
        const min = document.getElementById('minPriceInput').value;
        const max = document.getElementById('maxPriceInput').value;
        
        if (!min && !max) {
            showToast('Please enter at least one price value', 'warning');
            return;
        }
        
        const minNum = min ? parseInt(min) : null;
        const maxNum = max ? parseInt(max) : null;
        
        if (minNum !== null && maxNum !== null && minNum >= maxNum) {
            showToast('Min price must be less than max price', 'warning');
            return;
        }
        
        constraint = {
            type: 'manual',
            min: minNum,
            max: maxNum
        };
    } else if (mode === 'preset') {
        const selected = Array.from(document.querySelectorAll('input[name="presetRange"]:checked'))
            .map(cb => cb.value);
        
        if (selected.length === 0) {
            showToast('Please select at least one price range', 'warning');
            return;
        }
        
        constraint = {
            type: 'preset',
            ranges: selected
        };
    } else if (mode === 'skip') {
        constraint = {
            type: 'skip'
        };
    }
    
    // Save constraint to decision
    await StateManager.updatePriceConstraint(constraint);
    
    // Close modal
    closeAllModals();
    
    // Render constraint display
    renderPriceConstraintDisplay();
    
    // Resolve promise if it exists
    if (window._priceTargetingResolve) {
        window._priceTargetingResolve(constraint);
        window._priceTargetingResolve = null;
    }
}

/**
 * Skip price targeting (use skip mode)
 */
async function handlePriceSkip() {
    await StateManager.updatePriceConstraint({ type: 'skip' });
    closeAllModals();
    renderPriceConstraintDisplay();
    
    if (window._priceTargetingResolve) {
        window._priceTargetingResolve({ type: 'skip' });
        window._priceTargetingResolve = null;
    }
}

/**
 * Render price constraint display in alternatives step
 */
async function renderPriceConstraintDisplay() {
    const display = document.getElementById('priceConstraintDisplay');
    if (!display) return;
    
    const constraint = StateManager.getPriceConstraint();
    const state = StateManager.getState();
    const decision = state.currentDecision;
    
    if (!constraint || constraint.type === 'skip' || !decision?.isProductComparison) {
        display.innerHTML = '';
        return;
    }
    
    let badgeText = '';
    
    if (constraint.type === 'manual') {
        if (constraint.min && constraint.max) {
            badgeText = `$${constraint.min} - $${constraint.max}`;
        } else if (constraint.min) {
            badgeText = `$${constraint.min}+`;
        } else if (constraint.max) {
            badgeText = `Up to $${constraint.max}`;
        }
    } else if (constraint.type === 'preset') {
        // Just show the range keys (simplified to avoid async complexity in render)
        badgeText = constraint.ranges.join(', ');
    }
    
    if (badgeText) {
        display.innerHTML = `
            <div class="price-constraint-display">
                <span class="price-constraint-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    ${badgeText}
                </span>
                <button class="btn-edit-price" onclick="window.app.editPriceConstraint()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                </button>
            </div>
        `;
    }
}

/**
 * Edit existing price constraint (reopen modal)
 */
async function editPriceConstraint() {
    const state = StateManager.getState();
    const decision = state.currentDecision;
    if (decision?.category) {
        await showPriceTargetingModal(decision.category);
    }
}

/**
 * Transform price constraint to format expected by researchProducts
 */
async function transformPriceConstraint(constraint, category) {
    if (!constraint || constraint.type === 'skip') {
        return null;
    }
    
    if (constraint.type === 'manual') {
        return {
            min: constraint.min,
            max: constraint.max
        };
    }
    
    if (constraint.type === 'preset') {
        const { getCategoryConfig } = await loadAmazonResearchModule();
        const config = getCategoryConfig(category);
        if (!config || !config.priceRanges) {
            return null;
        }

        // Calculate combined range from selected presets
        return calculateCombinedRange(constraint.ranges, config.priceRanges);
    }
    
    return null;
}

/**
 * Calculate combined price range from multiple preset selections
 */
function calculateCombinedRange(selectedRanges, priceRanges) {
    if (!selectedRanges || selectedRanges.length === 0) {
        return null;
    }
    
    let min = null;
    let max = null;
    const excludedRanges = [];
    
    // Get all range definitions
    const allRanges = Object.keys(priceRanges);
    const selectedSet = new Set(selectedRanges);
    
    // Calculate outer bounds
    let hasUnboundedMax = false;
    selectedRanges.forEach(key => {
        const range = priceRanges[key];
        if (range) {
            // Set minimum to the lowest min value
            if (min === null || (range.min !== null && range.min < min)) {
                min = range.min;
            }
            
            // Handle maximum
            if (range.max === null) {
                hasUnboundedMax = true; // Any unbounded range makes the whole selection unbounded
            } else {
                // Take the highest max value (unless we already have unbounded)
                if (!hasUnboundedMax && (max === null || range.max > max)) {
                    max = range.max;
                }
            }
        }
    });
    
    // If any selected range is unbounded, the result is unbounded
    if (hasUnboundedMax) {
        max = null;
    }
    
    // If user selected multiple non-contiguous ranges (e.g., low + high), 
    // we pass the outer bounds but note excluded middle ranges in the query
    const result = { min, max };
    
    // Check for excluded ranges
    allRanges.forEach(key => {
        if (!selectedSet.has(key)) {
            const range = priceRanges[key];
            if (range) {
                excludedRanges.push({ min: range.min, max: range.max });
            }
        }
    });
    
    if (excludedRanges.length > 0 && excludedRanges.length < allRanges.length) {
        result.excludeRanges = excludedRanges;
    }
    
    return result;
}

// ========================================
// AI Loading Modal
// ========================================

/**
 * Show AI loading modal with custom message
 */
function showAILoadingModal(title = 'AI is Working...', message = 'Analyzing your decision and generating suggestions') {
    const modal = document.getElementById('aiLoadingModal');
    const titleEl = document.getElementById('aiLoadingTitle');
    const messageEl = document.getElementById('aiLoadingMessage');
    
    if (modal && titleEl && messageEl) {
        titleEl.textContent = title;
        messageEl.textContent = message;
        modal.classList.add('active');
    }
}

/**
 * Hide AI loading modal
 */
function hideAILoadingModal() {
    const modal = document.getElementById('aiLoadingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ========================================
// Keyboard Shortcuts and Navigation
// ========================================

function handleKeyboardShortcuts(e) {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.matches('input, textarea, select')) {
        return;
    }
    
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
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const state = StateManager.getState();
        if (state.currentDecision) {
            openModal('export');
        }
    }
    
    // Ctrl/Cmd + / to show keyboard shortcuts help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showKeyboardShortcutsHelp();
    }
    
    // Number keys 1-4 to navigate steps (when not in input)
    const state = StateManager.getState();
    if (state.currentDecision && e.key >= '1' && e.key <= '4') {
        const steps = ['criteria', 'alternatives', 'evaluation', 'results'];
        const stepIndex = parseInt(e.key) - 1;
        if (steps[stepIndex]) {
            navigateToStep(steps[stepIndex]);
        }
    }
}

/**
 * Show keyboard shortcuts help
 */
function showKeyboardShortcutsHelp() {
    showToast(
        'Keyboard Shortcuts:\n' +
        'Ctrl/Cmd + N: New Decision\n' +
        'Ctrl/Cmd + E: Export\n' +
        'Ctrl/Cmd + S: Save\n' +
        '1-4: Navigate Steps\n' +
        'Esc: Close Modals',
        'info',
        5000
    );
}

/**
 * Handle arrow key navigation in lists
 */
function handleArrowKeyNavigation(e) {
    if (e.target.matches('input, textarea, select')) {
        return;
    }
    
    // Arrow key navigation in decision list
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const activeItem = document.querySelector('.nav-item.active');
        const allItems = Array.from(document.querySelectorAll('.nav-item[data-id]'));
        
        if (allItems.length === 0) return;
        
        const currentIndex = allItems.indexOf(activeItem);
        let nextIndex;
        
        if (e.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
        } else {
            nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
        }
        
        const nextItem = allItems[nextIndex];
        if (nextItem) {
            e.preventDefault();
            const decisionId = nextItem.dataset.id;
            loadDecision(decisionId);
            nextItem.focus();
        }
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
    editCriterionName,
    updateAlternative,
    deleteAlternative,
    editAlternativeName,
    setScore,
    acceptAISuggestion,
    editPriceConstraint,
    showWelcomeView
};

// ========================================
// Initialize App
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    init();
});
