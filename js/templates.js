/**
 * Decision Templates for ThinkFlow AI
 * Pre-built templates for common decision types
 */

export const templates = [
    {
        id: 'job-offer',
        name: 'Job Offer Comparison',
        description: 'Compare multiple job offers systematically',
        category: 'Career',
        icon: '💼',
        criteria: [
            { name: 'Base Salary', weight: 2.0, description: 'Annual base compensation before bonuses' },
            { name: 'Growth Potential', weight: 1.8, description: 'Opportunities for advancement and skill development' },
            { name: 'Work-Life Balance', weight: 1.7, description: 'Hours, flexibility, remote options, and time off' },
            { name: 'Company Culture', weight: 1.5, description: 'Values alignment, team dynamics, and work environment' },
            { name: 'Benefits Package', weight: 1.3, description: 'Health insurance, retirement, equity, and perks' },
            { name: 'Location & Commute', weight: 1.2, description: 'Office location, commute time, or remote policy' },
            { name: 'Job Security', weight: 1.0, description: 'Company stability, industry outlook, and role demand' }
        ],
        exampleAlternatives: [
            { name: 'Company A - Senior Developer', description: 'Large tech company, strong benefits' },
            { name: 'Company B - Lead Developer', description: 'Growing startup, equity heavy' },
            { name: 'Company C - Architect', description: 'Remote-first, flexible hours' }
        ],
        tips: 'Consider long-term career trajectory, not just immediate benefits. Factor in cost of living if relocating.'
    },
    {
        id: 'housing',
        name: 'Housing Decision',
        description: 'Compare apartments, houses, or living situations',
        category: 'Personal',
        icon: '🏠',
        criteria: [
            { name: 'Monthly Cost', weight: 2.0, description: 'Rent/mortgage, utilities, and associated fees' },
            { name: 'Location Quality', weight: 1.8, description: 'Neighborhood safety, walkability, and amenities' },
            { name: 'Commute Time', weight: 1.5, description: 'Travel time to work, school, or frequent destinations' },
            { name: 'Space & Layout', weight: 1.4, description: 'Square footage, room count, and floor plan' },
            { name: 'Condition', weight: 1.3, description: 'Age, maintenance, appliances, and upgrades' },
            { name: 'Natural Light', weight: 1.0, description: 'Window placement, sun exposure, and views' },
            { name: 'Parking & Storage', weight: 0.8, description: 'Garage, parking spots, closets, and storage' }
        ],
        exampleAlternatives: [
            { name: 'Downtown Apartment', description: '1BR, walkable area, modern building' },
            { name: 'Suburban House', description: '3BR, quiet neighborhood, needs some updates' },
            { name: 'City Condo', description: '2BR, great views, higher HOA' }
        ],
        tips: 'Visit at different times of day. Check noise levels, water pressure, and cell signal.'
    },
    {
        id: 'technology',
        name: 'Tech Purchase',
        description: 'Compare laptops, phones, or other tech products',
        category: 'Consumer',
        icon: '💻',
        criteria: [
            { name: 'Performance', weight: 2.0, description: 'Speed, processing power, and capability for your tasks' },
            { name: 'Price', weight: 1.8, description: 'Total cost including accessories and services' },
            { name: 'Build Quality', weight: 1.5, description: 'Materials, durability, and premium feel' },
            { name: 'Battery Life', weight: 1.4, description: 'Real-world usage time between charges' },
            { name: 'Display Quality', weight: 1.3, description: 'Resolution, color accuracy, and brightness' },
            { name: 'Portability', weight: 1.0, description: 'Weight, size, and ease of transport' },
            { name: 'Ecosystem & Support', weight: 0.8, description: 'Software compatibility, warranty, and service' }
        ],
        exampleAlternatives: [
            { name: 'MacBook Pro 14"', description: 'Premium performance, macOS ecosystem' },
            { name: 'Dell XPS 15', description: 'Windows power user, great display' },
            { name: 'ThinkPad X1 Carbon', description: 'Business focused, legendary keyboard' }
        ],
        tips: 'Consider your actual daily tasks. Read recent reviews focusing on real-world performance.'
    },
    {
        id: 'vendor',
        name: 'Vendor Selection',
        description: 'Evaluate and compare business vendors or suppliers',
        category: 'Business',
        icon: '🤝',
        criteria: [
            { name: 'Price & Value', weight: 2.0, description: 'Total cost of ownership and ROI' },
            { name: 'Quality & Reliability', weight: 1.8, description: 'Product/service quality and consistency' },
            { name: 'Support & Service', weight: 1.6, description: 'Customer support, response time, and expertise' },
            { name: 'Reputation & Track Record', weight: 1.4, description: 'Market presence, reviews, and case studies' },
            { name: 'Scalability', weight: 1.2, description: 'Ability to grow with your needs' },
            { name: 'Integration', weight: 1.0, description: 'Compatibility with existing systems' },
            { name: 'Contract Terms', weight: 0.9, description: 'Flexibility, lock-in, and exit clauses' }
        ],
        exampleAlternatives: [
            { name: 'Vendor A', description: 'Market leader, premium pricing' },
            { name: 'Vendor B', description: 'Mid-market, strong support' },
            { name: 'Vendor C', description: 'Startup, innovative features' }
        ],
        tips: 'Request demos and speak with existing customers. Negotiate terms before final selection.'
    },
    {
        id: 'education',
        name: 'Education Program',
        description: 'Compare universities, courses, or training programs',
        category: 'Career',
        icon: '🎓',
        criteria: [
            { name: 'Program Quality', weight: 2.0, description: 'Curriculum strength, accreditation, and reputation' },
            { name: 'Career Outcomes', weight: 1.8, description: 'Employment rates, salary uplift, and network' },
            { name: 'Cost & ROI', weight: 1.7, description: 'Tuition, scholarships, and return on investment' },
            { name: 'Location & Lifestyle', weight: 1.3, description: 'Campus life, city appeal, and living costs' },
            { name: 'Faculty & Research', weight: 1.2, description: 'Professor quality and research opportunities' },
            { name: 'Flexibility', weight: 1.0, description: 'Online options, part-time, and schedule' },
            { name: 'Admission Fit', weight: 0.8, description: 'Likelihood of acceptance and requirements' }
        ],
        exampleAlternatives: [
            { name: 'Program A - Top University', description: 'Prestigious, competitive, expensive' },
            { name: 'Program B - Online MBA', description: 'Flexible, affordable, growing reputation' },
            { name: 'Program C - Local State School', description: 'Practical, affordable, good network' }
        ],
        tips: 'Talk to current students and alumni. Consider opportunity cost of time investment.'
    },
    {
        id: 'investment',
        name: 'Investment Opportunity',
        description: 'Evaluate investment options and opportunities',
        category: 'Business',
        icon: '📈',
        criteria: [
            { name: 'Expected Return', weight: 2.0, description: 'Projected ROI and growth potential' },
            { name: 'Risk Level', weight: 1.8, description: 'Volatility, downside protection, and stability' },
            { name: 'Liquidity', weight: 1.5, description: 'Ease of entry and exit, lock-up periods' },
            { name: 'Diversification', weight: 1.3, description: 'Correlation with existing portfolio' },
            { name: 'Time Horizon', weight: 1.2, description: 'Match with your investment timeline' },
            { name: 'Tax Efficiency', weight: 1.0, description: 'Tax implications and optimization' },
            { name: 'Minimum Investment', weight: 0.8, description: 'Capital requirements and thresholds' }
        ],
        exampleAlternatives: [
            { name: 'Index Fund', description: 'Diversified, low cost, passive' },
            { name: 'Real Estate', description: 'Tangible asset, rental income potential' },
            { name: 'Growth Stocks', description: 'Higher risk, higher potential return' }
        ],
        tips: 'Consult a financial advisor. Past performance does not guarantee future results.'
    },
    {
        id: 'car',
        name: 'Car Purchase',
        description: 'Compare vehicles for purchase or lease',
        category: 'Consumer',
        icon: '🚗',
        criteria: [
            { name: 'Total Cost', weight: 2.0, description: 'Purchase price, insurance, fuel, maintenance' },
            { name: 'Reliability', weight: 1.8, description: 'Brand reputation, recall history, durability' },
            { name: 'Safety', weight: 1.7, description: 'Crash ratings, safety features, driver assists' },
            { name: 'Comfort & Features', weight: 1.4, description: 'Interior quality, tech, and convenience' },
            { name: 'Performance', weight: 1.2, description: 'Power, handling, and driving experience' },
            { name: 'Fuel Efficiency', weight: 1.0, description: 'MPG or range for electric vehicles' },
            { name: 'Resale Value', weight: 0.9, description: 'Depreciation and resale market' }
        ],
        exampleAlternatives: [
            { name: 'Toyota Camry', description: 'Reliable sedan, good value' },
            { name: 'Tesla Model 3', description: 'Electric, tech-forward, performance' },
            { name: 'Honda CR-V', description: 'Practical SUV, family friendly' }
        ],
        tips: 'Test drive all options. Check insurance quotes before deciding.'
    },
    {
        id: 'travel',
        name: 'Travel Destination',
        description: 'Compare vacation destinations or trip options',
        category: 'Personal',
        icon: '✈️',
        criteria: [
            { name: 'Total Budget', weight: 2.0, description: 'Flights, accommodation, activities, and food' },
            { name: 'Experience Quality', weight: 1.8, description: 'Unique activities, culture, and attractions' },
            { name: 'Weather & Season', weight: 1.5, description: 'Climate during travel dates' },
            { name: 'Safety', weight: 1.4, description: 'Destination safety and health considerations' },
            { name: 'Travel Logistics', weight: 1.2, description: 'Flight time, connections, and accessibility' },
            { name: 'Food & Dining', weight: 1.0, description: 'Culinary scene and dining options' },
            { name: 'Group Fit', weight: 1.0, description: 'Suitability for all travelers in your group' }
        ],
        exampleAlternatives: [
            { name: 'Paris, France', description: 'Culture, history, cuisine' },
            { name: 'Bali, Indonesia', description: 'Beaches, temples, affordable' },
            { name: 'Tokyo, Japan', description: 'Unique culture, food, technology' }
        ],
        tips: 'Check visa requirements and travel advisories. Book popular attractions in advance.'
    },
    {
        id: 'software',
        name: 'Software Selection',
        description: 'Compare software tools or platforms',
        category: 'Business',
        icon: '🔧',
        criteria: [
            { name: 'Features & Functionality', weight: 2.0, description: 'Does it solve your core problems?' },
            { name: 'Ease of Use', weight: 1.7, description: 'Learning curve and user experience' },
            { name: 'Price', weight: 1.6, description: 'Per-user cost, tiers, and hidden fees' },
            { name: 'Integration', weight: 1.5, description: 'API, webhooks, and ecosystem compatibility' },
            { name: 'Support Quality', weight: 1.3, description: 'Documentation, community, and vendor support' },
            { name: 'Security & Compliance', weight: 1.2, description: 'Data protection and regulatory compliance' },
            { name: 'Scalability', weight: 1.0, description: 'Performance as usage grows' }
        ],
        exampleAlternatives: [
            { name: 'Enterprise Solution', description: 'Full-featured, complex, expensive' },
            { name: 'SaaS Startup', description: 'Modern UX, limited features, affordable' },
            { name: 'Open Source', description: 'Free, customizable, self-hosted' }
        ],
        tips: 'Run a pilot with real users. Evaluate migration complexity from current tools.'
    },
    {
        id: 'health',
        name: 'Healthcare Decision',
        description: 'Compare treatment options or healthcare providers',
        category: 'Personal',
        icon: '🏥',
        criteria: [
            { name: 'Effectiveness', weight: 2.0, description: 'Success rates and expected outcomes' },
            { name: 'Safety & Risks', weight: 1.9, description: 'Side effects and complication rates' },
            { name: 'Cost', weight: 1.5, description: 'Out-of-pocket expenses and insurance coverage' },
            { name: 'Recovery Time', weight: 1.4, description: 'Time to return to normal activities' },
            { name: 'Provider Experience', weight: 1.3, description: 'Doctor/facility expertise and reputation' },
            { name: 'Convenience', weight: 1.0, description: 'Location, scheduling, and logistics' },
            { name: 'Quality of Life', weight: 1.2, description: 'Long-term impact on daily life' }
        ],
        exampleAlternatives: [
            { name: 'Treatment Option A', description: 'Standard approach, well-studied' },
            { name: 'Treatment Option B', description: 'Newer method, promising results' },
            { name: 'Conservative Approach', description: 'Watch and wait, minimal intervention' }
        ],
        tips: 'Always consult with qualified healthcare professionals. Get second opinions for major decisions.'
    },
    {
        id: 'hire',
        name: 'Hiring Decision',
        description: 'Compare job candidates for a position',
        category: 'Business',
        icon: '👥',
        criteria: [
            { name: 'Skills & Experience', weight: 2.0, description: 'Relevant expertise and track record' },
            { name: 'Culture Fit', weight: 1.7, description: 'Alignment with team and company values' },
            { name: 'Growth Potential', weight: 1.5, description: 'Ability to learn, adapt, and advance' },
            { name: 'Communication', weight: 1.4, description: 'Clarity, collaboration, and presentation' },
            { name: 'References', weight: 1.2, description: 'Feedback from previous employers' },
            { name: 'Compensation Fit', weight: 1.1, description: 'Salary expectations vs. budget' },
            { name: 'Availability', weight: 0.9, description: 'Start date and location flexibility' }
        ],
        exampleAlternatives: [
            { name: 'Candidate A', description: 'Senior experience, higher salary ask' },
            { name: 'Candidate B', description: 'Rising star, eager to prove themselves' },
            { name: 'Candidate C', description: 'Industry veteran, different background' }
        ],
        tips: 'Use structured interviews. Check references thoroughly. Consider team dynamics.'
    },
    {
        id: 'project',
        name: 'Project Prioritization',
        description: 'Compare and prioritize potential projects',
        category: 'Business',
        icon: '📋',
        criteria: [
            { name: 'Strategic Alignment', weight: 2.0, description: 'Fit with company goals and vision' },
            { name: 'Expected Impact', weight: 1.8, description: 'Revenue, efficiency, or market benefit' },
            { name: 'Resource Requirements', weight: 1.6, description: 'Team, budget, and time needed' },
            { name: 'Risk Level', weight: 1.5, description: 'Technical and execution uncertainty' },
            { name: 'Dependencies', weight: 1.2, description: 'Blockers and prerequisite work' },
            { name: 'Quick Wins', weight: 1.0, description: 'Speed to initial value delivery' },
            { name: 'Team Enthusiasm', weight: 0.9, description: 'Team motivation and skill match' }
        ],
        exampleAlternatives: [
            { name: 'Project A', description: 'Big bet, transformational potential' },
            { name: 'Project B', description: 'Customer request, clear ROI' },
            { name: 'Project C', description: 'Tech debt, enables future work' }
        ],
        tips: 'Consider opportunity cost. Balance short-term wins with long-term investments.'
    }
];

/**
 * Get template by ID
 */
export function getTemplate(id) {
    return templates.find(t => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category) {
    return templates.filter(t => t.category === category);
}

/**
 * Get all template categories
 */
export function getTemplateCategories() {
    return [...new Set(templates.map(t => t.category))];
}

/**
 * Create decision from template
 */
export function createDecisionFromTemplate(templateId) {
    const template = getTemplate(templateId);
    if (!template) return null;
    
    return {
        title: `New ${template.name}`,
        description: template.description,
        category: template.category,
        criteria: template.criteria.map((c, i) => ({
            id: `criterion-${i}`,
            name: c.name,
            weight: c.weight,
            description: c.description
        })),
        alternatives: [],
        scores: {}
    };
}

export default templates;
