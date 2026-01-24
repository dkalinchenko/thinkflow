/**
 * Serverless API endpoint for publishing decisions
 * Works with Vercel/Netlify serverless functions
 */

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const decision = req.body;
        
        // Validate required fields
        if (!decision.title || !decision.criteria || !decision.alternatives) {
            return res.status(400).json({ error: 'Invalid decision data: missing required fields' });
        }
        
        if (!decision.id || !decision.slug) {
            return res.status(400).json({ error: 'Invalid decision data: missing id or slug' });
        }
        
        // Sanitize slug
        const sanitizedSlug = sanitizeSlug(decision.slug);
        
        // Generate filename (includes ID for uniqueness)
        const filename = `decisions/${decision.id}-${sanitizedSlug}.json`;
        
        // Commit to GitHub
        const result = await commitToGitHub(filename, decision);
        
        // Return public URL (must match filename pattern: id-slug.html)
        const publicUrl = `${process.env.PUBLIC_URL || 'https://optimind.space'}/decisions/${decision.id}-${sanitizedSlug}.html`;
        
        return res.status(200).json({
            success: true,
            url: publicUrl,
            commitSha: result.commit?.sha || 'unknown',
            message: 'Decision will be published in 1-2 minutes after GitHub Actions completes'
        });
        
    } catch (error) {
        console.error('Publish error:', error);
        return res.status(500).json({ 
            error: 'Failed to publish decision',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

/**
 * Sanitize slug to ensure it's URL-safe
 */
function sanitizeSlug(slug) {
    return slug
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 60);
}

/**
 * Commit a JSON file to GitHub repository
 */
async function commitToGitHub(path, content) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = process.env.GITHUB_REPO; // e.g., "username/thinkflow"
    
    if (!GITHUB_TOKEN) {
        throw new Error('GitHub token not configured. Set GITHUB_TOKEN environment variable.');
    }
    
    if (!REPO) {
        throw new Error('GitHub repository not configured. Set GITHUB_REPO environment variable.');
    }
    
    const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
    
    // Check if file already exists (to get SHA for update)
    let sha = null;
    try {
        const checkResponse = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'OptiMind-Publisher'
            }
        });
        if (checkResponse.ok) {
            const data = await checkResponse.json();
            sha = data.sha;
        }
    } catch (e) {
        // File doesn't exist, that's ok - we'll create it
    }
    
    // Prepare content as base64
    const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    
    // Commit file
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'OptiMind-Publisher'
        },
        body: JSON.stringify({
            message: `Published decision: ${content.title}`,
            content: contentBase64,
            branch: 'main',
            ...(sha && { sha }) // Include SHA if updating existing file
        })
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `GitHub API error (${response.status})`;
        
        try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorMessage;
        } catch (e) {
            // Use default message
        }
        
        throw new Error(errorMessage);
    }
    
    return await response.json();
}
