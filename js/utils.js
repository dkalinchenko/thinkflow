/**
 * Utility Functions for OptiMind AI
 */

/**
 * Generate a unique ID
 */
export function generateId() {
    return crypto.randomUUID();
}

/**
 * Debounce function execution
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function execution
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep clone an object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) {
        return 'Just now';
    }
    
    // Less than 1 hour
    if (diff < 3600000) {
        const mins = Math.floor(diff / 60000);
        return `${mins} minute${mins > 1 ? 's' : ''} ago`;
    }
    
    // Less than 1 day
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    // Default format
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

/**
 * Calculate weighted score
 */
export function calculateWeightedScore(score, weight) {
    return parseFloat((score * weight).toFixed(2));
}

/**
 * Calculate total score for an alternative
 */
export function calculateTotalScore(scores, criteria) {
    let total = 0;
    let maxPossible = 0;
    
    for (const criterion of criteria) {
        const score = scores[criterion.id] || 0;
        total += calculateWeightedScore(score, criterion.weight);
        maxPossible += criterion.weight * 10; // Assuming 10 is max score
    }
    
    return {
        total: parseFloat(total.toFixed(2)),
        maxPossible: parseFloat(maxPossible.toFixed(2)),
        percentage: maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0
    };
}

/**
 * Get score color class based on value
 */
export function getScoreColorClass(score, maxScore = 10) {
    const percentage = (score / maxScore) * 100;
    if (percentage < 40) return 'score-low';
    if (percentage < 70) return 'score-mid';
    return 'score-high';
}

/**
 * Compress data for URL sharing
 */
export function compressForUrl(data) {
    const json = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decompress data from URL
 */
export function decompressFromUrl(compressed) {
    const json = LZString.decompressFromEncodedURIComponent(compressed);
    return json ? JSON.parse(json) : null;
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(decision) {
    const shareData = {
        t: decision.title,
        d: decision.description,
        c: decision.criteria.map(c => ({
            n: c.name,
            w: c.weight,
            d: c.description
        })),
        a: decision.alternatives.map(a => ({
            n: a.name,
            d: a.description
        })),
        s: decision.scores
    };
    
    const compressed = compressForUrl(shareData);
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?share=${compressed}`;
}

/**
 * Parse shared decision from URL
 */
export function parseShareUrl() {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    
    if (!shareData) return null;
    
    try {
        const data = decompressFromUrl(shareData);
        if (!data) return null;
        
        return {
            title: data.t,
            description: data.d,
            criteria: data.c.map((c, i) => ({
                id: `criterion-${i}`,
                name: c.n,
                weight: c.w,
                description: c.d
            })),
            alternatives: data.a.map((a, i) => ({
                id: `alternative-${i}`,
                name: a.n,
                description: a.d
            })),
            scores: data.s,
            isShared: true
        };
    } catch (e) {
        console.error('Failed to parse share URL:', e);
        return null;
    }
}

/**
 * Export decision to JSON
 */
export function exportToJSON(decision) {
    const blob = new Blob([JSON.stringify(decision, null, 2)], { type: 'application/json' });
    downloadBlob(blob, `${sanitizeFilename(decision.title)}.json`);
}

/**
 * Export decision to CSV
 */
export function exportToCSV(decision) {
    const { criteria, alternatives, scores } = decision;
    
    // Build CSV header
    let csv = 'Alternative,' + criteria.map(c => `"${c.name} (w=${c.weight})"`).join(',') + ',Total Score\n';
    
    // Build rows
    for (const alt of alternatives) {
        let row = `"${alt.name}"`;
        let totalScore = 0;
        
        for (const criterion of criteria) {
            const score = scores[alt.id]?.[criterion.id] || 0;
            row += `,${score}`;
            totalScore += score * criterion.weight;
        }
        
        row += `,${totalScore.toFixed(2)}`;
        csv += row + '\n';
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, `${sanitizeFilename(decision.title)}.csv`);
}

/**
 * Export decision to Markdown
 */
export function exportToMarkdown(decision) {
    const { title, description, criteria, alternatives, scores } = decision;
    
    let md = `# ${title}\n\n`;
    
    if (description) {
        md += `${description}\n\n`;
    }
    
    md += `## Criteria\n\n`;
    md += `| Criterion | Weight | Description |\n`;
    md += `|-----------|--------|-------------|\n`;
    for (const c of criteria) {
        md += `| ${c.name} | ${c.weight} | ${c.description || '-'} |\n`;
    }
    
    md += `\n## Alternatives\n\n`;
    for (const a of alternatives) {
        md += `### ${a.name}\n`;
        if (a.description) {
            md += `${a.description}\n`;
        }
        md += '\n';
    }
    
    md += `## Evaluation Matrix\n\n`;
    md += `| Alternative | ${criteria.map(c => c.name).join(' | ')} | Total |\n`;
    md += `|${'-|'.repeat(criteria.length + 2)}\n`;
    
    for (const alt of alternatives) {
        let totalScore = 0;
        let row = `| ${alt.name} |`;
        
        for (const criterion of criteria) {
            const score = scores[alt.id]?.[criterion.id] || 0;
            row += ` ${score} |`;
            totalScore += score * criterion.weight;
        }
        
        md += row + ` ${totalScore.toFixed(2)} |\n`;
    }
    
    const blob = new Blob([md], { type: 'text/markdown' });
    downloadBlob(blob, `${sanitizeFilename(decision.title)}.md`);
}

/**
 * Download blob as file
 */
export function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(name) {
    return name
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .substring(0, 50);
}

/**
 * Hash string for caching
 */
export async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Simple encryption for API keys (not secure, just obfuscation)
 */
export function encryptApiKey(key) {
    return btoa(key.split('').reverse().join(''));
}

/**
 * Decrypt API key
 */
export function decryptApiKey(encrypted) {
    try {
        return atob(encrypted).split('').reverse().join('');
    } catch {
        return '';
    }
}

/**
 * Validate score input
 */
export function validateScore(value, max = 10) {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    return Math.max(0, Math.min(max, num));
}

/**
 * Get rank suffix (1st, 2nd, 3rd, etc.)
 */
export function getRankSuffix(rank) {
    const j = rank % 10;
    const k = rank % 100;
    
    if (j === 1 && k !== 11) return rank + 'st';
    if (j === 2 && k !== 12) return rank + 'nd';
    if (j === 3 && k !== 13) return rank + 'rd';
    return rank + 'th';
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Parse imported file
 */
export async function parseImportedFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                
                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(content);
                    resolve(Array.isArray(data) ? data : [data]);
                } else {
                    reject(new Error('Unsupported file format'));
                }
            } catch (err) {
                reject(err);
            }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
