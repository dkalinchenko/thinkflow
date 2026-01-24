/**
 * Test script to simulate a published decision
 * Run: node scripts/test-publish.js
 */

const fs = require('fs');
const path = require('path');

const testDecision = {
    id: 'test-123',
    slug: 'test-laptop-comparison',
    title: 'Test Laptop Comparison',
    description: 'A test decision to verify the publishing workflow',
    publishedAt: new Date().toISOString(),
    criteria: [
        { id: 'c1', name: 'Performance', weight: 2.0, description: 'Processing power and speed' },
        { id: 'c2', name: 'Battery Life', weight: 1.5, description: 'Hours of battery life' },
        { id: 'c3', name: 'Price', weight: 1.8, description: 'Cost in USD' }
    ],
    alternatives: [
        { id: 'a1', name: 'MacBook Pro', description: 'Apple M3 chip, 16GB RAM' },
        { id: 'a2', name: 'Dell XPS 15', description: 'Intel i7, 32GB RAM' },
        { id: 'a3', name: 'Lenovo ThinkPad', description: 'AMD Ryzen 7, 16GB RAM' }
    ],
    results: [
        {
            id: 'a1',
            name: 'MacBook Pro',
            description: 'Apple M3 chip, 16GB RAM',
            totalScore: 8.75,
            percentage: 87.5,
            criteriaScores: { c1: 5, c2: 5, c3: 3 }
        },
        {
            id: 'a2',
            name: 'Dell XPS 15',
            description: 'Intel i7, 32GB RAM',
            totalScore: 8.25,
            percentage: 82.5,
            criteriaScores: { c1: 5, c2: 4, c3: 3 }
        },
        {
            id: 'a3',
            name: 'Lenovo ThinkPad',
            description: 'AMD Ryzen 7, 16GB RAM',
            totalScore: 7.95,
            percentage: 79.5,
            criteriaScores: { c1: 4, c2: 5, c3: 4 }
        }
    ],
    metadata: {
        seoTitle: 'Best Laptop Comparison 2026 - MacBook Pro vs Dell XPS vs ThinkPad',
        seoDescription: 'Comprehensive comparison of top laptops using weighted decision matrix analysis'
    }
};

const decisionsDir = path.join(__dirname, '../decisions');
const jsonPath = path.join(decisionsDir, `${testDecision.id}-${testDecision.slug}.json`);

// Ensure decisions directory exists
if (!fs.existsSync(decisionsDir)) {
    fs.mkdirSync(decisionsDir, { recursive: true });
}

// Write test decision JSON
fs.writeFileSync(jsonPath, JSON.stringify(testDecision, null, 2));
console.log(`✓ Created test decision: ${jsonPath}`);

// Now run the generate-pages script
console.log('\nGenerating HTML page...');
require('./generate-pages.js');
