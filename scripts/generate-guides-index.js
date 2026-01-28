/**
 * Generate Decision Guides index page from published decision JSON files
 * Run by GitHub Actions after generating HTML pages
 */

const fs = require('fs');
const path = require('path');

// #region agent log
const DEBUG_LOG_PATH = path.join(__dirname, '../.cursor/debug.log');
function debugLog(location, message, data = {}) {
    const logEntry = JSON.stringify({
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        location,
        message,
        data,
        sessionId: 'debug-session',
        runId: process.env.RUN_ID || 'run1',
        hypothesisId: data.hypothesisId || 'F'
    }) + '\n';
    try {
        fs.appendFileSync(DEBUG_LOG_PATH, logEntry);
    } catch (e) {}
}
// #endregion

// Paths
const decisionsDir = path.join(__dirname, '../decisions');
const templatePath = path.join(__dirname, '../templates/guides-index-template.html');
const outputDir = path.join(__dirname, '../guides');
const outputPath = path.join(outputDir, 'index.html');

// Ensure decisions directory exists
if (!fs.existsSync(decisionsDir)) {
    console.log('Decisions directory does not exist');
    process.exit(0);
}

// Check if template exists
if (!fs.existsSync(templatePath)) {
    console.error('Error: Guides template not found at', templatePath);
    process.exit(1);
}

// Ensure guides output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created guides directory');
}

// Read template
const template = fs.readFileSync(templatePath, 'utf8');

// Get all JSON files in decisions directory
const jsonFiles = fs.readdirSync(decisionsDir).filter(f => f.endsWith('.json'));

// #region agent log
debugLog('generate-guides-index.js:37', 'Script started', { hypothesisId: 'F', jsonFilesCount: jsonFiles.length, jsonFiles });
// #endregion

if (jsonFiles.length === 0) {
    console.log('No decision JSON files found');
    // Generate empty guides page
    const html = template.replace('{{GUIDES_GRID}}', '<p class="no-guides">No decision guides published yet. Check back soon!</p>');
    // #region agent log
    debugLog('generate-guides-index.js:43', 'Writing empty guides page', { hypothesisId: 'F', outputPath, outputDirExists: fs.existsSync(outputDir) });
    // #endregion
    fs.writeFileSync(outputPath, html);
    // #region agent log
    debugLog('generate-guides-index.js:45', 'Empty guides page written', { hypothesisId: 'F', outputPath, fileExists: fs.existsSync(outputPath) });
    // #endregion
    console.log('Generated empty guides index');
    process.exit(0);
}

console.log(`Found ${jsonFiles.length} decision(s) for guides index`);

// Read and parse all decisions
const decisions = [];
// #region agent log
debugLog('generate-guides-index.js:51', 'Starting to process decisions', { hypothesisId: 'G', filesCount: jsonFiles.length });
// #endregion
for (const file of jsonFiles) {
    try {
        // #region agent log
        debugLog('generate-guides-index.js:55', 'Processing file for guides', { hypothesisId: 'G', file });
        // #endregion
        const jsonPath = path.join(decisionsDir, file);
        const decision = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // #region agent log
        debugLog('generate-guides-index.js:59', 'Decision parsed for guides', { hypothesisId: 'G', file, hasTitle: !!decision.title, hasResults: !!decision.results, hasPublishedAt: !!decision.publishedAt });
        // #endregion
        
        // Validate required fields
        if (!decision.title || !decision.results || !decision.publishedAt) {
            console.warn(`Skipping ${file}: missing required fields`);
            // #region agent log
            debugLog('generate-guides-index.js:62', 'Skipping file - missing fields', { hypothesisId: 'G', file });
            // #endregion
            continue;
        }
        
        // Extract relevant data
        const winner = decision.results[0];
        const slug = file.replace('.json', '');
        
        // #region agent log
        debugLog('generate-guides-index.js:68', 'Extracted slug from filename', { hypothesisId: 'G', file, slug, decisionSlug: decision.slug });
        // #endregion
        
        decisions.push({
            title: decision.metadata?.seoTitle || decision.title,
            slug: slug,
            summary: decision.summary || decision.description || generateFallbackSummary(decision),
            publishedAt: new Date(decision.publishedAt),
            winnerName: winner.name,
            winnerPercentage: winner.percentage,
            alternativesCount: decision.alternatives?.length || 0,
            criteriaCount: decision.criteria?.length || 0
        });
    } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
        // #region agent log
        debugLog('generate-guides-index.js:79', 'Error reading file', { hypothesisId: 'H', file, errorMessage: error.message, errorStack: error.stack });
        // #endregion
    }
}

// #region agent log
debugLog('generate-guides-index.js:83', 'All decisions processed', { hypothesisId: 'I', decisionsCount: decisions.length });
// #endregion

// Sort by published date (newest first)
decisions.sort((a, b) => b.publishedAt - a.publishedAt);

// Generate decision cards HTML
const guidesGridHTML = decisions.map(d => generateDecisionCard(d)).join('\n');

// #region agent log
debugLog('generate-guides-index.js:89', 'Guides grid HTML generated', { hypothesisId: 'I', guidesGridHTMLLength: guidesGridHTML.length });
// #endregion

// Replace placeholder in template
const html = template.replace('{{GUIDES_GRID}}', guidesGridHTML);

// #region agent log
debugLog('generate-guides-index.js:92', 'Before writing guides index', { hypothesisId: 'J', outputPath, outputDirExists: fs.existsSync(outputDir), fileExists: fs.existsSync(outputPath), htmlLength: html.length });
// #endregion

// Write output file
fs.writeFileSync(outputPath, html);

// #region agent log
debugLog('generate-guides-index.js:95', 'Guides index written', { hypothesisId: 'J', outputPath, fileExistsAfter: fs.existsSync(outputPath), fileSize: fs.existsSync(outputPath) ? fs.statSync(outputPath).size : 0 });
// #endregion

console.log(`Generated guides index with ${decisions.length} decision(s)`);

/**
 * Generate HTML for a decision card
 */
function generateDecisionCard(decision) {
    const publishDate = decision.publishedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `                <article class="guide-card">
                    <span class="category-tag">Decision Guide</span>
                    <h3><a href="/decisions/${escapeHtml(decision.slug)}.html">${escapeHtml(decision.title)}</a></h3>
                    <p>${escapeHtml(decision.summary)}</p>
                    <div class="meta">
                        <span class="date">${publishDate}</span>
                        <span class="winner">Winner: ${escapeHtml(decision.winnerName)}</span>
                    </div>
                </article>`;
}

/**
 * Generate a fallback summary when AI summary is not available
 */
function generateFallbackSummary(decision) {
    const winner = decision.results[0];
    const count = decision.alternatives?.length || 0;
    return `Compare ${count} options in this decision guide. Winner: ${winner.name} with ${winner.percentage.toFixed(1)}% score.`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
