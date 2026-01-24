/**
 * Generate Decision Guides index page from published decision JSON files
 * Run by GitHub Actions after generating HTML pages
 */

const fs = require('fs');
const path = require('path');

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

if (jsonFiles.length === 0) {
    console.log('No decision JSON files found');
    // Generate empty guides page
    const html = template.replace('{{GUIDES_GRID}}', '<p class="no-guides">No decision guides published yet. Check back soon!</p>');
    fs.writeFileSync(outputPath, html);
    console.log('Generated empty guides index');
    process.exit(0);
}

console.log(`Found ${jsonFiles.length} decision(s) for guides index`);

// Read and parse all decisions
const decisions = [];
for (const file of jsonFiles) {
    try {
        const jsonPath = path.join(decisionsDir, file);
        const decision = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Validate required fields
        if (!decision.title || !decision.results || !decision.publishedAt) {
            console.warn(`Skipping ${file}: missing required fields`);
            continue;
        }
        
        // Extract relevant data
        const winner = decision.results[0];
        const slug = file.replace('.json', '');
        
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
    }
}

// Sort by published date (newest first)
decisions.sort((a, b) => b.publishedAt - a.publishedAt);

// Generate decision cards HTML
const guidesGridHTML = decisions.map(d => generateDecisionCard(d)).join('\n');

// Replace placeholder in template
const html = template.replace('{{GUIDES_GRID}}', guidesGridHTML);

// Write output file
fs.writeFileSync(outputPath, html);

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
