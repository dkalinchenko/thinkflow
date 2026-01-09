/**
 * Database Layer - IndexedDB with Dexie.js
 * Handles all data persistence for OptiMind AI
 */

// Initialize Dexie database
const db = new Dexie('OptiMindDB');

// Define database schema
db.version(1).stores({
    decisions: '++id, title, createdAt, updatedAt, category',
    settings: 'key',
    aiCache: 'hash, timestamp'
});

/**
 * Decision CRUD Operations
 */
export const DecisionDB = {
    /**
     * Create a new decision
     */
    async create(decision) {
        const now = new Date().toISOString();
        const newDecision = {
            ...decision,
            id: decision.id || crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
            criteria: decision.criteria || [],
            alternatives: decision.alternatives || [],
            scores: decision.scores || {},
            evaluators: decision.evaluators || [{
                id: 'default',
                name: 'You',
                isDefault: true
            }]
        };
        
        await db.decisions.add(newDecision);
        return newDecision;
    },
    
    /**
     * Get a decision by ID
     */
    async get(id) {
        return await db.decisions.get(id);
    },
    
    /**
     * Get all decisions
     */
    async getAll() {
        return await db.decisions.orderBy('updatedAt').reverse().toArray();
    },
    
    /**
     * Update a decision
     */
    async update(id, updates) {
        const now = new Date().toISOString();
        await db.decisions.update(id, {
            ...updates,
            updatedAt: now
        });
        return await db.decisions.get(id);
    },
    
    /**
     * Delete a decision
     */
    async delete(id) {
        await db.decisions.delete(id);
    },
    
    /**
     * Search decisions by title
     */
    async search(query) {
        const lowerQuery = query.toLowerCase();
        return await db.decisions
            .filter(d => d.title.toLowerCase().includes(lowerQuery))
            .toArray();
    },
    
    /**
     * Export all decisions
     */
    async exportAll() {
        return await db.decisions.toArray();
    },
    
    /**
     * Import decisions
     */
    async importAll(decisions, mode = 'replace') {
        if (mode === 'replace') {
            await db.decisions.clear();
        }
        
        for (const decision of decisions) {
            if (mode === 'merge') {
                const existing = await db.decisions.get(decision.id);
                if (existing) {
                    await db.decisions.update(decision.id, decision);
                } else {
                    await db.decisions.add(decision);
                }
            } else {
                await db.decisions.add(decision);
            }
        }
    },
    
    /**
     * Clear all decisions
     */
    async clearAll() {
        await db.decisions.clear();
    }
};

/**
 * Settings Operations
 */
export const SettingsDB = {
    async get(key, defaultValue = null) {
        const setting = await db.settings.get(key);
        return setting ? setting.value : defaultValue;
    },
    
    async set(key, value) {
        await db.settings.put({ key, value });
    },
    
    async getAll() {
        const settings = await db.settings.toArray();
        return settings.reduce((acc, s) => {
            acc[s.key] = s.value;
            return acc;
        }, {});
    }
};

/**
 * AI Cache Operations
 */
export const AICacheDB = {
    async get(hash) {
        const cached = await db.aiCache.get(hash);
        if (cached) {
            // Check if cache is still valid (24 hours)
            const age = Date.now() - new Date(cached.timestamp).getTime();
            if (age < 24 * 60 * 60 * 1000) {
                return cached.response;
            }
            // Cache expired, delete it
            await db.aiCache.delete(hash);
        }
        return null;
    },
    
    async set(hash, response) {
        await db.aiCache.put({
            hash,
            response,
            timestamp: new Date().toISOString()
        });
    },
    
    async clear() {
        await db.aiCache.clear();
    }
};

export default db;
