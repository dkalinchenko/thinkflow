/**
 * Decision Templates for OptiMind AI
 * Pre-built templates for common decision types
 */

export const templates = [
    // ========================================
    // Electronics & Product Templates (Featured)
    // ========================================
    {
        id: 'laptop-comparison',
        name: 'Laptop Comparison',
        description: 'Compare laptops to find your perfect machine',
        category: 'Electronics',
        icon: '💻',
        isProductComparison: true,
        productCategory: 'laptop',
        criteria: [
            { name: 'Performance', weight: 2.0, description: 'CPU, RAM, and processing power for your tasks' },
            { name: 'Display Quality', weight: 1.5, description: 'Resolution, color accuracy, brightness' },
            { name: 'Battery Life', weight: 1.8, description: 'Hours of real-world usage between charges' },
            { name: 'Build Quality', weight: 1.2, description: 'Materials, durability, premium feel' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features and performance' },
            { name: 'Portability', weight: 1.0, description: 'Weight and size for travel' }
        ],
        exampleAlternatives: [
            { name: 'MacBook Air M3', description: 'Apple silicon, all-day battery' },
            { name: 'Dell XPS 15', description: 'Windows power user, great display' },
            { name: 'ThinkPad X1 Carbon', description: 'Business focused, legendary keyboard' }
        ],
        tips: 'Use "AI Research Products" to find and compare top laptops automatically!'
    },
    {
        id: 'smartphone-comparison',
        name: 'Smartphone Comparison',
        description: 'Find the best smartphone for your needs',
        category: 'Electronics',
        icon: '📱',
        isProductComparison: true,
        productCategory: 'smartphone',
        criteria: [
            { name: 'Camera Quality', weight: 2.0, description: 'Photo and video capabilities' },
            { name: 'Performance', weight: 1.8, description: 'Speed, multitasking, gaming' },
            { name: 'Battery Life', weight: 1.7, description: 'Daily usage between charges' },
            { name: 'Display', weight: 1.5, description: 'Screen quality, size, refresh rate' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' },
            { name: 'Software & Updates', weight: 1.0, description: 'OS experience, update support' }
        ],
        exampleAlternatives: [
            { name: 'iPhone 15 Pro', description: 'Premium Apple ecosystem' },
            { name: 'Samsung Galaxy S24', description: 'Android flagship' },
            { name: 'Google Pixel 8', description: 'Best-in-class camera AI' }
        ],
        tips: 'Consider what matters most: camera, battery, or ecosystem compatibility.'
    },
    {
        id: 'headphones-comparison',
        name: 'Headphones Comparison',
        description: 'Compare wireless headphones and earbuds',
        category: 'Electronics',
        icon: '🎧',
        isProductComparison: true,
        productCategory: 'headphones',
        criteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, treble balance' },
            { name: 'Noise Cancellation', weight: 1.8, description: 'ANC effectiveness' },
            { name: 'Comfort', weight: 1.5, description: 'Fit, weight, padding quality' },
            { name: 'Battery Life', weight: 1.3, description: 'Hours of playback' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability and materials' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to quality' }
        ],
        exampleAlternatives: [
            { name: 'Sony WH-1000XM5', description: 'Industry-leading ANC' },
            { name: 'AirPods Pro 2', description: 'Apple ecosystem integration' },
            { name: 'Bose QuietComfort Ultra', description: 'Premium comfort' }
        ],
        tips: 'Try them on if possible - comfort matters for long listening sessions.'
    },
    {
        id: 'camera-comparison',
        name: 'Camera Comparison',
        description: 'Compare mirrorless and DSLR cameras',
        category: 'Electronics',
        icon: '📷',
        isProductComparison: true,
        productCategory: 'camera',
        criteria: [
            { name: 'Image Quality', weight: 2.0, description: 'Sensor, resolution, dynamic range' },
            { name: 'Autofocus', weight: 1.8, description: 'Speed, accuracy, subject tracking' },
            { name: 'Video Capability', weight: 1.5, description: '4K, frame rates, stabilization' },
            { name: 'Lens Ecosystem', weight: 1.3, description: 'Available lenses and compatibility' },
            { name: 'Ergonomics', weight: 1.2, description: 'Handling, controls, build' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capability' }
        ],
        exampleAlternatives: [
            { name: 'Sony A7 IV', description: 'Hybrid photo/video excellence' },
            { name: 'Canon R6 Mark II', description: 'Fast autofocus, great colors' },
            { name: 'Nikon Z8', description: 'Professional features, compact body' }
        ],
        tips: 'Consider the lens ecosystem - your lenses often outlast your camera body.'
    },
    {
        id: 'tablet-comparison',
        name: 'Tablet Comparison',
        description: 'Find the right tablet for work or play',
        category: 'Electronics',
        icon: '📲',
        isProductComparison: true,
        productCategory: 'tablet',
        criteria: [
            { name: 'Display Quality', weight: 2.0, description: 'Screen size, resolution, colors' },
            { name: 'Performance', weight: 1.8, description: 'Speed for apps and games' },
            { name: 'Battery Life', weight: 1.5, description: 'Hours of usage' },
            { name: 'Productivity', weight: 1.3, description: 'Stylus support, keyboard compatibility' },
            { name: 'App Ecosystem', weight: 1.2, description: 'Tablet-optimized apps available' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        exampleAlternatives: [
            { name: 'iPad Pro M4', description: 'Most powerful tablet' },
            { name: 'Samsung Galaxy Tab S9', description: 'Android flexibility' },
            { name: 'iPad Air', description: 'Great balance of price/performance' }
        ],
        tips: 'Think about your primary use case: media consumption, note-taking, or laptop replacement.'
    },
    {
        id: 'smartwatch-comparison',
        name: 'Smartwatch Comparison',
        description: 'Compare smartwatches and fitness trackers',
        category: 'Electronics',
        icon: '⌚',
        isProductComparison: true,
        productCategory: 'smartwatch',
        criteria: [
            { name: 'Health Tracking', weight: 2.0, description: 'Heart rate, sleep, fitness accuracy' },
            { name: 'Battery Life', weight: 1.8, description: 'Days between charges' },
            { name: 'Display', weight: 1.5, description: 'Readability, brightness, always-on' },
            { name: 'Smart Features', weight: 1.3, description: 'Apps, notifications, payments' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability, water resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' }
        ],
        exampleAlternatives: [
            { name: 'Apple Watch Ultra 2', description: 'Premium Apple ecosystem' },
            { name: 'Samsung Galaxy Watch 6', description: 'Android integration' },
            { name: 'Garmin Fenix 8', description: 'Outdoor and fitness focused' }
        ],
        tips: 'Make sure the watch is compatible with your phone before buying.'
    },
    
    // ========================================
    // Home Appliances Templates
    // ========================================
    {
        id: 'refrigerator-comparison',
        name: 'Refrigerator Comparison',
        description: 'Find the perfect fridge for your kitchen',
        category: 'Home Appliances',
        icon: '🧊',
        isProductComparison: true,
        productCategory: 'refrigerator',
        criteria: [
            { name: 'Storage Capacity', weight: 2.0, description: 'Total and usable space, shelf configuration' },
            { name: 'Energy Efficiency', weight: 1.8, description: 'Energy Star rating, annual electricity cost' },
            { name: 'Features', weight: 1.5, description: 'Ice maker, water dispenser, smart features' },
            { name: 'Build Quality', weight: 1.4, description: 'Materials, durability, warranty coverage' },
            { name: 'Temperature Control', weight: 1.3, description: 'Consistency, zones, humidity control' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features and capacity' }
        ],
        exampleAlternatives: [
            { name: 'LG French Door', description: 'Smart features, spacious' },
            { name: 'Samsung Family Hub', description: 'Touchscreen, tech-forward' },
            { name: 'Whirlpool Side-by-Side', description: 'Reliable, good value' }
        ],
        tips: 'Measure your space carefully including doorways. Consider door swing clearance.'
    },
    {
        id: 'washing-machine-comparison',
        name: 'Washing Machine Comparison',
        description: 'Compare washers for your laundry needs',
        category: 'Home Appliances',
        icon: '🧺',
        isProductComparison: true,
        productCategory: 'washing machine',
        criteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Stain removal, wash quality' },
            { name: 'Capacity', weight: 1.8, description: 'Load size and drum volume' },
            { name: 'Energy & Water Efficiency', weight: 1.7, description: 'Operating costs per load' },
            { name: 'Wash Programs', weight: 1.4, description: 'Cycle variety, steam, sanitize options' },
            { name: 'Reliability', weight: 1.6, description: 'Brand reputation, warranty, durability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and capacity' }
        ],
        exampleAlternatives: [
            { name: 'LG Front Load', description: 'Efficient, large capacity' },
            { name: 'Speed Queen Top Load', description: 'Commercial-grade durability' },
            { name: 'Samsung AddWash', description: 'Smart features, mid-load additions' }
        ],
        tips: 'Front-load washers are more efficient but need more maintenance. Consider stacking for space.'
    },
    {
        id: 'dishwasher-comparison',
        name: 'Dishwasher Comparison',
        description: 'Find a reliable and efficient dishwasher',
        category: 'Home Appliances',
        icon: '🍽️',
        isProductComparison: true,
        productCategory: 'dishwasher',
        criteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Wash quality, dried dishes' },
            { name: 'Noise Level', weight: 1.7, description: 'Decibel rating during operation' },
            { name: 'Energy Efficiency', weight: 1.5, description: 'Water and electricity usage per cycle' },
            { name: 'Capacity & Racks', weight: 1.6, description: 'Place settings, rack flexibility' },
            { name: 'Cycle Options', weight: 1.3, description: 'Wash programs, sanitize, quick wash' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        exampleAlternatives: [
            { name: 'Bosch 800 Series', description: 'Quiet, premium build' },
            { name: 'KitchenAid Top Control', description: 'Powerful, adjustable racks' },
            { name: 'GE Profile', description: 'Smart features, good value' }
        ],
        tips: 'Under 45dB is considered quiet. Check if it fits standard cabinet openings.'
    },
    {
        id: 'vacuum-cleaner-comparison',
        name: 'Vacuum Cleaner Comparison',
        description: 'Compare vacuums for your cleaning needs',
        category: 'Home Appliances',
        icon: '🧹',
        isProductComparison: true,
        productCategory: 'vacuum cleaner',
        criteria: [
            { name: 'Suction Power', weight: 2.0, description: 'Cleaning effectiveness on different surfaces' },
            { name: 'Filtration', weight: 1.7, description: 'HEPA filter, allergen capture' },
            { name: 'Versatility', weight: 1.6, description: 'Attachments, carpet/hardwood, pet hair' },
            { name: 'Battery Life', weight: 1.5, description: 'Runtime for cordless models' },
            { name: 'Weight & Maneuverability', weight: 1.4, description: 'Ease of use, stairs capability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        exampleAlternatives: [
            { name: 'Dyson V15 Detect', description: 'Cordless, powerful, laser detection' },
            { name: 'Shark Navigator', description: 'Upright, good value, pet-friendly' },
            { name: 'Miele Complete C3', description: 'Canister, premium, quiet' }
        ],
        tips: 'Consider your home size and floor types. Cordless offers convenience but less runtime.'
    },
    {
        id: 'air-purifier-comparison',
        name: 'Air Purifier Comparison',
        description: 'Find the best air purifier for your space',
        category: 'Home Appliances',
        icon: '💨',
        isProductComparison: true,
        productCategory: 'air purifier',
        criteria: [
            { name: 'Filtration Quality', weight: 2.0, description: 'HEPA, activated carbon, particle capture' },
            { name: 'Room Coverage', weight: 1.8, description: 'Effective square footage, CADR rating' },
            { name: 'Noise Level', weight: 1.6, description: 'Sound at different fan speeds' },
            { name: 'Filter Cost', weight: 1.5, description: 'Replacement filter prices and frequency' },
            { name: 'Energy Consumption', weight: 1.3, description: 'Power usage for continuous operation' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial cost and ongoing expenses' }
        ],
        exampleAlternatives: [
            { name: 'Coway Airmega', description: 'Large rooms, smart features' },
            { name: 'Levoit Core 300', description: 'Compact, affordable, quiet' },
            { name: 'Blueair Blue Pure', description: 'Stylish design, efficient' }
        ],
        tips: 'Match CADR rating to your room size. Consider 24/7 operation costs.'
    },
    {
        id: 'coffee-maker-comparison',
        name: 'Coffee Maker Comparison',
        description: 'Find your perfect coffee brewing system',
        category: 'Home Appliances',
        icon: '☕',
        isProductComparison: true,
        productCategory: 'coffee maker',
        criteria: [
            { name: 'Coffee Quality', weight: 2.0, description: 'Brew temperature, extraction, taste' },
            { name: 'Convenience', weight: 1.7, description: 'Ease of use, programmable features' },
            { name: 'Capacity', weight: 1.5, description: 'Cup/carafe size, servings per brew' },
            { name: 'Speed', weight: 1.4, description: 'Brew time for full pot' },
            { name: 'Cleaning', weight: 1.3, description: 'Maintenance ease, dishwasher safe parts' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and durability' }
        ],
        exampleAlternatives: [
            { name: 'Breville Barista Express', description: 'Espresso, built-in grinder' },
            { name: 'Technivorm Moccamaster', description: 'Pour-over style, certified brewing' },
            { name: 'Keurig K-Elite', description: 'Single-serve, convenient, variety' }
        ],
        tips: 'Consider your daily coffee consumption and preferred brewing style.'
    },
    
    // ========================================
    // Fitness & Exercise Equipment Templates
    // ========================================
    {
        id: 'treadmill-comparison',
        name: 'Treadmill Comparison',
        description: 'Compare treadmills for home fitness',
        category: 'Fitness Equipment',
        icon: '🏃',
        isProductComparison: true,
        productCategory: 'treadmill',
        criteria: [
            { name: 'Motor Power', weight: 1.9, description: 'Continuous horsepower, smoothness' },
            { name: 'Running Surface', weight: 1.8, description: 'Belt size, cushioning quality' },
            { name: 'Build Quality', weight: 1.7, description: 'Frame stability, weight capacity, warranty' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline, speed range, connectivity' },
            { name: 'Footprint', weight: 1.3, description: 'Size, foldable, storage options' },
            { name: 'Value for Money', weight: 1.6, description: 'Price vs durability and features' }
        ],
        exampleAlternatives: [
            { name: 'NordicTrack Commercial', description: 'iFit integration, interactive training' },
            { name: 'Sole F80', description: 'Reliable, powerful motor, good warranty' },
            { name: 'ProForm Pro 2000', description: 'Budget-friendly, feature-rich' }
        ],
        tips: 'Test the running surface if possible. Ensure adequate room clearance around treadmill.'
    },
    {
        id: 'exercise-bike-comparison',
        name: 'Exercise Bike Comparison',
        description: 'Find the right stationary bike for home',
        category: 'Fitness Equipment',
        icon: '🚴',
        isProductComparison: true,
        productCategory: 'exercise bike',
        criteria: [
            { name: 'Ride Quality', weight: 2.0, description: 'Smoothness, resistance levels, flywheel weight' },
            { name: 'Comfort', weight: 1.8, description: 'Seat, handlebars, adjustability' },
            { name: 'Build Quality', weight: 1.6, description: 'Stability, durability, weight capacity' },
            { name: 'Features', weight: 1.5, description: 'Console, programs, connectivity, metrics' },
            { name: 'Footprint', weight: 1.3, description: 'Space required, easy to move' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to quality' }
        ],
        exampleAlternatives: [
            { name: 'Peloton Bike+', description: 'Premium, live classes, community' },
            { name: 'Schwinn IC4', description: 'Peloton alternative, great value' },
            { name: 'Echelon EX-5', description: 'Affordable, app connectivity' }
        ],
        tips: 'Consider upright vs recumbent based on fitness goals. Factor in subscription costs for apps.'
    },
    {
        id: 'rowing-machine-comparison',
        name: 'Rowing Machine Comparison',
        description: 'Compare rowing machines for full-body workouts',
        category: 'Fitness Equipment',
        icon: '🚣',
        isProductComparison: true,
        productCategory: 'rowing machine',
        criteria: [
            { name: 'Resistance Quality', weight: 2.0, description: 'Smoothness, resistance type (air/magnetic/water)' },
            { name: 'Build Quality', weight: 1.8, description: 'Frame durability, rail quality, weight capacity' },
            { name: 'Comfort', weight: 1.6, description: 'Seat, footrests, handle ergonomics' },
            { name: 'Monitor & Metrics', weight: 1.5, description: 'Display, workout tracking, connectivity' },
            { name: 'Storage', weight: 1.4, description: 'Foldability, vertical storage, footprint' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and features' }
        ],
        exampleAlternatives: [
            { name: 'Concept2 Model D', description: 'Industry standard, proven durability' },
            { name: 'WaterRower', description: 'Water resistance, beautiful design' },
            { name: 'Hydrow', description: 'Interactive screen, live rowing' }
        ],
        tips: 'Air resistance is more realistic, magnetic is quieter. Check rail length for your height.'
    },
    {
        id: 'fitness-tracker-comparison',
        name: 'Fitness Tracker Comparison',
        description: 'Compare fitness trackers and smart bands',
        category: 'Fitness Equipment',
        icon: '⌚',
        isProductComparison: true,
        productCategory: 'fitness tracker',
        criteria: [
            { name: 'Tracking Accuracy', weight: 2.0, description: 'Heart rate, steps, sleep, calories' },
            { name: 'Battery Life', weight: 1.8, description: 'Days of use per charge' },
            { name: 'Features', weight: 1.6, description: 'GPS, SpO2, stress, workout modes' },
            { name: 'App Quality', weight: 1.5, description: 'Data insights, goal setting, social features' },
            { name: 'Comfort & Design', weight: 1.4, description: 'Wearability, style, water resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and accuracy' }
        ],
        exampleAlternatives: [
            { name: 'Fitbit Charge 6', description: 'Comprehensive tracking, Google integration' },
            { name: 'Garmin Vivosmart 5', description: 'Advanced metrics, long battery' },
            { name: 'Whoop 4.0', description: 'Recovery focused, subscription model' }
        ],
        tips: 'Consider if you need GPS built-in or can use phone GPS. Check app compatibility.'
    },
    {
        id: 'yoga-mat-comparison',
        name: 'Yoga Mat Comparison',
        description: 'Find the perfect yoga mat for your practice',
        category: 'Fitness Equipment',
        icon: '🧘',
        isProductComparison: true,
        productCategory: 'yoga mat',
        criteria: [
            { name: 'Grip & Traction', weight: 2.0, description: 'Slip resistance, wet and dry performance' },
            { name: 'Cushioning', weight: 1.8, description: 'Thickness, joint protection, comfort' },
            { name: 'Material Quality', weight: 1.7, description: 'Durability, eco-friendly, non-toxic' },
            { name: 'Size & Portability', weight: 1.4, description: 'Dimensions, weight, easy to carry' },
            { name: 'Maintenance', weight: 1.3, description: 'Easy to clean, odor resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and quality' }
        ],
        exampleAlternatives: [
            { name: 'Manduka PRO', description: 'Premium, lifetime warranty, eco-friendly' },
            { name: 'Liforme', description: 'Superior grip, alignment markers' },
            { name: 'Gaiam Essentials', description: 'Budget-friendly, good for beginners' }
        ],
        tips: 'Thicker mats (6mm+) for joint support, thinner (3-4mm) for balance poses and travel.'
    },
    {
        id: 'home-gym-equipment-comparison',
        name: 'Home Gym Equipment',
        description: 'Compare weight sets and strength equipment',
        category: 'Fitness Equipment',
        icon: '🏋️',
        isProductComparison: true,
        productCategory: 'home gym',
        criteria: [
            { name: 'Weight Range', weight: 2.0, description: 'Min/max weight, adjustment increments' },
            { name: 'Build Quality', weight: 1.9, description: 'Durability, safety, weight capacity' },
            { name: 'Space Efficiency', weight: 1.7, description: 'Footprint, storage, compactness' },
            { name: 'Versatility', weight: 1.6, description: 'Exercise variety, attachments' },
            { name: 'Ease of Use', weight: 1.4, description: 'Weight changes, setup, adjustments' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per weight range and features' }
        ],
        exampleAlternatives: [
            { name: 'Bowflex SelectTech', description: 'Adjustable dumbbells, space-saving' },
            { name: 'PowerBlock Elite', description: 'Expandable weights, compact design' },
            { name: 'Ironmaster Quick-Lock', description: 'Heavy-duty, traditional feel' }
        ],
        tips: 'Plan for growth - buy equipment that can expand with your strength gains.'
    },
    
    // ========================================
    // General Decision Templates
    // ========================================
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
        category: template.productCategory || template.category,
        isProductComparison: template.isProductComparison || false,
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
