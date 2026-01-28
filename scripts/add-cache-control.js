#!/usr/bin/env node

/**
 * Script to add cache control meta tags to all HTML files
 * This ensures browsers always load the latest version of pages
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Cache control meta tags to add
const cacheControlTags = `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>`;

// Patterns to match where we should insert the cache control tags
const insertAfterPatterns = [
  /<meta\s+name="viewport"[^>]*>/i,
  /<meta\s+charset="[^"]*"\s*\/>/i,
  /<meta\s+charset='[^']*'\s*\/>/i,
];

// Check if file already has cache control
function hasCacheControl(content) {
  return /Cache-Control.*no-cache/i.test(content);
}

// Add cache control tags to HTML content
function addCacheControl(content) {
  if (hasCacheControl(content)) {
    console.log('  ✓ Already has cache control');
    return null; // No changes needed
  }

  let modified = false;
  let newContent = content;

  // Try to insert after viewport or charset meta tag
  for (const pattern of insertAfterPatterns) {
    const match = newContent.match(pattern);
    if (match) {
      const insertPosition = match.index + match[0].length;
      newContent = 
        newContent.slice(0, insertPosition) +
        '\n    ' + cacheControlTags +
        newContent.slice(insertPosition);
      modified = true;
      break;
    }
  }

  return modified ? newContent : null;
}

// Recursively find all HTML files
async function findHtmlFiles(dir, fileList = []) {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);

    // Skip node_modules, .git, and other directories we don't want to touch
    if (fileStat.isDirectory()) {
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
        await findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

// Process a single HTML file
async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const newContent = addCacheControl(content);

    if (newContent) {
      await writeFile(filePath, newContent, 'utf8');
      console.log(`  ✓ Updated: ${path.relative(process.cwd(), filePath)}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔍 Finding HTML files...\n');
  
  const rootDir = process.cwd();
  const htmlFiles = await findHtmlFiles(rootDir);
  
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  console.log('📝 Adding cache control meta tags...\n');

  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of htmlFiles) {
    process.stdout.write(`Processing: ${path.relative(rootDir, file)}... `);
    const updated = await processFile(file);
    if (updated) {
      updatedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log('\n✅ Done!');
  console.log(`   Updated: ${updatedCount} files`);
  console.log(`   Skipped: ${skippedCount} files (already had cache control)`);
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
