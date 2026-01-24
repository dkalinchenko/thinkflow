/**
 * Update sitemap.xml with published decision pages
 * Run by GitHub Actions after generating HTML pages
 */

const fs = require('fs');
const path = require('path');

// Paths
const decisionsDir = path.join(__dirname, '../decisions');
const sitemapPath = path.join(__dirname, '../sitemap.xml');

// Ensure decisions directory exists
if (!fs.existsSync(decisionsDir)) {
    console.log('Decisions directory does not exist, nothing to update');
    process.exit(0);
}

// Check if sitemap exists
if (!fs.existsSync(sitemapPath)) {
    console.error('Error: sitemap.xml not found at', sitemapPath);
    process.exit(1);
}

// Read current sitemap
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Get all HTML files in decisions directory
const htmlFiles = fs.readdirSync(decisionsDir)
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''));

if (htmlFiles.length === 0) {
    console.log('No decision HTML files found');
    process.exit(0);
}

console.log(`Found ${htmlFiles.length} published decision(s)`);

// Remove any existing decision URLs from sitemap to prevent duplicates
// Match URLs like https://optimind.space/decisions/[anything].html
const decisionUrlPattern = /<url>\s*<loc>https:\/\/optimind\.space\/decisions\/[^<]+<\/loc>[\s\S]*?<\/url>\s*/g;
sitemap = sitemap.replace(decisionUrlPattern, '');

// Get today's date for lastmod
const today = new Date().toISOString().split('T')[0];

// Generate URL entries for each decision
const decisionUrls = htmlFiles.map(slug => {
    return `    <!-- Published Decision -->
    <url>
        <loc>https://optimind.space/decisions/${slug}.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;
}).join('\n');

// Add comment section header if decisions exist
let decisionSection = '';
if (htmlFiles.length > 0) {
    decisionSection = `
    <!-- Published Decisions -->
${decisionUrls}
`;
}

// Insert before closing </urlset>
sitemap = sitemap.replace('</urlset>', `${decisionSection}</urlset>`);

// Clean up any multiple blank lines
sitemap = sitemap.replace(/\n{3,}/g, '\n\n');

// Write updated sitemap
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Updated sitemap.xml with ${htmlFiles.length} decision URL(s)`);
