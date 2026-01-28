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
        lucideIcon: 'laptop',
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
        lucideIcon: 'smartphone',
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
        lucideIcon: 'headphones',
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
        lucideIcon: 'camera',
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
        lucideIcon: 'tablet',
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
        lucideIcon: 'watch',
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
        lucideIcon: 'refrigerator',
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
        lucideIcon: 'washing-machine',
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
        lucideIcon: 'circle-dot',
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
        lucideIcon: 'wind',
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
        lucideIcon: 'air-vent',
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
        lucideIcon: 'coffee',
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
        lucideIcon: 'footprints',
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
        lucideIcon: 'bike',
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
        id: 'elliptical-comparison',
        name: 'Elliptical Machine Comparison',
        description: 'Compare ellipticals for low-impact cardio',
        category: 'Fitness Equipment',
        icon: '⛷️',
        lucideIcon: 'circle-ellipsis',
        isProductComparison: true,
        productCategory: 'elliptical',
        criteria: [
            { name: 'Stride Length', weight: 2.0, description: 'Natural movement, adjustability' },
            { name: 'Resistance', weight: 1.8, description: 'Levels, smoothness, magnetic vs friction' },
            { name: 'Build Quality', weight: 1.7, description: 'Stability, weight capacity, durability' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline, console, connectivity' },
            { name: 'Joint Impact', weight: 1.6, description: 'Low-impact design, smooth motion' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and longevity' }
        ],
        exampleAlternatives: [
            { name: 'NordicTrack FS10i', description: 'Incline trainer, iFit enabled' },
            { name: 'Sole E35', description: 'Solid build, lifetime warranty' },
            { name: 'ProForm Carbon HIIT', description: 'Hybrid trainer, versatile' }
        ],
        tips: 'Test stride length for comfort. Consider front-drive vs rear-drive based on space.'
    },
    {
        id: 'rowing-machine-comparison',
        name: 'Rowing Machine Comparison',
        description: 'Compare rowing machines for full-body workouts',
        category: 'Fitness Equipment',
        icon: '🚣',
        lucideIcon: 'waves',
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
        lucideIcon: 'activity',
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
        lucideIcon: 'square',
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
        lucideIcon: 'dumbbell',
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
    // Additional Electronics & Tech Templates
    // ========================================
    {
        id: 'action-camera-comparison',
        name: 'Action Camera Comparison',
        description: 'Compare action cameras for adventure recording',
        category: 'Electronics',
        icon: '📹',
        lucideIcon: 'video',
        isProductComparison: true,
        productCategory: 'action camera',
        criteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/5K resolution, frame rates, stabilization' },
            { name: 'Durability', weight: 1.8, description: 'Waterproof rating, shock resistance, build quality' },
            { name: 'Battery Life', weight: 1.6, description: 'Recording time per battery' },
            { name: 'Features', weight: 1.5, description: 'Voice control, GPS, time-lapse, slow-mo' },
            { name: 'Ease of Use', weight: 1.3, description: 'Interface, mounting, connectivity' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features and quality' }
        ],
        exampleAlternatives: [
            { name: 'GoPro Hero 12', description: 'Industry leader, excellent stabilization' },
            { name: 'DJI Osmo Action 4', description: 'Great low-light, magnetic mounting' },
            { name: 'Insta360 X3', description: '360-degree capture, unique perspectives' }
        ],
        tips: 'Consider your primary activity - water sports need higher waterproof ratings, while general use may prioritize battery life.'
    },
    {
        id: 'mirrorless-camera-comparison',
        name: 'Mirrorless Camera Comparison',
        description: 'Compare mirrorless cameras for photography',
        category: 'Electronics',
        icon: '📸',
        lucideIcon: 'camera',
        isProductComparison: true,
        productCategory: 'mirrorless camera',
        criteria: [
            { name: 'Image Quality', weight: 2.0, description: 'Sensor size, resolution, dynamic range' },
            { name: 'Autofocus System', weight: 1.8, description: 'Speed, accuracy, eye/subject tracking' },
            { name: 'Video Capabilities', weight: 1.6, description: '4K/8K, frame rates, log profiles' },
            { name: 'Build & Ergonomics', weight: 1.4, description: 'Weather sealing, grip, controls' },
            { name: 'Lens Ecosystem', weight: 1.5, description: 'Available lenses, compatibility, cost' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        exampleAlternatives: [
            { name: 'Sony A7 IV', description: 'Versatile hybrid, excellent AF' },
            { name: 'Canon EOS R6 II', description: 'Fast shooting, great colors' },
            { name: 'Fujifilm X-T5', description: 'Classic design, film simulations' }
        ],
        tips: 'Invest in quality lenses - they often outlast camera bodies and significantly impact image quality.'
    },
    {
        id: 'drone-camera-comparison',
        name: 'Drone Camera Comparison',
        description: 'Compare camera drones for aerial photography',
        category: 'Electronics',
        icon: '🚁',
        lucideIcon: 'plane',
        isProductComparison: true,
        productCategory: 'drone camera',
        criteria: [
            { name: 'Camera Quality', weight: 2.0, description: 'Sensor size, resolution, gimbal stabilization' },
            { name: 'Flight Time', weight: 1.8, description: 'Minutes per battery charge' },
            { name: 'Range & Stability', weight: 1.7, description: 'Max distance, wind resistance, GPS' },
            { name: 'Safety Features', weight: 1.6, description: 'Obstacle avoidance, return home, geofencing' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, foldable design' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        exampleAlternatives: [
            { name: 'DJI Air 3', description: 'Excellent balance, dual cameras' },
            { name: 'DJI Mini 4 Pro', description: 'Ultra-portable, sub-250g' },
            { name: 'Autel EVO Lite+', description: 'Great camera, competitive price' }
        ],
        tips: 'Check local drone regulations. Sub-250g drones often have fewer restrictions.'
    },
    {
        id: 'gaming-console-comparison',
        name: 'Gaming Console Comparison',
        description: 'Compare gaming consoles for home entertainment',
        category: 'Electronics',
        icon: '🎮',
        lucideIcon: 'gamepad-2',
        isProductComparison: true,
        productCategory: 'gaming console',
        criteria: [
            { name: 'Exclusive Games', weight: 2.0, description: 'First-party titles and exclusivity' },
            { name: 'Performance', weight: 1.8, description: 'Graphics, frame rates, loading times' },
            { name: 'Game Library', weight: 1.7, description: 'Available titles, backwards compatibility' },
            { name: 'Online Services', weight: 1.5, description: 'Multiplayer, subscriptions, features' },
            { name: 'Media Features', weight: 1.3, description: 'Streaming apps, 4K Blu-ray, media capabilities' },
            { name: 'Value for Money', weight: 1.5, description: 'Console price, game costs, subscriptions' }
        ],
        exampleAlternatives: [
            { name: 'PlayStation 5', description: 'Exclusive titles, DualSense controller' },
            { name: 'Xbox Series X', description: 'Game Pass, powerful hardware' },
            { name: 'Nintendo Switch', description: 'Portable/docked, unique games' }
        ],
        tips: 'Consider which exclusive games matter most to you and where your friends play online.'
    },
    {
        id: 'gaming-headset-comparison',
        name: 'Gaming Headset Comparison',
        description: 'Compare gaming headsets for immersive play',
        category: 'Electronics',
        icon: '🎧',
        lucideIcon: 'headphones',
        isProductComparison: true,
        productCategory: 'gaming headset',
        criteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, positional accuracy, bass' },
            { name: 'Microphone Quality', weight: 1.8, description: 'Voice clarity, noise cancellation' },
            { name: 'Comfort', weight: 1.7, description: 'Long-session wearability, weight, padding' },
            { name: 'Compatibility', weight: 1.5, description: 'PC, console, wireless options' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, materials, adjustability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and quality' }
        ],
        exampleAlternatives: [
            { name: 'SteelSeries Arctis Nova Pro', description: 'Premium wireless, swappable batteries' },
            { name: 'HyperX Cloud III', description: 'Great sound, comfortable, affordable' },
            { name: 'Razer BlackShark V2', description: 'THX spatial audio, tournament-grade' }
        ],
        tips: 'Try before buying if possible - comfort during long sessions is crucial for gaming.'
    },
    {
        id: 'gaming-laptop-comparison',
        name: 'Gaming Laptop Comparison',
        description: 'Compare gaming laptops for portable performance',
        category: 'Electronics',
        icon: '💻',
        lucideIcon: 'laptop',
        isProductComparison: true,
        productCategory: 'gaming laptop',
        criteria: [
            { name: 'GPU Performance', weight: 2.0, description: 'Graphics card, gaming capability' },
            { name: 'Display Quality', weight: 1.8, description: 'Refresh rate, resolution, color accuracy' },
            { name: 'CPU Performance', weight: 1.7, description: 'Processor for gaming and multitasking' },
            { name: 'Cooling System', weight: 1.6, description: 'Thermal management, noise levels' },
            { name: 'Battery Life', weight: 1.3, description: 'Non-gaming usage duration' },
            { name: 'Build & Portability', weight: 1.4, description: 'Weight, thickness, build quality' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs gaming performance' }
        ],
        exampleAlternatives: [
            { name: 'ASUS ROG Zephyrus G14', description: 'Compact, powerful, good battery' },
            { name: 'Razer Blade 15', description: 'Premium build, balanced performance' },
            { name: 'Lenovo Legion Pro 7i', description: 'High performance, great cooling' }
        ],
        tips: 'Consider if you need portability or maximum performance - thin gaming laptops sacrifice some power for mobility.'
    },
    {
        id: 'gaming-monitor-comparison',
        name: 'Gaming Monitor Comparison',
        description: 'Compare gaming monitors for competitive play',
        category: 'Electronics',
        icon: '🖥️',
        lucideIcon: 'monitor',
        isProductComparison: true,
        productCategory: 'gaming monitor',
        criteria: [
            { name: 'Refresh Rate', weight: 2.0, description: 'Hz for smooth gameplay (144Hz, 240Hz, etc)' },
            { name: 'Response Time', weight: 1.8, description: 'Input lag and pixel response' },
            { name: 'Display Quality', weight: 1.7, description: 'Resolution, panel type, color accuracy' },
            { name: 'Adaptive Sync', weight: 1.5, description: 'G-Sync, FreeSync support' },
            { name: 'Size & Ergonomics', weight: 1.4, description: 'Screen size, adjustability, curved' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs specs and features' }
        ],
        exampleAlternatives: [
            { name: 'ASUS ROG Swift PG27AQN', description: '1440p, 360Hz, fast response' },
            { name: 'LG UltraGear 27GP850', description: 'Great balance, 1440p 165Hz' },
            { name: 'Samsung Odyssey G7', description: 'Curved, immersive, good value' }
        ],
        tips: 'Match refresh rate to your GPU capability - no point in 240Hz if your PC can\'t push those frame rates.'
    },
    {
        id: 'mechanical-keyboard-comparison',
        name: 'Mechanical Keyboard Comparison',
        description: 'Compare mechanical keyboards for typing and gaming',
        category: 'Electronics',
        icon: '⌨️',
        lucideIcon: 'keyboard',
        isProductComparison: true,
        productCategory: 'mechanical keyboard',
        criteria: [
            { name: 'Switch Type', weight: 2.0, description: 'Tactile, linear, clicky feel and sound' },
            { name: 'Build Quality', weight: 1.8, description: 'Materials, stability, durability' },
            { name: 'Features', weight: 1.6, description: 'Hot-swap, RGB, programmability, wireless' },
            { name: 'Typing Experience', weight: 1.7, description: 'Comfort, layout, keycap quality' },
            { name: 'Customization', weight: 1.4, description: 'Software, macros, key remapping' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        exampleAlternatives: [
            { name: 'Keychron Q1', description: 'Premium build, hot-swappable, customizable' },
            { name: 'Ducky One 3', description: 'Solid build, great switches, no-frills' },
            { name: 'Logitech MX Mechanical', description: 'Wireless, low-profile, productivity-focused' }
        ],
        tips: 'Try different switch types before buying - personal preference varies significantly on feel and sound.'
    },
    {
        id: 'wireless-earbuds-comparison',
        name: 'Wireless Earbuds Comparison',
        description: 'Compare true wireless earbuds for on-the-go',
        category: 'Electronics',
        icon: '🎧',
        lucideIcon: 'headphones',
        isProductComparison: true,
        productCategory: 'wireless earbuds',
        criteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, balance' },
            { name: 'Active Noise Cancellation', weight: 1.8, description: 'ANC effectiveness, transparency mode' },
            { name: 'Battery Life', weight: 1.7, description: 'Earbuds + case total hours' },
            { name: 'Fit & Comfort', weight: 1.6, description: 'Secure fit, ear tip options, comfort' },
            { name: 'Call Quality', weight: 1.4, description: 'Microphone clarity for calls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        exampleAlternatives: [
            { name: 'AirPods Pro 2', description: 'Apple ecosystem, excellent ANC' },
            { name: 'Sony WF-1000XM5', description: 'Best ANC, superior sound' },
            { name: 'Samsung Galaxy Buds 2 Pro', description: 'Great for Android, balanced features' }
        ],
        tips: 'Consider your phone ecosystem - some earbuds work best with their native platform.'
    },
    {
        id: 'portable-bluetooth-speaker-comparison',
        name: 'Portable Bluetooth Speaker Comparison',
        description: 'Compare portable speakers for outdoor audio',
        category: 'Electronics',
        icon: '🔊',
        lucideIcon: 'speaker',
        isProductComparison: true,
        productCategory: 'portable bluetooth speaker',
        criteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, volume, distortion' },
            { name: 'Battery Life', weight: 1.8, description: 'Hours of playback per charge' },
            { name: 'Durability', weight: 1.7, description: 'Waterproof rating, drop resistance' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, carrying options' },
            { name: 'Connectivity', weight: 1.3, description: 'Bluetooth range, pairing, multi-device' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs sound and features' }
        ],
        exampleAlternatives: [
            { name: 'JBL Charge 5', description: 'Great sound, long battery, durable' },
            { name: 'Ultimate Ears BOOM 3', description: '360° sound, rugged, fun colors' },
            { name: 'Sonos Roam', description: 'Smart features, WiFi + Bluetooth' }
        ],
        tips: 'Check IPX ratings for water resistance - IPX7 means fully submersible for pool/beach use.'
    },
    {
        id: 'soundbar-comparison',
        name: 'Soundbar Comparison',
        description: 'Compare soundbars for home theater audio',
        category: 'Electronics',
        icon: '🔊',
        lucideIcon: 'speaker',
        isProductComparison: true,
        productCategory: 'soundbar',
        criteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Clarity, bass, surround sound quality' },
            { name: 'Subwoofer', weight: 1.8, description: 'Wireless sub included, bass performance' },
            { name: 'Connectivity', weight: 1.6, description: 'HDMI eARC, optical, Bluetooth, WiFi' },
            { name: 'Dolby Atmos Support', weight: 1.5, description: 'Height channels, immersive audio' },
            { name: 'Ease of Setup', weight: 1.3, description: 'Installation, calibration, controls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        exampleAlternatives: [
            { name: 'Sonos Arc', description: 'Premium, Dolby Atmos, smart features' },
            { name: 'Samsung HW-Q990C', description: 'Full surround, wireless rears included' },
            { name: 'Vizio M-Series', description: 'Budget-friendly, solid performance' }
        ],
        tips: 'Measure your TV size - soundbars should be similar width to your TV for balanced aesthetics.'
    },
    {
        id: 'external-hard-drive-comparison',
        name: 'External Hard Drive Comparison',
        description: 'Compare external storage for backups and data',
        category: 'Electronics',
        icon: '💾',
        lucideIcon: 'hard-drive',
        isProductComparison: true,
        productCategory: 'external hard drive',
        criteria: [
            { name: 'Storage Capacity', weight: 2.0, description: 'Total storage space (TB)' },
            { name: 'Speed', weight: 1.8, description: 'Transfer rates, SSD vs HDD' },
            { name: 'Durability', weight: 1.6, description: 'Shock resistance, build quality, warranty' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, bus-powered' },
            { name: 'Compatibility', weight: 1.3, description: 'USB-C, USB-A, Mac/PC formatting' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per TB' }
        ],
        exampleAlternatives: [
            { name: 'Samsung T7 SSD', description: 'Fast, portable, reliable' },
            { name: 'WD My Passport', description: 'HDD, high capacity, affordable' },
            { name: 'SanDisk Extreme SSD', description: 'Rugged, fast, weather-resistant' }
        ],
        tips: 'SSD for speed and portability, HDD for maximum capacity at lower cost per TB.'
    },
    {
        id: 'power-bank-comparison',
        name: 'Power Bank Comparison',
        description: 'Compare portable chargers for mobile devices',
        category: 'Electronics',
        icon: '🔋',
        lucideIcon: 'battery-charging',
        isProductComparison: true,
        productCategory: 'power bank',
        criteria: [
            { name: 'Capacity', weight: 2.0, description: 'mAh rating, device charges per bank' },
            { name: 'Charging Speed', weight: 1.8, description: 'Fast charging, PD, QC support' },
            { name: 'Port Selection', weight: 1.6, description: 'USB-C, USB-A, wireless charging' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, pocketability' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, safety features' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to capacity and speed' }
        ],
        exampleAlternatives: [
            { name: 'Anker PowerCore', description: 'Reliable, fast charging, good capacity' },
            { name: 'RAVPower 30000mAh', description: 'High capacity, multiple ports' },
            { name: 'Belkin BoostCharge', description: 'Premium build, wireless charging' }
        ],
        tips: 'Consider TSA limits for flights - power banks over 100Wh (about 27,000mAh) require special approval.'
    },
    {
        id: 'wireless-router-comparison',
        name: 'Wireless Router Comparison',
        description: 'Compare WiFi routers for home networking',
        category: 'Electronics',
        icon: '📡',
        lucideIcon: 'wifi',
        isProductComparison: true,
        productCategory: 'wireless router',
        criteria: [
            { name: 'WiFi Speed', weight: 2.0, description: 'WiFi 6/6E/7, max speeds, bands' },
            { name: 'Coverage Range', weight: 1.8, description: 'Square footage, multi-story capability' },
            { name: 'Device Capacity', weight: 1.6, description: 'Simultaneous connected devices' },
            { name: 'Features', weight: 1.5, description: 'QoS, parental controls, VPN, guest network' },
            { name: 'Ports', weight: 1.3, description: 'Gigabit ethernet, USB ports' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        exampleAlternatives: [
            { name: 'ASUS RT-AX86U', description: 'WiFi 6, gaming-focused, powerful' },
            { name: 'TP-Link Archer AX90', description: 'Tri-band, great coverage, affordable' },
            { name: 'Netgear Nighthawk AXE11000', description: 'WiFi 6E, premium performance' }
        ],
        tips: 'Consider mesh systems for larger homes or difficult layouts - single routers work best for smaller spaces.'
    },
    {
        id: 'mesh-wifi-comparison',
        name: 'Mesh WiFi System Comparison',
        description: 'Compare mesh networks for whole-home coverage',
        category: 'Electronics',
        icon: '📡',
        lucideIcon: 'wifi',
        isProductComparison: true,
        productCategory: 'mesh wifi',
        criteria: [
            { name: 'Coverage Area', weight: 2.0, description: 'Square footage per node, scalability' },
            { name: 'Speed & Performance', weight: 1.8, description: 'WiFi 6/6E, throughput, latency' },
            { name: 'Ease of Setup', weight: 1.7, description: 'App control, installation simplicity' },
            { name: 'Node Count & Placement', weight: 1.6, description: 'Included nodes, expansion options' },
            { name: 'Features', weight: 1.4, description: 'Smart home integration, parental controls, security' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs coverage and performance' }
        ],
        exampleAlternatives: [
            { name: 'Eero Pro 6E', description: 'WiFi 6E, Amazon integration, simple' },
            { name: 'Google Nest WiFi Pro', description: 'Clean design, easy setup, reliable' },
            { name: 'TP-Link Deco XE75', description: 'Affordable WiFi 6E, good performance' }
        ],
        tips: 'Start with a 2-pack for most homes, add nodes as needed - mesh systems are designed to expand.'
    },
    
    // ========================================
    // Additional Home Appliances & Kitchen Templates
    // ========================================
    {
        id: 'air-fryer-comparison',
        name: 'Air Fryer Comparison',
        description: 'Compare air fryers for healthier cooking',
        category: 'Home Appliances',
        icon: '🍟',
        lucideIcon: 'flame',
        isProductComparison: true,
        productCategory: 'air fryer',
        criteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Even cooking, crispiness, temperature accuracy' },
            { name: 'Capacity', weight: 1.8, description: 'Basket size, family servings' },
            { name: 'Ease of Use', weight: 1.6, description: 'Controls, presets, digital display' },
            { name: 'Cleaning', weight: 1.5, description: 'Dishwasher safe, non-stick coating' },
            { name: 'Build Quality', weight: 1.4, description: 'Materials, durability, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and features' }
        ],
        exampleAlternatives: [
            { name: 'Ninja Air Fryer Max XL', description: 'Large capacity, versatile, even cooking' },
            { name: 'Cosori Pro II', description: 'Smart features, quiet, great results' },
            { name: 'Instant Vortex Plus', description: 'Multi-function, rotisserie, affordable' }
        ],
        tips: 'Consider capacity - a 5-6 quart model works for 2-3 people, while 8+ quart is better for families.'
    },
    {
        id: 'blender-comparison',
        name: 'Blender Comparison',
        description: 'Compare blenders for smoothies and food prep',
        category: 'Home Appliances',
        icon: '🥤',
        lucideIcon: 'cup-soda',
        isProductComparison: true,
        productCategory: 'blender',
        criteria: [
            { name: 'Blending Power', weight: 2.0, description: 'Motor strength, crushing ice, smooth results' },
            { name: 'Versatility', weight: 1.7, description: 'Functions, speeds, food processing capability' },
            { name: 'Container Quality', weight: 1.6, description: 'Size, material, measurement marks' },
            { name: 'Ease of Cleaning', weight: 1.5, description: 'Self-clean, dishwasher safe, blade access' },
            { name: 'Build Quality', weight: 1.5, description: 'Durability, materials, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        exampleAlternatives: [
            { name: 'Vitamix 5200', description: 'Professional power, lifetime durability' },
            { name: 'Ninja Professional Plus', description: 'Great value, powerful, versatile' },
            { name: 'Blendtec Classic 575', description: 'Powerful motor, pre-programmed cycles' }
        ],
        tips: 'High-powered blenders (1000W+) handle tough ingredients better but cost more - assess your actual blending needs.'
    },
    {
        id: 'espresso-machine-comparison',
        name: 'Espresso Machine Comparison',
        description: 'Compare espresso machines for home baristas',
        category: 'Home Appliances',
        icon: '☕',
        lucideIcon: 'coffee',
        isProductComparison: true,
        productCategory: 'espresso machine',
        criteria: [
            { name: 'Espresso Quality', weight: 2.0, description: 'Extraction, crema, temperature stability' },
            { name: 'Steam Wand', weight: 1.8, description: 'Milk frothing capability, power, control' },
            { name: 'Ease of Use', weight: 1.6, description: 'Learning curve, consistency, automation' },
            { name: 'Build Quality', weight: 1.5, description: 'Materials, boiler type, durability' },
            { name: 'Maintenance', weight: 1.4, description: 'Cleaning, descaling, part replacement' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and features' }
        ],
        exampleAlternatives: [
            { name: 'Breville Barista Express', description: 'Built-in grinder, great for beginners' },
            { name: 'Gaggia Classic Pro', description: 'Traditional, reliable, modifiable' },
            { name: 'De\'Longhi La Specialista', description: 'Smart grinding, sensor technology' }
        ],
        tips: 'Quality grinder is as important as the machine - consider a separate grinder for best results.'
    },
    {
        id: 'instant-pot-comparison',
        name: 'Instant Pot Comparison',
        description: 'Compare pressure cookers and multi-cookers',
        category: 'Home Appliances',
        icon: '🍲',
        lucideIcon: 'cooking-pot',
        isProductComparison: true,
        productCategory: 'instant pot',
        criteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Pressure cooking, even heating, results' },
            { name: 'Capacity', weight: 1.8, description: 'Quart size, family servings' },
            { name: 'Functions', weight: 1.7, description: 'Pressure, slow cook, sauté, yogurt, etc' },
            { name: 'Ease of Use', weight: 1.6, description: 'Controls, presets, learning curve' },
            { name: 'Safety Features', weight: 1.5, description: 'Pressure release, lid locking, sensors' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and versatility' }
        ],
        exampleAlternatives: [
            { name: 'Instant Pot Duo Plus', description: 'Classic, reliable, 9-in-1 functions' },
            { name: 'Ninja Foodi', description: 'Pressure cook + air crisp lid' },
            { name: 'Crock-Pot Express', description: 'Affordable, easy to use, solid performer' }
        ],
        tips: '6-quart size suits most families, while 8-quart is ideal for batch cooking or large gatherings.'
    },
    {
        id: 'water-filter-comparison',
        name: 'Water Filter Comparison',
        description: 'Compare water filtration systems for home',
        category: 'Home Appliances',
        icon: '💧',
        lucideIcon: 'droplet',
        isProductComparison: true,
        productCategory: 'water filter',
        criteria: [
            { name: 'Filtration Quality', weight: 2.0, description: 'Contaminants removed, certifications' },
            { name: 'Filter Lifespan', weight: 1.8, description: 'Gallons per filter, replacement frequency' },
            { name: 'Flow Rate', weight: 1.6, description: 'Water dispensing speed' },
            { name: 'Installation', weight: 1.4, description: 'Setup complexity, space requirements' },
            { name: 'Ongoing Costs', weight: 1.6, description: 'Filter replacement prices' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial + ongoing costs vs quality' }
        ],
        exampleAlternatives: [
            { name: 'Brita Large Pitcher', description: 'Simple, affordable, effective' },
            { name: 'APEC RO System', description: 'Under-sink, reverse osmosis, thorough' },
            { name: 'Berkey Water Filter', description: 'Gravity-fed, portable, long-lasting' }
        ],
        tips: 'Test your tap water first to understand what contaminants you need to filter - not all filters remove everything.'
    },
    {
        id: 'humidifier-comparison',
        name: 'Humidifier Comparison',
        description: 'Compare humidifiers for indoor air quality',
        category: 'Home Appliances',
        icon: '💨',
        lucideIcon: 'droplets',
        isProductComparison: true,
        productCategory: 'humidifier',
        criteria: [
            { name: 'Humidification Capacity', weight: 2.0, description: 'Room size coverage, output rate' },
            { name: 'Run Time', weight: 1.8, description: 'Tank size, hours per fill' },
            { name: 'Ease of Cleaning', weight: 1.7, description: 'Tank access, mold prevention, maintenance' },
            { name: 'Noise Level', weight: 1.6, description: 'Quiet operation for bedrooms' },
            { name: 'Features', weight: 1.4, description: 'Humidistat, auto-shutoff, timer, warm/cool mist' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and features' }
        ],
        exampleAlternatives: [
            { name: 'Levoit LV600S', description: 'Smart controls, hybrid mist, large capacity' },
            { name: 'Honeywell HCM-350', description: 'Germ-free, easy cleaning, reliable' },
            { name: 'Pure Enrichment MistAire', description: 'Compact, affordable, quiet' }
        ],
        tips: 'Clean humidifiers weekly to prevent mold - consider models with antimicrobial features for easier maintenance.'
    },
    {
        id: 'robot-vacuum-comparison',
        name: 'Robot Vacuum Comparison',
        description: 'Compare robot vacuums for automated cleaning',
        category: 'Home Appliances',
        icon: '🤖',
        lucideIcon: 'bot',
        isProductComparison: true,
        productCategory: 'robot vacuum',
        criteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Suction, carpet/hardwood, edge cleaning' },
            { name: 'Navigation', weight: 1.8, description: 'Mapping, obstacle avoidance, efficiency' },
            { name: 'Battery Life', weight: 1.6, description: 'Runtime, recharge and resume' },
            { name: 'Smart Features', weight: 1.5, description: 'App control, scheduling, room selection' },
            { name: 'Maintenance', weight: 1.4, description: 'Self-emptying, filter cleaning, brush tangles' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        exampleAlternatives: [
            { name: 'Roborock S8 Pro Ultra', description: 'Self-wash mop, powerful, smart' },
            { name: 'iRobot Roomba j7+', description: 'Obstacle avoidance, self-emptying' },
            { name: 'Eufy RoboVac G30', description: 'Budget-friendly, good performance' }
        ],
        tips: 'Self-emptying bases add convenience but increase cost - consider if pets or high-traffic areas make it worthwhile.'
    },
    {
        id: 'cordless-vacuum-comparison',
        name: 'Cordless Vacuum Comparison',
        description: 'Compare cordless stick vacuums for convenience',
        category: 'Home Appliances',
        icon: '🧹',
        lucideIcon: 'wind',
        isProductComparison: true,
        productCategory: 'cordless vacuum',
        criteria: [
            { name: 'Suction Power', weight: 2.0, description: 'Cleaning effectiveness on various surfaces' },
            { name: 'Battery Life', weight: 1.8, description: 'Runtime on different power modes' },
            { name: 'Weight & Ergonomics', weight: 1.6, description: 'Easy handling, balance, maneuverability' },
            { name: 'Attachments', weight: 1.5, description: 'Tools for furniture, crevices, pet hair' },
            { name: 'Bin Capacity', weight: 1.3, description: 'Dust cup size, emptying ease' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        exampleAlternatives: [
            { name: 'Dyson V15 Detect', description: 'Powerful, laser detection, LCD screen' },
            { name: 'Shark Vertex', description: 'DuoClean, self-cleaning brush, affordable' },
            { name: 'Tineco Pure One S12', description: 'Smart suction, good value, lightweight' }
        ],
        tips: 'Test the weight - holding it above your head for curtains or high shelves reveals true ergonomic comfort.'
    },
    {
        id: 'printer-comparison',
        name: 'Printer Comparison',
        description: 'Compare printers for home and office use',
        category: 'Electronics',
        icon: '🖨️',
        lucideIcon: 'printer',
        isProductComparison: true,
        productCategory: 'printer',
        criteria: [
            { name: 'Print Quality', weight: 2.0, description: 'Text sharpness, photo quality, color accuracy' },
            { name: 'Print Speed', weight: 1.7, description: 'Pages per minute for text and photos' },
            { name: 'Cost Per Page', weight: 1.8, description: 'Ink/toner costs, cartridge yield' },
            { name: 'Features', weight: 1.5, description: 'Duplex, scan, copy, wireless, mobile printing' },
            { name: 'Reliability', weight: 1.6, description: 'Duty cycle, build quality, paper handling' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial cost + long-term ink costs' }
        ],
        exampleAlternatives: [
            { name: 'HP OfficeJet Pro', description: 'Inkjet, low cost per page, all-in-one' },
            { name: 'Brother HL-L2395DW', description: 'Laser, fast, reliable, monochrome' },
            { name: 'Epson EcoTank', description: 'Refillable ink tanks, very low running cost' }
        ],
        tips: 'Calculate long-term ink costs - cheap printers often have expensive cartridges. EcoTank models cost more upfront but save money over time.'
    },
    {
        id: 'smart-thermostat-comparison',
        name: 'Smart Thermostat Comparison',
        description: 'Compare smart thermostats for energy savings',
        category: 'Home Appliances',
        icon: '🌡️',
        lucideIcon: 'thermometer',
        isProductComparison: true,
        productCategory: 'smart thermostat',
        criteria: [
            { name: 'Energy Savings', weight: 2.0, description: 'Learning algorithms, scheduling, efficiency' },
            { name: 'Smart Features', weight: 1.8, description: 'Remote control, geofencing, voice assistants' },
            { name: 'Ease of Installation', weight: 1.6, description: 'DIY-friendly, C-wire requirement, compatibility' },
            { name: 'User Interface', weight: 1.5, description: 'Display quality, app usability, controls' },
            { name: 'Compatibility', weight: 1.5, description: 'HVAC systems, multi-zone, sensors' },
            { name: 'Value for Money', weight: 1.4, description: 'Price vs features and savings' }
        ],
        exampleAlternatives: [
            { name: 'Nest Learning Thermostat', description: 'Auto-learning, beautiful design, Google integration' },
            { name: 'Ecobee SmartThermostat', description: 'Room sensors included, great features' },
            { name: 'Honeywell Home T9', description: 'Reliable, smart room sensors, good value' }
        ],
        tips: 'Check HVAC compatibility before buying - some systems require a C-wire or adapter for smart thermostats.'
    },
    {
        id: 'smart-lock-comparison',
        name: 'Smart Lock Comparison',
        description: 'Compare smart locks for keyless entry',
        category: 'Home Appliances',
        icon: '🔐',
        lucideIcon: 'lock',
        isProductComparison: true,
        productCategory: 'smart lock',
        criteria: [
            { name: 'Security', weight: 2.0, description: 'Lock mechanism, encryption, certifications' },
            { name: 'Access Methods', weight: 1.8, description: 'Keypad, fingerprint, app, voice, key backup' },
            { name: 'Smart Integration', weight: 1.6, description: 'HomeKit, Alexa, Google, notifications' },
            { name: 'Installation', weight: 1.5, description: 'DIY-friendly, fits existing deadbolt' },
            { name: 'Battery Life', weight: 1.4, description: 'Months per battery set, low battery alerts' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and security' }
        ],
        exampleAlternatives: [
            { name: 'August WiFi Smart Lock', description: 'Easy install, works with existing deadbolt' },
            { name: 'Yale Assure Lock 2', description: 'Multiple modules, keypad, reliable' },
            { name: 'Schlage Encode Plus', description: 'Built-in WiFi, Apple Home Key, secure' }
        ],
        tips: 'Measure your door and deadbolt before buying - not all smart locks fit all doors and deadbolt configurations.'
    },
    {
        id: 'video-doorbell-comparison',
        name: 'Video Doorbell Comparison',
        description: 'Compare smart video doorbells for security',
        category: 'Home Appliances',
        icon: '🚪',
        lucideIcon: 'bell-electric',
        isProductComparison: true,
        productCategory: 'video doorbell',
        criteria: [
            { name: 'Video Quality', weight: 2.0, description: 'Resolution, HDR, night vision, field of view' },
            { name: 'Smart Features', weight: 1.8, description: 'Person detection, packages, two-way audio' },
            { name: 'Storage Options', weight: 1.6, description: 'Cloud subscription, local storage, cost' },
            { name: 'Power Source', weight: 1.5, description: 'Wired, battery, solar, charging frequency' },
            { name: 'Integration', weight: 1.4, description: 'Smart home ecosystems, voice assistants' },
            { name: 'Value for Money', weight: 1.5, description: 'Device + subscription costs' }
        ],
        exampleAlternatives: [
            { name: 'Ring Video Doorbell Pro 2', description: 'Radar motion, 3D motion, head-to-toe HD' },
            { name: 'Nest Doorbell (Wired)', description: 'Continuous recording, familiar faces, Google' },
            { name: 'Arlo Essential', description: 'No subscription needed for basics, square view' }
        ],
        tips: 'Factor in subscription costs - some require monthly fees for video storage and advanced features.'
    },
    
    // ========================================
    // Additional Fitness, Health & Office Templates
    // ========================================
    {
        id: 'adjustable-dumbbell-comparison',
        name: 'Adjustable Dumbbell Comparison',
        description: 'Compare adjustable dumbbells for home workouts',
        category: 'Fitness Equipment',
        icon: '🏋️',
        lucideIcon: 'dumbbell',
        isProductComparison: true,
        productCategory: 'adjustable dumbbell',
        criteria: [
            { name: 'Weight Range', weight: 2.0, description: 'Min to max weight per dumbbell' },
            { name: 'Adjustment System', weight: 1.8, description: 'Speed and ease of weight changes' },
            { name: 'Build Quality', weight: 1.7, description: 'Durability, materials, stability' },
            { name: 'Space Efficiency', weight: 1.6, description: 'Footprint, storage base design' },
            { name: 'Grip & Comfort', weight: 1.5, description: 'Handle ergonomics, balance when lifting' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per weight range' }
        ],
        exampleAlternatives: [
            { name: 'Bowflex SelectTech 552', description: 'Dial system, 5-52.5lbs, space-saving' },
            { name: 'PowerBlock Elite', description: 'Expandable, compact, quick changes' },
            { name: 'Ironmaster Quick-Lock', description: 'Heavy-duty, traditional feel, expandable' }
        ],
        tips: 'Consider max weight for future growth - look for expandable systems if you plan to increase strength significantly.'
    },
    {
        id: 'blood-pressure-monitor-comparison',
        name: 'Blood Pressure Monitor Comparison',
        description: 'Compare home blood pressure monitors',
        category: 'Health & Wellness',
        icon: '🩺',
        lucideIcon: 'heart-pulse',
        isProductComparison: true,
        productCategory: 'blood pressure monitor',
        criteria: [
            { name: 'Accuracy', weight: 2.0, description: 'Clinical validation, consistent readings' },
            { name: 'Ease of Use', weight: 1.8, description: 'Simple operation, cuff application, display' },
            { name: 'Cuff Fit', weight: 1.7, description: 'Adjustable range, comfortable, proper sizing' },
            { name: 'Features', weight: 1.5, description: 'Memory, averaging, irregular heartbeat detection' },
            { name: 'Connectivity', weight: 1.3, description: 'App sync, data tracking, sharing' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs accuracy and features' }
        ],
        exampleAlternatives: [
            { name: 'Omron Platinum', description: 'Bluetooth, accurate, easy to use' },
            { name: 'Withings BPM Connect', description: 'Compact, app-based, portable' },
            { name: 'Greater Goods BP Monitor', description: 'Affordable, accurate, simple' }
        ],
        tips: 'Look for validated devices (check AHA or ESH lists) - accuracy is more important than fancy features.'
    },
    {
        id: 'protein-powder-comparison',
        name: 'Protein Powder Comparison',
        description: 'Compare protein supplements for fitness goals',
        category: 'Health & Wellness',
        icon: '💪',
        lucideIcon: 'package',
        isProductComparison: true,
        productCategory: 'protein powder',
        criteria: [
            { name: 'Protein Quality', weight: 2.0, description: 'Protein per serving, amino acid profile, bioavailability' },
            { name: 'Taste & Mixability', weight: 1.8, description: 'Flavor quality, texture, blending ease' },
            { name: 'Ingredients', weight: 1.7, description: 'Clean label, artificial additives, allergens' },
            { name: 'Protein Type', weight: 1.6, description: 'Whey, casein, plant-based, isolate vs concentrate' },
            { name: 'Certifications', weight: 1.4, description: 'Third-party testing, NSF, Informed Sport' },
            { name: 'Value for Money', weight: 1.5, description: 'Cost per serving of protein' }
        ],
        exampleAlternatives: [
            { name: 'Optimum Nutrition Gold Standard', description: 'Whey isolate, trusted, great taste' },
            { name: 'Orgain Organic Plant Protein', description: 'Vegan, clean ingredients, smooth' },
            { name: 'Dymatize ISO100', description: 'Fast-absorbing isolate, low carb' }
        ],
        tips: 'Check protein per serving, not per scoop - serving sizes vary. Calculate cost per gram of protein for true value.'
    },
    {
        id: 'running-shoe-comparison',
        name: 'Running Shoe Comparison',
        description: 'Compare running shoes for your stride',
        category: 'Fitness Equipment',
        icon: '👟',
        lucideIcon: 'footprints',
        isProductComparison: true,
        productCategory: 'running shoe',
        criteria: [
            { name: 'Cushioning & Support', weight: 2.0, description: 'Impact absorption, arch support, stability' },
            { name: 'Fit & Comfort', weight: 1.9, description: 'True to size, breathability, toe box width' },
            { name: 'Durability', weight: 1.7, description: 'Outsole wear, upper quality, expected mileage' },
            { name: 'Weight', weight: 1.5, description: 'Lightness for speed vs cushioning' },
            { name: 'Terrain Suitability', weight: 1.4, description: 'Road, trail, track, treadmill' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and performance' }
        ],
        exampleAlternatives: [
            { name: 'Nike Pegasus 40', description: 'Versatile, responsive, daily trainer' },
            { name: 'Brooks Ghost 15', description: 'Neutral, cushioned, reliable' },
            { name: 'Hoka Clifton 9', description: 'Maximum cushioning, lightweight' }
        ],
        tips: 'Get fitted at a running store for gait analysis - proper shoe type (neutral, stability, motion control) prevents injury.'
    },
    {
        id: 'standing-desk-comparison',
        name: 'Standing Desk Comparison',
        description: 'Compare adjustable standing desks for ergonomics',
        category: 'Office',
        icon: '🖥️',
        lucideIcon: 'monitor-up',
        isProductComparison: true,
        productCategory: 'standing desk',
        criteria: [
            { name: 'Stability', weight: 2.0, description: 'Wobble at full height, weight capacity' },
            { name: 'Height Range', weight: 1.8, description: 'Min/max height adjustment, suitable for your height' },
            { name: 'Motor Quality', weight: 1.7, description: 'Smooth operation, speed, noise level' },
            { name: 'Desktop Size', weight: 1.6, description: 'Workspace area, depth for monitors' },
            { name: 'Features', weight: 1.4, description: 'Memory presets, cable management, controls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs build quality and features' }
        ],
        exampleAlternatives: [
            { name: 'Uplift V2', description: 'Highly customizable, stable, great warranty' },
            { name: 'Fully Jarvis', description: 'Strong motors, programmable, eco-friendly' },
            { name: 'FlexiSpot E7', description: 'Affordable, solid performance, good value' }
        ],
        tips: 'Measure your ideal sitting and standing heights before buying - ensure the desk range accommodates both positions comfortably.'
    },
    {
        id: 'ergonomic-office-chair-comparison',
        name: 'Ergonomic Office Chair Comparison',
        description: 'Compare office chairs for comfort and support',
        category: 'Office',
        icon: '🪑',
        lucideIcon: 'armchair',
        isProductComparison: true,
        productCategory: 'ergonomic office chair',
        criteria: [
            { name: 'Lumbar Support', weight: 2.0, description: 'Adjustable lower back support, comfort' },
            { name: 'Adjustability', weight: 1.9, description: 'Seat height, armrests, tilt, headrest' },
            { name: 'Comfort & Cushioning', weight: 1.8, description: 'Seat padding, breathable materials' },
            { name: 'Build Quality', weight: 1.7, description: 'Materials, durability, weight capacity, warranty' },
            { name: 'Recline Function', weight: 1.5, description: 'Tilt range, tension control, locking' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and longevity' }
        ],
        exampleAlternatives: [
            { name: 'Herman Miller Aeron', description: 'Premium mesh, highly adjustable, legendary' },
            { name: 'Steelcase Leap', description: 'LiveBack technology, versatile, durable' },
            { name: 'Branch Ergonomic Chair', description: 'Great value, adjustable, comfortable' }
        ],
        tips: 'Test before buying if possible - ergonomic fit is personal. Look for chairs with good warranties (10+ years on premium models).'
    },
    {
        id: 'office-desk-comparison',
        name: 'Office Desk Comparison',
        description: 'Compare desks for home office setup',
        category: 'Office',
        icon: '🖥️',
        lucideIcon: 'rectangle-horizontal',
        isProductComparison: true,
        productCategory: 'office desk',
        criteria: [
            { name: 'Desktop Size', weight: 2.0, description: 'Work surface area, depth for monitors' },
            { name: 'Build Quality', weight: 1.8, description: 'Materials, stability, weight capacity' },
            { name: 'Storage & Organization', weight: 1.6, description: 'Drawers, shelves, cable management' },
            { name: 'Assembly', weight: 1.4, description: 'Ease of setup, instructions, time required' },
            { name: 'Style & Finish', weight: 1.3, description: 'Design aesthetics, material finishes' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs size and quality' }
        ],
        exampleAlternatives: [
            { name: 'IKEA Bekant', description: 'Affordable, spacious, minimalist' },
            { name: 'Bush Furniture Cabot', description: 'L-shaped, storage, traditional' },
            { name: 'Autonomous SmartDesk Core', description: 'Modern design, cable tray, solid' }
        ],
        tips: 'Measure your space and plan for monitor placement, keyboard, and other essentials before choosing desk size.'
    },
    {
        id: 'sewing-machine-comparison',
        name: 'Sewing Machine Comparison',
        description: 'Compare sewing machines for home projects',
        category: 'Home & Crafts',
        icon: '🧵',
        lucideIcon: 'scissors',
        isProductComparison: true,
        productCategory: 'sewing machine',
        criteria: [
            { name: 'Stitch Quality', weight: 2.0, description: 'Precision, consistency, fabric handling' },
            { name: 'Stitch Variety', weight: 1.7, description: 'Number of stitches, buttonhole options' },
            { name: 'Ease of Use', weight: 1.8, description: 'Threading, bobbin, controls, learning curve' },
            { name: 'Features', weight: 1.6, description: 'Automatic features, speed control, LED light' },
            { name: 'Build Quality', weight: 1.5, description: 'Frame material, durability, motor power' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capabilities and durability' }
        ],
        exampleAlternatives: [
            { name: 'Brother CS7000i', description: 'Feature-rich, computerized, beginner-friendly' },
            { name: 'Singer Heavy Duty 4452', description: 'Strong motor, metal frame, durable' },
            { name: 'Janome 2212', description: 'Mechanical, reliable, simple operation' }
        ],
        tips: 'Consider project types - heavy fabrics need stronger motors, while quilting benefits from extended tables and stitch variety.'
    },
    
    // ========================================
    // Baby, Kids & Pet Templates
    // ========================================
    {
        id: 'baby-car-seat-comparison',
        name: 'Baby Car Seat Comparison',
        description: 'Compare car seats for infant and child safety',
        category: 'Baby & Kids',
        icon: '👶',
        lucideIcon: 'baby',
        isProductComparison: true,
        productCategory: 'baby car seat',
        criteria: [
            { name: 'Safety Ratings', weight: 2.0, description: 'Crash test scores, NHTSA ratings, certifications' },
            { name: 'Ease of Installation', weight: 1.8, description: 'LATCH, base system, secure fit indicators' },
            { name: 'Comfort & Support', weight: 1.7, description: 'Padding, headrest, recline positions' },
            { name: 'Growth Range', weight: 1.6, description: 'Weight/height limits, convertible options' },
            { name: 'Material Quality', weight: 1.5, description: 'Fabric, cleaning, durability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs safety and longevity' }
        ],
        exampleAlternatives: [
            { name: 'Graco 4Ever DLX', description: '10 years of use, convertible, SafeSeat' },
            { name: 'Britax Boulevard ClickTight', description: 'Easy install, impact protection' },
            { name: 'Chicco KeyFit 35', description: 'Infant seat, highly rated, easy carrier' }
        ],
        tips: 'Register your car seat for recall notifications. Check expiration dates - car seats expire 6-10 years after manufacture.'
    },
    {
        id: 'baby-monitor-comparison',
        name: 'Baby Monitor Comparison',
        description: 'Compare baby monitors for peace of mind',
        category: 'Baby & Kids',
        icon: '👶',
        lucideIcon: 'baby',
        isProductComparison: true,
        productCategory: 'baby monitor',
        criteria: [
            { name: 'Video Quality', weight: 2.0, description: 'Resolution, night vision, zoom capability' },
            { name: 'Range & Connectivity', weight: 1.8, description: 'Signal range, WiFi vs dedicated, reliability' },
            { name: 'Features', weight: 1.7, description: 'Two-way audio, temperature, lullabies, alerts' },
            { name: 'Battery Life', weight: 1.6, description: 'Parent unit runtime, power options' },
            { name: 'Privacy & Security', weight: 1.6, description: 'Encryption, secure connection' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and reliability' }
        ],
        exampleAlternatives: [
            { name: 'Nanit Pro', description: 'HD, sleep tracking, app-based, insights' },
            { name: 'Infant Optics DXR-8 PRO', description: 'Dedicated, no WiFi, interchangeable lenses' },
            { name: 'Eufy SpaceView', description: 'Large screen, good value, secure' }
        ],
        tips: 'WiFi monitors offer smartphone access but require secure networks. Dedicated monitors are more private but less flexible.'
    },
    {
        id: 'baby-stroller-comparison',
        name: 'Baby Stroller Comparison',
        description: 'Compare strollers for mobility and convenience',
        category: 'Baby & Kids',
        icon: '🚼',
        lucideIcon: 'baby',
        isProductComparison: true,
        productCategory: 'baby stroller',
        criteria: [
            { name: 'Maneuverability', weight: 2.0, description: 'Steering, turning radius, one-hand push' },
            { name: 'Folding & Storage', weight: 1.8, description: 'Compact fold, self-standing, trunk fit' },
            { name: 'Comfort', weight: 1.7, description: 'Seat padding, recline, canopy, suspension' },
            { name: 'Build Quality', weight: 1.7, description: 'Frame durability, wheels, weight capacity' },
            { name: 'Features', weight: 1.5, description: 'Storage basket, cup holders, adapters' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and longevity' }
        ],
        exampleAlternatives: [
            { name: 'UPPAbaby Vista V2', description: 'Expandable, high-quality, versatile' },
            { name: 'Baby Jogger City Mini GT2', description: 'All-terrain, agile, quick fold' },
            { name: 'Graco Modes Nest', description: 'Budget-friendly, grows with baby, reversible' }
        ],
        tips: 'Test in-store with your car - check trunk fit, one-hand folding, and maneuverability in aisles.'
    },
    {
        id: 'board-game-comparison',
        name: 'Board Game Comparison',
        description: 'Compare board games for family fun',
        category: 'Baby & Kids',
        icon: '🎲',
        lucideIcon: 'dice-5',
        isProductComparison: true,
        productCategory: 'board game',
        criteria: [
            { name: 'Fun Factor', weight: 2.0, description: 'Engagement, replayability, excitement' },
            { name: 'Player Count', weight: 1.7, description: 'Min/max players, scales well' },
            { name: 'Complexity', weight: 1.8, description: 'Learning curve, rules clarity, age appropriateness' },
            { name: 'Play Time', weight: 1.6, description: 'Session length, fits available time' },
            { name: 'Component Quality', weight: 1.4, description: 'Pieces, board, card quality, durability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs replayability and quality' }
        ],
        exampleAlternatives: [
            { name: 'Ticket to Ride', description: 'Family-friendly, strategic, easy to learn' },
            { name: 'Catan', description: 'Classic strategy, trading, great replay value' },
            { name: 'Codenames', description: 'Party game, team-based, word association' }
        ],
        tips: 'Consider your group - party games for large groups, strategy games for dedicated players, family games for mixed ages.'
    },
    {
        id: 'automatic-pet-feeder-comparison',
        name: 'Automatic Pet Feeder Comparison',
        description: 'Compare automatic feeders for cats and dogs',
        category: 'Pet Supplies',
        icon: '🐾',
        lucideIcon: 'paw-print',
        isProductComparison: true,
        productCategory: 'automatic pet feeder',
        criteria: [
            { name: 'Portion Control', weight: 2.0, description: 'Accurate dispensing, customizable portions' },
            { name: 'Capacity', weight: 1.8, description: 'Days of food storage, suitable for trips' },
            { name: 'Reliability', weight: 1.8, description: 'Consistent operation, jam prevention, backup power' },
            { name: 'Programming', weight: 1.6, description: 'Schedule flexibility, multiple meals, app control' },
            { name: 'Cleaning', weight: 1.5, description: 'Dishwasher safe, easy disassembly' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and reliability' }
        ],
        exampleAlternatives: [
            { name: 'PETLIBRO Automatic', description: 'App control, voice recording, reliable' },
            { name: 'Cat Mate C500', description: 'Simple, 5 meals, battery backup, affordable' },
            { name: 'PetSafe Smart Feed', description: 'WiFi, slow feed, portion precision' }
        ],
        tips: 'Test with your pet food type first - kibble size and shape affect dispensing accuracy.'
    },
    {
        id: 'dog-bed-comparison',
        name: 'Dog Bed Comparison',
        description: 'Compare dog beds for comfort and durability',
        category: 'Pet Supplies',
        icon: '🐕',
        lucideIcon: 'paw-print',
        isProductComparison: true,
        productCategory: 'dog bed',
        criteria: [
            { name: 'Comfort & Support', weight: 2.0, description: 'Cushioning, orthopedic foam, joint support' },
            { name: 'Size & Fit', weight: 1.8, description: 'Suitable for dog size, sleeping style' },
            { name: 'Durability', weight: 1.7, description: 'Chew-resistant, quality stitching, longevity' },
            { name: 'Washability', weight: 1.7, description: 'Machine washable, removable cover, easy cleaning' },
            { name: 'Material Quality', weight: 1.5, description: 'Fabric, fill, non-toxic, odor resistant' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and comfort' }
        ],
        exampleAlternatives: [
            { name: 'Big Barker Orthopedic', description: 'Senior dogs, therapeutic foam, 10-year warranty' },
            { name: 'K&H Pet Bolster', description: 'Affordable, durable, machine washable' },
            { name: 'PetFusion Ultimate', description: 'Memory foam, waterproof, chew-resistant' }
        ],
        tips: 'Measure your dog lying down fully stretched - bed should be at least 10-12 inches longer than dog\'s length.'
    },
    {
        id: 'dog-food-comparison',
        name: 'Dog Food Comparison',
        description: 'Compare dog food brands for nutrition',
        category: 'Pet Supplies',
        icon: '🐕',
        lucideIcon: 'paw-print',
        isProductComparison: true,
        productCategory: 'dog food',
        criteria: [
            { name: 'Nutritional Quality', weight: 2.0, description: 'Protein content, ingredients quality, AAFCO compliance' },
            { name: 'Ingredient Sourcing', weight: 1.8, description: 'Real meat, whole grains, no fillers, transparency' },
            { name: 'Dog Size/Age Suitability', weight: 1.7, description: 'Formulated for life stage, breed size' },
            { name: 'Digestibility', weight: 1.6, description: 'No common allergens, stomach sensitivity' },
            { name: 'Palatability', weight: 1.5, description: 'Dogs enjoy eating it, consistent intake' },
            { name: 'Value for Money', weight: 1.5, description: 'Cost per day vs nutritional quality' }
        ],
        exampleAlternatives: [
            { name: 'Orijen Original', description: 'High protein, fresh ingredients, biologically appropriate' },
            { name: 'Blue Buffalo Life Protection', description: 'Natural, LifeSource bits, variety of formulas' },
            { name: 'Purina Pro Plan', description: 'Veterinarian recommended, specialized formulas, research-backed' }
        ],
        tips: 'Transition foods gradually over 7-10 days to avoid digestive upset. Consult your vet for specific dietary needs.'
    },
    
    // ========================================
    // Automotive Templates
    // ========================================
    {
        id: 'car-battery-comparison',
        name: 'Car Battery Comparison',
        description: 'Compare automotive batteries for reliability',
        category: 'Automotive',
        icon: '🔋',
        lucideIcon: 'battery',
        isProductComparison: true,
        productCategory: 'car battery',
        criteria: [
            { name: 'Cold Cranking Amps', weight: 2.0, description: 'Starting power in cold weather' },
            { name: 'Reserve Capacity', weight: 1.8, description: 'Runtime without alternator' },
            { name: 'Warranty', weight: 1.7, description: 'Free replacement period, prorated coverage' },
            { name: 'Brand Reliability', weight: 1.6, description: 'Track record, failure rates, reviews' },
            { name: 'Maintenance', weight: 1.4, description: 'Maintenance-free vs serviceable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs longevity and performance' }
        ],
        exampleAlternatives: [
            { name: 'Optima RedTop', description: 'AGM, spill-proof, high performance' },
            { name: 'Interstate MTX', description: 'Reliable, good warranty, widely available' },
            { name: 'DieHard Platinum', description: 'Premium AGM, long warranty, proven' }
        ],
        tips: 'Check your car\'s CCA requirements and group size before buying - wrong size won\'t fit or meet electrical demands.'
    },
    {
        id: 'car-dash-cam-comparison',
        name: 'Car Dash Cam Comparison',
        description: 'Compare dashboard cameras for driving safety',
        category: 'Automotive',
        icon: '📹',
        lucideIcon: 'video',
        isProductComparison: true,
        productCategory: 'car dash cam',
        criteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/1440p/1080p resolution, night vision, HDR' },
            { name: 'Field of View', weight: 1.7, description: 'Wide angle coverage, dual camera options' },
            { name: 'Reliability', weight: 1.8, description: 'Heat tolerance, build quality, loop recording' },
            { name: 'Features', weight: 1.6, description: 'GPS, parking mode, G-sensor, WiFi' },
            { name: 'Storage & Mounting', weight: 1.4, description: 'Max SD card, adhesive quality, wire routing' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and video quality' }
        ],
        exampleAlternatives: [
            { name: 'Viofo A129 Pro Duo', description: '4K front, reliable, parking mode' },
            { name: 'Garmin Dash Cam Mini 2', description: 'Tiny, 1080p, voice control, Garmin quality' },
            { name: 'Nextbase 622GW', description: '4K, WiFi, Alexa, emergency SOS' }
        ],
        tips: 'Use high-endurance SD cards designed for dash cams - regular cards fail quickly with constant overwriting.'
    },
    {
        id: 'car-floor-mat-comparison',
        name: 'Car Floor Mat Comparison',
        description: 'Compare floor mats for vehicle protection',
        category: 'Automotive',
        icon: '🚗',
        lucideIcon: 'car',
        isProductComparison: true,
        productCategory: 'car floor mat',
        criteria: [
            { name: 'Coverage & Fit', weight: 2.0, description: 'Custom-fit, raised edges, footwell coverage' },
            { name: 'Material Quality', weight: 1.8, description: 'Durability, weather resistance, easy clean' },
            { name: 'Protection Level', weight: 1.7, description: 'Waterproof, dirt containment, carpet protection' },
            { name: 'Retention System', weight: 1.6, description: 'Hooks, clips, non-slip backing' },
            { name: 'Ease of Cleaning', weight: 1.5, description: 'Removable, hose-washable, maintenance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs coverage and durability' }
        ],
        exampleAlternatives: [
            { name: 'WeatherTech FloorLiner', description: 'Custom-fit, laser-measured, high edges' },
            { name: 'Husky Liners X-act Contour', description: 'Rubberized, precise fit, affordable' },
            { name: '3D MAXpider Kagu', description: 'Carbon fiber texture, elegant, protective' }
        ],
        tips: 'Verify fitment for your exact car year/make/model - even same model can have different floor shapes across years.'
    },
    {
        id: 'car-jump-starter-comparison',
        name: 'Car Jump Starter Comparison',
        description: 'Compare portable jump starters for emergencies',
        category: 'Automotive',
        icon: '🔋',
        lucideIcon: 'zap',
        isProductComparison: true,
        productCategory: 'car jump starter',
        criteria: [
            { name: 'Peak Amps', weight: 2.0, description: 'Starting power for engine size, CCA rating' },
            { name: 'Battery Capacity', weight: 1.8, description: 'mAh, number of jumps per charge' },
            { name: 'Safety Features', weight: 1.7, description: 'Reverse polarity, overcharge, spark protection' },
            { name: 'Additional Features', weight: 1.6, description: 'USB charging, flashlight, air compressor' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, case included' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        exampleAlternatives: [
            { name: 'NOCO Boost Plus GB40', description: 'Powerful, safe, USB charging, compact' },
            { name: 'Beatit QDSP', description: 'High capacity, air compressor, affordable' },
            { name: 'HULKMAN Alpha85', description: 'Wireless charging, display, premium features' }
        ],
        tips: 'Check peak amps vs your engine - gas engines typically need 400-600A, diesels 800-1200A or more.'
    },
    {
        id: 'car-phone-mount-comparison',
        name: 'Car Phone Mount Comparison',
        description: 'Compare phone mounts for safe driving',
        category: 'Automotive',
        icon: '📱',
        lucideIcon: 'smartphone',
        isProductComparison: true,
        productCategory: 'car phone mount',
        criteria: [
            { name: 'Stability & Grip', weight: 2.0, description: 'Holds phone securely, no vibration, strong grip' },
            { name: 'Mounting Location', weight: 1.8, description: 'Dashboard, windshield, vent, CD slot options' },
            { name: 'Adjustability', weight: 1.7, description: 'Viewing angles, rotation, telescoping arm' },
            { name: 'Phone Compatibility', weight: 1.6, description: 'Size range, case-friendly, thickness' },
            { name: 'Ease of Use', weight: 1.5, description: 'One-hand operation, quick release' },
            { name: 'Value for Money', weight: 1.4, description: 'Price vs quality and features' }
        ],
        exampleAlternatives: [
            { name: 'iOttie Easy One Touch 5', description: 'Dashboard/windshield, telescoping, reliable' },
            { name: 'Belkin MagSafe Car Vent', description: 'Magnetic, iPhone 12+, minimal, clean' },
            { name: 'RAM X-Grip', description: 'Universal, tough, adjustable, professional-grade' }
        ],
        tips: 'Test in your car first if possible - vent mounts may block airflow, windshield mounts may obstruct view depending on car.'
    },
    {
        id: 'obd-ii-scanner-comparison',
        name: 'OBD-II Scanner Comparison',
        description: 'Compare diagnostic scanners for car troubleshooting',
        category: 'Automotive',
        icon: '🔧',
        lucideIcon: 'wrench',
        isProductComparison: true,
        productCategory: 'obd-ii scanner',
        criteria: [
            { name: 'Diagnostic Capability', weight: 2.0, description: 'Code reading, live data, systems covered' },
            { name: 'Ease of Use', weight: 1.8, description: 'Interface clarity, instructions, Bluetooth vs wired' },
            { name: 'Vehicle Compatibility', weight: 1.7, description: 'Works with your car make/model/year' },
            { name: 'Features', weight: 1.6, description: 'Code definitions, freeze frame, smog check' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, screen quality, cable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs functionality depth' }
        ],
        exampleAlternatives: [
            { name: 'BlueDriver Bluetooth Pro', description: 'App-based, detailed reports, beginner-friendly' },
            { name: 'ANCEL AD410', description: 'Standalone, simple, reliable, affordable' },
            { name: 'Autel MaxiCOM MK808', description: 'Professional, advanced functions, bi-directional' }
        ],
        tips: 'Basic code readers are fine for DIYers. Professional mechanics need bi-directional control and advanced diagnostics.'
    },
    {
        id: 'portable-tire-inflator-comparison',
        name: 'Portable Tire Inflator Comparison',
        description: 'Compare portable air compressors for tires',
        category: 'Automotive',
        icon: '🚗',
        lucideIcon: 'gauge',
        isProductComparison: true,
        productCategory: 'portable tire inflator',
        criteria: [
            { name: 'Inflation Speed', weight: 2.0, description: 'PSI per minute, tire fill time' },
            { name: 'Max PSI', weight: 1.8, description: 'Pressure capability for SUVs, trucks, bikes' },
            { name: 'Power Source', weight: 1.7, description: 'Battery, 12V car, AC, versatility' },
            { name: 'Accuracy & Features', weight: 1.6, description: 'Digital gauge, auto-shutoff, preset PSI' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, storage case' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and durability' }
        ],
        exampleAlternatives: [
            { name: 'AstroAI Portable', description: 'Digital, auto-shutoff, 12V, compact' },
            { name: 'Ryobi 18V ONE+', description: 'Cordless battery, fast, dual power' },
            { name: 'EPAuto 12V DC', description: 'Budget-friendly, reliable, simple to use' }
        ],
        tips: 'Check max PSI for your vehicle type - cars need 35-40 PSI, SUVs/trucks may need 50-80 PSI or more.'
    },
    {
        id: 'cat-litter-box-comparison',
        name: 'Self-Cleaning Cat Litter Box Comparison',
        description: 'Compare automatic litter boxes for convenience',
        category: 'Pet Supplies',
        icon: '🐈',
        lucideIcon: 'paw-print',
        isProductComparison: true,
        productCategory: 'cat litter box',
        criteria: [
            { name: 'Cleaning Mechanism', weight: 2.0, description: 'Rake, rotating, sifting - effectiveness and reliability' },
            { name: 'Odor Control', weight: 1.8, description: 'Sealed waste compartment, carbon filters' },
            { name: 'Size & Capacity', weight: 1.7, description: 'Suitable for cat size, litter capacity, waste bin' },
            { name: 'Litter Compatibility', weight: 1.6, description: 'Clumping, crystal, clay - which types work' },
            { name: 'Noise Level', weight: 1.5, description: 'Quiet operation, won\'t scare cats' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and maintenance costs' }
        ],
        exampleAlternatives: [
            { name: 'Litter-Robot 4', description: 'WiFi, rotating globe, reliable, popular' },
            { name: 'PetSafe ScoopFree', description: 'Rake system, disposable trays, budget-friendly' },
            { name: 'Whisker Litter-Robot 3', description: 'Previous gen, proven, cost-effective' }
        ],
        tips: 'Introduce self-cleaning boxes gradually - some cats need time to adjust to the movement and noise.'
    },
    
    // ========================================
    // Personal Care & Beauty Templates
    // ========================================
    {
        id: 'electric-toothbrush-comparison',
        name: 'Electric Toothbrush Comparison',
        description: 'Compare electric toothbrushes for oral health',
        category: 'Personal Care',
        icon: '🪥',
        lucideIcon: 'scan-line',
        isProductComparison: true,
        productCategory: 'electric toothbrush',
        criteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Plaque removal, brushing technology, clinical results' },
            { name: 'Battery Life', weight: 1.7, description: 'Days per charge, charging method' },
            { name: 'Brush Modes', weight: 1.6, description: 'Sensitive, whitening, gum care options' },
            { name: 'Smart Features', weight: 1.5, description: 'App connectivity, pressure sensor, timer' },
            { name: 'Replacement Cost', weight: 1.6, description: 'Brush head prices, replacement frequency' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial + ongoing costs vs performance' }
        ],
        exampleAlternatives: [
            { name: 'Oral-B iO Series 9', description: 'Magnetic drive, app, AI tracking, premium' },
            { name: 'Philips Sonicare DiamondClean', description: 'Sonic technology, stylish, effective' },
            { name: 'Quip Electric', description: 'Subscription model, minimalist, affordable' }
        ],
        tips: 'Replace brush heads every 3 months. Look for ADA Seal of Acceptance for proven effectiveness.'
    },
    {
        id: 'electric-shaver-comparison',
        name: 'Electric Shaver Comparison',
        description: 'Compare electric razors for men\'s grooming',
        category: 'Personal Care',
        icon: '🪒',
        lucideIcon: 'scissors',
        isProductComparison: true,
        productCategory: 'electric shaver',
        criteria: [
            { name: 'Shave Closeness', weight: 2.0, description: 'Cut quality, smooth finish, irritation level' },
            { name: 'Comfort', weight: 1.8, description: 'Skin sensitivity, no nicks, pivoting heads' },
            { name: 'Battery & Runtime', weight: 1.6, description: 'Cordless minutes, quick charge, wet/dry' },
            { name: 'Ease of Cleaning', weight: 1.6, description: 'Washable, cleaning station, maintenance' },
            { name: 'Versatility', weight: 1.5, description: 'Trimmer attachment, facial hair, body use' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and longevity' }
        ],
        exampleAlternatives: [
            { name: 'Braun Series 9 Pro', description: 'Premium closeness, gentle, auto-cleaning' },
            { name: 'Philips Norelco 9000', description: 'Rotary heads, wet/dry, smart app' },
            { name: 'Panasonic Arc5', description: 'Five blades, fast motor, Japanese quality' }
        ],
        tips: 'Rotary (circular) shavers work better for facial contours, foil (straight) shavers give closer shaves on flatter areas.'
    },
    {
        id: 'hair-dryer-comparison',
        name: 'Hair Dryer Comparison',
        description: 'Compare hair dryers for styling and speed',
        category: 'Personal Care',
        icon: '💨',
        lucideIcon: 'wind',
        isProductComparison: true,
        productCategory: 'hair dryer',
        criteria: [
            { name: 'Drying Speed', weight: 2.0, description: 'Wattage, airflow power, time to dry' },
            { name: 'Heat Settings', weight: 1.7, description: 'Temperature options, cool shot, control' },
            { name: 'Hair Health', weight: 1.8, description: 'Ionic, ceramic, tourmaline technology, frizz reduction' },
            { name: 'Weight & Ergonomics', weight: 1.6, description: 'Comfortable to hold, balance, fatigue' },
            { name: 'Attachments', weight: 1.4, description: 'Concentrator, diffuser, comb nozzles' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and durability' }
        ],
        exampleAlternatives: [
            { name: 'Dyson Supersonic', description: 'Fast drying, intelligent heat, quiet, premium' },
            { name: 'Shark HyperAIR', description: 'Affordable alternative, good power, attachments' },
            { name: 'Revlon One-Step', description: 'Volumizer brush combo, beginner-friendly' }
        ],
        tips: 'Higher wattage (1800W+) means faster drying but potentially more heat damage - look for heat control features.'
    },
    {
        id: 'hair-straightener-comparison',
        name: 'Hair Straightener Comparison',
        description: 'Compare flat irons for sleek styling',
        category: 'Personal Care',
        icon: '💇',
        lucideIcon: 'minus',
        isProductComparison: true,
        productCategory: 'hair straightener',
        criteria: [
            { name: 'Straightening Performance', weight: 2.0, description: 'Single-pass smoothing, lasting results' },
            { name: 'Plate Material', weight: 1.8, description: 'Ceramic, titanium, tourmaline - heat distribution' },
            { name: 'Heat-Up Time', weight: 1.6, description: 'Seconds to reach temperature, temperature range' },
            { name: 'Hair Protection', weight: 1.7, description: 'Even heat, no hot spots, adjustable temperature' },
            { name: 'Plate Width', weight: 1.5, description: 'Suitable for hair length and thickness' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and longevity' }
        ],
        exampleAlternatives: [
            { name: 'GHD Platinum+', description: 'Predictive heat, no damage, professional' },
            { name: 'CHI Original', description: 'Ceramic, reliable, hairdresser favorite' },
            { name: 'Remington Pro', description: 'Budget-friendly, adjustable heat, effective' }
        ],
        tips: 'Use heat protectant spray always. Fine hair needs 250-300°F, thick coarse hair may need 350-400°F.'
    },
    {
        id: 'curling-iron-comparison',
        name: 'Curling Iron Comparison',
        description: 'Compare curling irons for waves and curls',
        category: 'Personal Care',
        icon: '💇',
        lucideIcon: 'waves',
        isProductComparison: true,
        productCategory: 'curling iron',
        criteria: [
            { name: 'Curl Quality', weight: 2.0, description: 'Defined curls, bounce, lasting hold' },
            { name: 'Barrel Material', weight: 1.7, description: 'Ceramic, titanium, tourmaline - heat distribution' },
            { name: 'Barrel Size', weight: 1.8, description: 'Suitable for desired curl type, hair length' },
            { name: 'Heat Settings', weight: 1.6, description: 'Temperature control, range, heat-up speed' },
            { name: 'Ease of Use', weight: 1.5, description: 'Clamp vs wand, swivel cord, cool tip' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        exampleAlternatives: [
            { name: 'T3 Whirl Trio', description: 'Interchangeable barrels, professional quality' },
            { name: 'Hot Tools Professional', description: 'Salon-grade, reliable, affordable' },
            { name: 'Conair Infiniti Pro', description: 'Budget-friendly, effective, good reviews' }
        ],
        tips: 'Barrel size determines curl size - 3/4" for tight curls, 1" for classic curls, 1.5"+ for loose waves.'
    },
    
    // ========================================
    // Outdoor, Home, Power & Media Templates
    // ========================================
    {
        id: 'tent-comparison',
        name: 'Tent Comparison',
        description: 'Compare camping tents for outdoor adventures',
        category: 'Outdoor & Camping',
        icon: '⛺',
        lucideIcon: 'tent-tree',
        isProductComparison: true,
        productCategory: 'tent',
        criteria: [
            { name: 'Weather Protection', weight: 2.0, description: 'Waterproofing, wind resistance, rainfly quality' },
            { name: 'Capacity & Space', weight: 1.8, description: 'Sleeps count, interior room, vestibule space' },
            { name: 'Setup Ease', weight: 1.7, description: 'Assembly time, pole system, instructions' },
            { name: 'Durability', weight: 1.7, description: 'Fabric quality, pole strength, zipper reliability' },
            { name: 'Ventilation', weight: 1.5, description: 'Airflow, condensation management, mesh panels' },
            { name: 'Weight & Portability', weight: 1.6, description: 'Packed size, carry weight, backpacking vs car camping' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and features' }
        ],
        exampleAlternatives: [
            { name: 'REI Co-op Half Dome', description: 'Well-balanced, reliable, good value' },
            { name: 'Coleman Sundome', description: 'Affordable, easy setup, family camping' },
            { name: 'Big Agnes Copper Spur', description: 'Ultralight, backpacking, premium' }
        ],
        tips: 'Consider 3-season for most camping, 4-season for winter. Size up (4-person for 2 people) for comfort and gear storage.'
    },
    {
        id: 'grill-comparison',
        name: 'Grill Comparison',
        description: 'Compare grills for outdoor cooking',
        category: 'Outdoor & Camping',
        icon: '🔥',
        lucideIcon: 'flame',
        isProductComparison: true,
        productCategory: 'grill',
        criteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Heat distribution, temperature control, searing capability' },
            { name: 'Fuel Type', weight: 1.8, description: 'Gas (convenience), charcoal (flavor), pellet (versatility)' },
            { name: 'Cooking Area', weight: 1.7, description: 'Primary + warming rack square inches' },
            { name: 'Build Quality', weight: 1.7, description: 'Materials, durability, weather resistance, warranty' },
            { name: 'Features', weight: 1.5, description: 'Side burner, rotisserie, temperature gauge, storage' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs cooking area and features' }
        ],
        exampleAlternatives: [
            { name: 'Weber Spirit II E-310', description: 'Gas, reliable, proven, great warranty' },
            { name: 'Traeger Pro 575', description: 'Wood pellet, smoker + grill, WiFi control' },
            { name: 'Weber Original Kettle', description: 'Charcoal, classic, versatile, affordable' }
        ],
        tips: 'Gas for convenience, charcoal for flavor, pellet for smoking versatility. Consider storage and fuel availability.'
    },
    {
        id: 'mattress-comparison',
        name: 'Mattress Comparison',
        description: 'Compare mattresses for sleep quality',
        category: 'Furniture & Home',
        icon: '🛏️',
        lucideIcon: 'bed',
        isProductComparison: true,
        productCategory: 'mattress',
        criteria: [
            { name: 'Comfort & Support', weight: 2.0, description: 'Pressure relief, spinal alignment, sleep position suitability' },
            { name: 'Firmness Level', weight: 1.9, description: 'Soft, medium, firm - matches preference and body type' },
            { name: 'Motion Isolation', weight: 1.7, description: 'Partner disturbance, quiet, stability' },
            { name: 'Temperature Regulation', weight: 1.6, description: 'Cooling features, breathability, hot sleeper friendly' },
            { name: 'Durability & Warranty', weight: 1.6, description: 'Expected lifespan, warranty length, quality materials' },
            { name: 'Trial Period', weight: 1.5, description: 'Sleep trial length, return policy, hassle-free' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and longevity' }
        ],
        exampleAlternatives: [
            { name: 'Tempur-Pedic TEMPUR-Adapt', description: 'Memory foam, pressure relief, premium' },
            { name: 'Casper Original', description: 'Hybrid, balanced, popular bed-in-box' },
            { name: 'Saatva Classic', description: 'Innerspring hybrid, luxury feel, delivered' }
        ],
        tips: 'Use the full trial period (usually 90-120 nights) - it takes time to adjust. Side sleepers need softer, back sleepers medium-firm.'
    },
    {
        id: 'outdoor-patio-furniture-comparison',
        name: 'Outdoor Patio Furniture Comparison',
        description: 'Compare patio furniture sets for outdoor living',
        category: 'Furniture & Home',
        icon: '🪑',
        lucideIcon: 'armchair',
        isProductComparison: true,
        productCategory: 'outdoor patio furniture',
        criteria: [
            { name: 'Weather Resistance', weight: 2.0, description: 'UV, rain, fade resistance, rust-proof' },
            { name: 'Material Quality', weight: 1.8, description: 'Wicker, aluminum, teak, poly lumber durability' },
            { name: 'Comfort', weight: 1.7, description: 'Cushion quality, ergonomics, seating depth' },
            { name: 'Set Completeness', weight: 1.6, description: 'Pieces included, serves group size' },
            { name: 'Maintenance', weight: 1.5, description: 'Cleaning ease, cushion storage, upkeep' },
            { name: 'Style & Aesthetics', weight: 1.4, description: 'Design appeal, color options, modern/traditional' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and longevity' }
        ],
        exampleAlternatives: [
            { name: 'Christopher Knight Home', description: 'Wicker, stylish, affordable, popular' },
            { name: 'Keter Rio', description: 'Resin, weather-proof, low maintenance' },
            { name: 'Hanover Outdoor', description: 'Complete sets, good quality, reasonable' }
        ],
        tips: 'Consider storage - cushions need protection from moisture. Aluminum frames don\'t rust, but wicker looks better in many settings.'
    },
    {
        id: 'backup-power-station-comparison',
        name: 'Backup Power Station Comparison',
        description: 'Compare portable power stations for emergencies',
        category: 'Power & Tools',
        icon: '🔋',
        lucideIcon: 'battery-charging',
        isProductComparison: true,
        productCategory: 'backup power station',
        criteria: [
            { name: 'Capacity', weight: 2.0, description: 'Watt-hours, devices charged, runtime' },
            { name: 'Output Ports', weight: 1.8, description: 'AC outlets, USB-A, USB-C, DC, variety' },
            { name: 'Charging Speed', weight: 1.7, description: 'Recharge time, solar capable, passthrough' },
            { name: 'Power Output', weight: 1.8, description: 'Max watts, surge capacity, handles devices' },
            { name: 'Portability', weight: 1.5, description: 'Weight, size, handle, truly portable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per Wh capacity and features' }
        ],
        exampleAlternatives: [
            { name: 'Jackery Explorer 1000', description: 'Popular, reliable, good capacity, proven' },
            { name: 'EcoFlow DELTA 2', description: 'Fast charging, expandable, feature-rich' },
            { name: 'Anker 757', description: 'Long lifespan battery, safe, efficient' }
        ],
        tips: 'Calculate your power needs - add up device watts and desired runtime. Solar panels significantly increase off-grid capability.'
    },
    {
        id: 'generator-comparison',
        name: 'Generator Comparison',
        description: 'Compare generators for backup power',
        category: 'Power & Tools',
        icon: '⚡',
        lucideIcon: 'zap',
        isProductComparison: true,
        productCategory: 'generator',
        criteria: [
            { name: 'Power Output', weight: 2.0, description: 'Starting and running watts, sufficient for needs' },
            { name: 'Fuel Efficiency', weight: 1.8, description: 'Runtime per tank, fuel consumption, economy mode' },
            { name: 'Noise Level', weight: 1.7, description: 'Decibels, inverter vs conventional, quiet operation' },
            { name: 'Portability', weight: 1.6, description: 'Weight, wheels, handles, easy to move' },
            { name: 'Features', weight: 1.5, description: 'Electric start, outlets, USB, inverter technology' },
            { name: 'Reliability', weight: 1.7, description: 'Brand reputation, build quality, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        exampleAlternatives: [
            { name: 'Honda EU2200i', description: 'Inverter, quiet, reliable, fuel efficient' },
            { name: 'Westinghouse iGen4500', description: 'More power, inverter, great value' },
            { name: 'Champion 3400', description: 'Dual fuel, quiet, good capacity' }
        ],
        tips: 'List all devices you need to power simultaneously - add starting watts (typically 2-3x running watts for motors).'
    },
    {
        id: 'cordless-drill-comparison',
        name: 'Cordless Drill Comparison',
        description: 'Compare cordless drills for DIY and projects',
        category: 'Power & Tools',
        icon: '🔧',
        lucideIcon: 'drill',
        isProductComparison: true,
        productCategory: 'cordless drill',
        criteria: [
            { name: 'Power & Torque', weight: 2.0, description: 'Voltage, max torque, drilling capacity' },
            { name: 'Battery Life', weight: 1.8, description: 'Amp-hours, runtime, batteries included' },
            { name: 'Versatility', weight: 1.7, description: 'Drill/driver modes, hammer function, speed settings' },
            { name: 'Chuck Size', weight: 1.5, description: '1/2" vs 3/8", keyless, bit compatibility' },
            { name: 'Ergonomics', weight: 1.6, description: 'Weight, grip, balance, comfort' },
            { name: 'Value for Money', weight: 1.5, description: 'Kit contents, price vs performance' }
        ],
        exampleAlternatives: [
            { name: 'DeWalt DCD771C2', description: '20V, compact, reliable, good kit' },
            { name: 'Milwaukee M18', description: 'Powerful, brushless, professional grade' },
            { name: 'Ryobi 18V ONE+', description: 'Budget-friendly, large tool ecosystem' }
        ],
        tips: 'Consider battery ecosystem - stick with one brand to share batteries across tools. 18-20V sufficient for most home use.'
    },
    {
        id: 'streaming-media-player-comparison',
        name: 'Streaming Media Player Comparison',
        description: 'Compare streaming devices for TV entertainment',
        category: 'Electronics',
        icon: '📺',
        lucideIcon: 'tv',
        isProductComparison: true,
        productCategory: 'streaming media player',
        criteria: [
            { name: 'Content Access', weight: 2.0, description: 'App availability, services supported, library' },
            { name: 'Video Quality', weight: 1.8, description: '4K, HDR, Dolby Vision, frame rates' },
            { name: 'Performance', weight: 1.7, description: 'Speed, responsiveness, no lag, smooth navigation' },
            { name: 'Remote & Control', weight: 1.6, description: 'Voice control, ergonomics, TV power/volume' },
            { name: 'Interface', weight: 1.5, description: 'Ease of use, search, recommendations' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        exampleAlternatives: [
            { name: 'Apple TV 4K', description: 'Premium experience, ecosystem integration, fast' },
            { name: 'Roku Ultra', description: 'Most content, simple interface, affordable' },
            { name: 'Amazon Fire TV Stick 4K', description: 'Alexa integration, budget-friendly, HDR' }
        ],
        tips: 'Check which services you actually use - all major players support popular apps, but niche services may vary.'
    },
    {
        id: 'microphone-comparison',
        name: 'USB Microphone Comparison',
        description: 'Compare USB microphones for podcasting and streaming',
        category: 'Electronics',
        icon: '🎙️',
        lucideIcon: 'mic',
        isProductComparison: true,
        productCategory: 'microphone',
        criteria: [
            { name: 'Audio Quality', weight: 2.0, description: 'Clarity, warmth, frequency response, bit depth' },
            { name: 'Polar Pattern', weight: 1.7, description: 'Cardioid, omnidirectional options, background rejection' },
            { name: 'Ease of Use', weight: 1.8, description: 'Plug-and-play, controls, headphone monitoring' },
            { name: 'Build Quality', weight: 1.6, description: 'Materials, stability, durability, included mount' },
            { name: 'Features', weight: 1.5, description: 'Mute button, gain control, LED indicators' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        exampleAlternatives: [
            { name: 'Blue Yeti', description: 'Versatile, multiple patterns, popular choice' },
            { name: 'Audio-Technica AT2020USB+', description: 'Studio quality, cardioid, great sound' },
            { name: 'Elgato Wave:3', description: 'Streamer-focused, software suite, clean sound' }
        ],
        tips: 'Cardioid pattern best for single voice (podcasting). Room treatment matters more than mic price for quality.'
    },
    {
        id: 'digital-piano-comparison',
        name: 'Digital Piano Comparison',
        description: 'Compare digital pianos for learning and performance',
        category: 'Musical Instruments',
        icon: '🎹',
        lucideIcon: 'piano',
        isProductComparison: true,
        productCategory: 'digital piano',
        criteria: [
            { name: 'Key Action', weight: 2.0, description: 'Weighted keys, hammer action, realistic feel' },
            { name: 'Sound Quality', weight: 1.9, description: 'Piano samples, speaker quality, polyphony' },
            { name: 'Key Count', weight: 1.7, description: '88 keys (full), 76, or 61 keys' },
            { name: 'Features', weight: 1.6, description: 'Voices, recording, metronome, lesson functions' },
            { name: 'Connectivity', weight: 1.5, description: 'MIDI, USB, headphones, app integration' },
            { name: 'Build Quality', weight: 1.5, description: 'Durability, stand included, pedals' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs key action and sound' }
        ],
        exampleAlternatives: [
            { name: 'Yamaha P-125', description: 'Portable, great action, trusted brand' },
            { name: 'Roland FP-30X', description: 'Excellent sounds, Bluetooth, compact' },
            { name: 'Casio Privia PX-160', description: 'Budget-friendly, 88 keys, weighted' }
        ],
        tips: 'Serious learners need 88 fully-weighted keys. Try in store if possible - key feel is very personal preference.'
    },
    {
        id: 'home-security-camera-comparison',
        name: 'Home Security Camera System Comparison',
        description: 'Compare security camera systems for home protection',
        category: 'Home Security',
        icon: '📹',
        lucideIcon: 'video',
        isProductComparison: true,
        productCategory: 'home security camera',
        criteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/1080p resolution, night vision, HDR' },
            { name: 'Storage Options', weight: 1.8, description: 'Local NVR, cloud, subscription costs, capacity' },
            { name: 'Smart Detection', weight: 1.7, description: 'Person, vehicle, package detection, zones' },
            { name: 'Coverage', weight: 1.7, description: 'Number of cameras, field of view, placement' },
            { name: 'Reliability', weight: 1.6, description: 'Weatherproof, wired vs wireless, connectivity' },
            { name: 'Integration', weight: 1.5, description: 'Smart home, voice assistants, app quality' },
            { name: 'Value for Money', weight: 1.5, description: 'System + ongoing costs vs features' }
        ],
        exampleAlternatives: [
            { name: 'Reolink RLK8-810B4-A', description: '4K PoE, local storage, no fees, 8 cameras' },
            { name: 'Arlo Pro 4', description: 'Wireless, smart detection, cloud, flexible' },
            { name: 'Ring Spotlight Cam', description: 'Ecosystem integration, easy install, popular' }
        ],
        tips: 'Wired PoE systems are most reliable for permanent installation. Consider ongoing subscription costs for cloud storage.'
    },
    {
        id: 'smart-scale-comparison',
        name: 'Smart Scale Comparison',
        description: 'Compare smart scales for health tracking',
        category: 'Health & Wellness',
        icon: '⚖️',
        lucideIcon: 'weight',
        isProductComparison: true,
        productCategory: 'smart scale',
        criteria: [
            { name: 'Measurement Accuracy', weight: 2.0, description: 'Weight precision, consistency, calibration' },
            { name: 'Body Metrics', weight: 1.8, description: 'Body fat %, muscle mass, BMI, bone density' },
            { name: 'App Quality', weight: 1.7, description: 'Data visualization, trends, goal tracking, insights' },
            { name: 'Multi-User Support', weight: 1.6, description: 'Automatic user recognition, family profiles' },
            { name: 'Integration', weight: 1.5, description: 'Apple Health, Google Fit, Fitbit sync' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs metrics and features' }
        ],
        exampleAlternatives: [
            { name: 'Withings Body+', description: 'Accurate, comprehensive metrics, great app' },
            { name: 'Eufy Smart Scale P2', description: 'Affordable, 16 measurements, no subscription' },
            { name: 'Fitbit Aria Air', description: 'Simple, Fitbit ecosystem, reliable' }
        ],
        tips: 'Body composition metrics are estimates - use for trends rather than absolute accuracy. Weigh at same time daily.'
    },
    {
        id: 'smart-tv-comparison',
        name: 'Smart TV Comparison',
        description: 'Compare smart TVs for home entertainment',
        category: 'Electronics',
        icon: '📺',
        lucideIcon: 'tv',
        isProductComparison: true,
        productCategory: 'smart tv',
        criteria: [
            { name: 'Picture Quality', weight: 2.0, description: '4K/8K, HDR, contrast, color accuracy, brightness' },
            { name: 'Screen Size', weight: 1.8, description: 'Suitable for room size and viewing distance' },
            { name: 'Smart Platform', weight: 1.7, description: 'OS responsiveness, app selection, updates' },
            { name: 'Gaming Features', weight: 1.5, description: 'HDMI 2.1, VRR, low latency, 120Hz' },
            { name: 'Audio Quality', weight: 1.4, description: 'Built-in speakers, Dolby Atmos support' },
            { name: 'Build & Design', weight: 1.3, description: 'Thin bezels, stand quality, VESA mount' },
            { name: 'Value for Money', weight: 1.6, description: 'Price per inch with feature set' }
        ],
        exampleAlternatives: [
            { name: 'LG C3 OLED', description: 'Perfect blacks, gaming features, webOS' },
            { name: 'Samsung QN90C QLED', description: 'Bright, vibrant, great for rooms with light' },
            { name: 'TCL 6-Series', description: 'Budget-friendly, Mini-LED, Roku built-in' }
        ],
        tips: 'Calculate viewing distance - sit 1.5-2.5x screen width away. OLED for dark rooms, QLED for bright rooms with windows.'
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
    console.log('🔍 createDecisionFromTemplate called with:', templateId);
    const template = getTemplate(templateId);
    console.log('📋 Template found:', !!template);
    
    if (!template) {
        console.error('❌ Template not found. Available template IDs:', templates.map(t => t.id));
        console.error('❌ Looking for:', templateId);
        return null;
    }

    console.log('✅ Creating decision from template:', template.name);
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
