/**
 * Generate HTML pages from published decision JSON files
 * Run by GitHub Actions when new decisions are committed
 */

const fs = require('fs');
const path = require('path');

// Paths
const templatePath = path.join(__dirname, '../templates/decision-template.html');
const decisionsDir = path.join(__dirname, '../decisions');

// Ensure decisions directory exists
if (!fs.existsSync(decisionsDir)) {
    fs.mkdirSync(decisionsDir, { recursive: true });
    console.log('Created decisions directory');
}

// Check if template exists
if (!fs.existsSync(templatePath)) {
    console.error('Error: Template file not found at', templatePath);
    process.exit(1);
}

// Read HTML template
const template = fs.readFileSync(templatePath, 'utf8');

// Get all JSON files in decisions directory
const jsonFiles = fs.readdirSync(decisionsDir).filter(f => f.endsWith('.json'));

if (jsonFiles.length === 0) {
    console.log('No decision JSON files found to process');
    process.exit(0);
}

console.log(`Found ${jsonFiles.length} decision(s) to generate`);

// Process each JSON file
jsonFiles.forEach(file => {
    try {
        const jsonPath = path.join(decisionsDir, file);
        const decision = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Validate decision data
        if (!decision.title || !decision.criteria || !decision.alternatives || !decision.results) {
            console.warn(`Skipping ${file}: missing required fields`);
            return;
        }
        
        // Generate HTML
        const html = generateHTML(template, decision);
        
        // Write HTML file
        const htmlFile = file.replace('.json', '.html');
        const htmlPath = path.join(decisionsDir, htmlFile);
        fs.writeFileSync(htmlPath, html);
        
        console.log(`Generated: ${htmlFile}`);
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log('Page generation complete!');

/**
 * Generate HTML from template and decision data
 */
function generateHTML(template, decision) {
    const winner = decision.results[0];
    const publishDate = new Date(decision.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Replace all placeholders
    let html = template
        .replace(/{{TITLE}}/g, escapeHtml(decision.title))
        .replace(/{{SEO_TITLE}}/g, escapeHtml(decision.metadata?.seoTitle || `${decision.title} - Decision Matrix | OptiMind`))
        .replace(/{{SEO_DESCRIPTION}}/g, escapeHtml(decision.metadata?.seoDescription || decision.description || ''))
        .replace(/{{DESCRIPTION}}/g, escapeHtml(decision.description || ''))
        .replace(/{{PUBLISHED_DATE}}/g, publishDate)
        .replace(/{{DECISION_ID}}/g, decision.id)
        .replace(/{{SLUG}}/g, decision.slug)
        .replace(/{{WINNER_NAME}}/g, escapeHtml(winner.name))
        .replace(/{{WINNER_SCORE}}/g, winner.totalScore.toFixed(2))
        .replace(/{{WINNER_PERCENTAGE}}/g, winner.percentage.toFixed(1))
        .replace(/{{CANONICAL_URL}}/g, `https://optimind.space/decisions/${decision.slug}.html`);
    
    // Generate criteria list
    const criteriaHTML = decision.criteria
        .map(c => `<li><strong>${escapeHtml(c.name)}</strong> (weight: ${c.weight})${c.description ? ` - ${escapeHtml(c.description)}` : ''}</li>`)
        .join('\n                ');
    html = html.replace('{{CRITERIA_LIST}}', criteriaHTML);
    
    // Generate alternatives list
    const alternativesHTML = decision.alternatives
        .map(a => `<li><strong>${escapeHtml(a.name)}</strong>${a.description ? ` - ${escapeHtml(a.description)}` : ''}</li>`)
        .join('\n                ');
    html = html.replace('{{ALTERNATIVES_LIST}}', alternativesHTML);
    
    // Generate comparison table
    html = html.replace('{{COMPARISON_TABLE}}', generateComparisonTable(decision));
    
    // Generate structured data
    html = html.replace('{{STRUCTURED_DATA}}', generateStructuredData(decision));
    
    return html;
}

/**
 * Generate HTML comparison table
 */
function generateComparisonTable(decision) {
    let table = '<table class="comparison-table">\n';
    
    // Header row
    table += '  <thead>\n    <tr>\n      <th>Rank</th>\n      <th>Alternative</th>\n';
    decision.criteria.forEach(c => {
        table += `      <th>${escapeHtml(c.name)}<br><small>(weight: ${c.weight})</small></th>\n`;
    });
    table += '      <th>Total Score</th>\n      <th>Rating</th>\n    </tr>\n  </thead>\n';
    
    // Body rows
    table += '  <tbody>\n';
    decision.results.forEach((alt, index) => {
        const rank = index + 1;
        const medal = rank === 1 ? '&#127942;' : rank === 2 ? '&#129352;' : rank === 3 ? '&#129353;' : '';
        const rowClass = rank === 1 ? ' class="winner-row"' : '';
        
        table += `    <tr${rowClass}>\n`;
        table += `      <td>${medal} #${rank}</td>\n`;
        table += `      <td><strong>${escapeHtml(alt.name)}</strong></td>\n`;
        
        decision.criteria.forEach(criterion => {
            const score = alt.criteriaScores?.[criterion.id] || 0;
            const stars = generateStars(score);
            table += `      <td>${stars} <span class="score-num">${score}/5</span></td>\n`;
        });
        
        table += `      <td><strong>${alt.totalScore.toFixed(2)}</strong></td>\n`;
        table += `      <td class="percentage">${alt.percentage.toFixed(1)}%</td>\n`;
        table += '    </tr>\n';
    });
    table += '  </tbody>\n</table>';
    
    return table;
}

/**
 * Generate star rating HTML
 */
function generateStars(score) {
    const fullStars = Math.floor(score);
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '&#11088;'; // Star emoji
    }
    return stars || '&#8212;'; // Em dash if no stars
}

/**
 * Generate Schema.org structured data for SEO
 */
function generateStructuredData(decision) {
    const winner = decision.results[0];
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": decision.title,
        "description": decision.description || decision.metadata?.seoDescription,
        "datePublished": decision.publishedAt,
        "author": {
            "@type": "Organization",
            "name": "OptiMind"
        },
        "publisher": {
            "@type": "Organization",
            "name": "OptiMind",
            "url": "https://optimind.space"
        },
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": decision.results.map((alt, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Thing",
                    "name": alt.name,
                    "description": alt.description || `Scored ${alt.totalScore.toFixed(2)} points (${alt.percentage.toFixed(1)}%)`
                }
            }))
        }
    };
    
    return `
    <script type="application/ld+json">
${JSON.stringify(structuredData, null, 4)}
    </script>`;
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
