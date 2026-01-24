/**
 * AI-Powered Amazon Product Research for OptiMind
 * Uses AI to research, compare, and analyze products from Amazon
 */

import { AI, aiService } from './ai.js';
import { AffiliateProduct, generateSearchLink } from './affiliate.js';

/**
 * Product category configurations with research prompts
 */
const CATEGORY_CONFIG = {
    laptop: {
        name: 'Laptops',
        amazonCategory: 'electronics',
        searchTerms: ['laptop', 'notebook'],
        priceRanges: {
            low: { min: 300, max: 700, label: 'Budget ($300-$700)' },
            mid: { min: 700, max: 1500, label: 'Mid-Range ($700-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Performance', weight: 2.0, description: 'CPU, RAM, and processing power' },
            { name: 'Display Quality', weight: 1.5, description: 'Resolution, color accuracy, brightness' },
            { name: 'Battery Life', weight: 1.8, description: 'Hours of use between charges' },
            { name: 'Build Quality', weight: 1.2, description: 'Materials, durability, premium feel' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' },
            { name: 'Portability', weight: 1.0, description: 'Weight and size for travel' }
        ],
        specFields: ['processor', 'ram', 'storage', 'display', 'battery', 'weight', 'graphics']
    },
    smartphone: {
        name: 'Smartphones',
        amazonCategory: 'electronics',
        searchTerms: ['smartphone', 'cell phone'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 900, label: 'Mid-Range ($500-$900)' },
            high: { min: 900, max: null, label: 'Premium ($900+)' }
        },
        defaultCriteria: [
            { name: 'Camera Quality', weight: 2.0, description: 'Photo and video capabilities' },
            { name: 'Performance', weight: 1.8, description: 'Speed, multitasking, gaming' },
            { name: 'Battery Life', weight: 1.7, description: 'Daily usage between charges' },
            { name: 'Display', weight: 1.5, description: 'Screen quality, size, refresh rate' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' },
            { name: 'Software & Updates', weight: 1.0, description: 'OS experience, update support' }
        ],
        specFields: ['display', 'processor', 'ram', 'storage', 'camera', 'battery', '5g']
    },
    headphones: {
        name: 'Headphones',
        amazonCategory: 'electronics',
        searchTerms: ['headphones', 'earbuds', 'wireless headphones'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 300, label: 'Mid-Range ($150-$300)' },
            high: { min: 300, max: null, label: 'Premium ($300+)' }
        },
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, treble balance' },
            { name: 'Noise Cancellation', weight: 1.8, description: 'ANC effectiveness' },
            { name: 'Comfort', weight: 1.5, description: 'Fit, weight, padding quality' },
            { name: 'Battery Life', weight: 1.3, description: 'Hours of playback' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability and materials' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to quality' }
        ],
        specFields: ['driver', 'frequency', 'battery', 'anc', 'bluetooth', 'weight']
    },
    camera: {
        name: 'Cameras',
        amazonCategory: 'electronics',
        searchTerms: ['mirrorless camera', 'dslr camera', 'digital camera'],
        priceRanges: {
            low: { min: 400, max: 1000, label: 'Entry-Level ($400-$1,000)' },
            mid: { min: 1000, max: 2500, label: 'Mid-Range ($1,000-$2,500)' },
            high: { min: 2500, max: null, label: 'Professional ($2,500+)' }
        },
        defaultCriteria: [
            { name: 'Image Quality', weight: 2.0, description: 'Sensor, resolution, dynamic range' },
            { name: 'Autofocus', weight: 1.8, description: 'Speed, accuracy, tracking' },
            { name: 'Video Capability', weight: 1.5, description: '4K, frame rates, stabilization' },
            { name: 'Lens Ecosystem', weight: 1.3, description: 'Available lenses and compatibility' },
            { name: 'Ergonomics', weight: 1.2, description: 'Handling, controls, build' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capability' }
        ],
        specFields: ['sensor', 'resolution', 'iso', 'autofocus', 'video', 'stabilization']
    },
    tablet: {
        name: 'Tablets',
        amazonCategory: 'electronics',
        searchTerms: ['tablet', 'ipad', 'android tablet'],
        priceRanges: {
            low: { min: 150, max: 400, label: 'Budget ($150-$400)' },
            mid: { min: 400, max: 800, label: 'Mid-Range ($400-$800)' },
            high: { min: 800, max: null, label: 'Premium ($800+)' }
        },
        defaultCriteria: [
            { name: 'Display Quality', weight: 2.0, description: 'Screen size, resolution, colors' },
            { name: 'Performance', weight: 1.8, description: 'Speed for apps and games' },
            { name: 'Battery Life', weight: 1.5, description: 'Hours of usage' },
            { name: 'Productivity', weight: 1.3, description: 'Stylus support, keyboard compatibility' },
            { name: 'App Ecosystem', weight: 1.2, description: 'Tablet-optimized apps available' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        specFields: ['display', 'processor', 'ram', 'storage', 'battery', 'stylus']
    },
    smartwatch: {
        name: 'Smartwatches',
        amazonCategory: 'electronics',
        searchTerms: ['smartwatch', 'fitness tracker'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Health Tracking', weight: 2.0, description: 'Heart rate, sleep, fitness accuracy' },
            { name: 'Battery Life', weight: 1.8, description: 'Days between charges' },
            { name: 'Display', weight: 1.5, description: 'Readability, brightness, AOD' },
            { name: 'Smart Features', weight: 1.3, description: 'Apps, notifications, payments' },
            { name: 'Build Quality', weight: 1.2, description: 'Durability, water resistance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features' }
        ],
        specFields: ['display', 'battery', 'sensors', 'water_resistance', 'gps', 'storage']
    },
    
    // Home Appliances
    refrigerator: {
        name: 'Refrigerators',
        amazonCategory: 'appliances',
        searchTerms: ['refrigerator', 'fridge'],
        priceRanges: {
            low: { min: 500, max: 1200, label: 'Budget ($500-$1,200)' },
            mid: { min: 1200, max: 2500, label: 'Mid-Range ($1,200-$2,500)' },
            high: { min: 2500, max: null, label: 'Premium ($2,500+)' }
        },
        defaultCriteria: [
            { name: 'Storage Capacity', weight: 2.0, description: 'Total and usable space' },
            { name: 'Energy Efficiency', weight: 1.8, description: 'Energy Star rating, cost' },
            { name: 'Features', weight: 1.5, description: 'Ice maker, water dispenser' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, warranty' }
        ],
        specFields: ['capacity', 'energy_rating', 'dimensions', 'features', 'type']
    },
    'washing machine': {
        name: 'Washing Machines',
        amazonCategory: 'appliances',
        searchTerms: ['washing machine', 'washer'],
        priceRanges: {
            low: { min: 400, max: 800, label: 'Budget ($400-$800)' },
            mid: { min: 800, max: 1500, label: 'Mid-Range ($800-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Stain removal, wash quality' },
            { name: 'Capacity', weight: 1.8, description: 'Load size' },
            { name: 'Energy Efficiency', weight: 1.7, description: 'Operating costs' },
            { name: 'Reliability', weight: 1.6, description: 'Brand reputation, warranty' }
        ],
        specFields: ['capacity', 'energy_rating', 'rpm', 'dimensions', 'type']
    },
    dishwasher: {
        name: 'Dishwashers',
        amazonCategory: 'appliances',
        searchTerms: ['dishwasher'],
        priceRanges: {
            low: { min: 400, max: 700, label: 'Budget ($400-$700)' },
            mid: { min: 700, max: 1200, label: 'Mid-Range ($700-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Wash quality' },
            { name: 'Noise Level', weight: 1.7, description: 'Decibel rating' },
            { name: 'Energy Efficiency', weight: 1.5, description: 'Water and electricity usage' },
            { name: 'Capacity', weight: 1.6, description: 'Place settings' }
        ],
        specFields: ['capacity', 'noise_level', 'energy_rating', 'dimensions', 'racks']
    },
    'vacuum cleaner': {
        name: 'Vacuum Cleaners',
        amazonCategory: 'appliances',
        searchTerms: ['vacuum cleaner', 'vacuum'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 600, label: 'Mid-Range ($300-$600)' },
            high: { min: 600, max: null, label: 'Premium ($600+)' }
        },
        defaultCriteria: [
            { name: 'Suction Power', weight: 2.0, description: 'Cleaning effectiveness' },
            { name: 'Filtration', weight: 1.7, description: 'HEPA filter, allergen capture' },
            { name: 'Versatility', weight: 1.6, description: 'Attachments, surfaces' },
            { name: 'Battery Life', weight: 1.5, description: 'Runtime for cordless' }
        ],
        specFields: ['suction_power', 'filter', 'battery', 'weight', 'type']
    },
    'air purifier': {
        name: 'Air Purifiers',
        amazonCategory: 'appliances',
        searchTerms: ['air purifier'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Filtration Quality', weight: 2.0, description: 'HEPA, particle capture' },
            { name: 'Room Coverage', weight: 1.8, description: 'Square footage, CADR' },
            { name: 'Noise Level', weight: 1.6, description: 'Sound at different speeds' },
            { name: 'Filter Cost', weight: 1.5, description: 'Replacement costs' }
        ],
        specFields: ['cadr', 'coverage', 'filter_type', 'noise_level', 'dimensions']
    },
    'coffee maker': {
        name: 'Coffee Makers',
        amazonCategory: 'appliances',
        searchTerms: ['coffee maker', 'espresso machine'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 400, label: 'Mid-Range ($150-$400)' },
            high: { min: 400, max: null, label: 'Premium ($400+)' }
        },
        defaultCriteria: [
            { name: 'Coffee Quality', weight: 2.0, description: 'Brew temperature, taste' },
            { name: 'Convenience', weight: 1.7, description: 'Ease of use, programmable' },
            { name: 'Capacity', weight: 1.5, description: 'Cup/carafe size' },
            { name: 'Cleaning', weight: 1.3, description: 'Maintenance ease' }
        ],
        specFields: ['capacity', 'brew_type', 'features', 'dimensions', 'grinder']
    },
    
    // Fitness Equipment
    treadmill: {
        name: 'Treadmills',
        amazonCategory: 'sports',
        searchTerms: ['treadmill', 'running machine'],
        priceRanges: {
            low: { min: 300, max: 800, label: 'Budget ($300-$800)' },
            mid: { min: 800, max: 1800, label: 'Mid-Range ($800-$1,800)' },
            high: { min: 1800, max: null, label: 'Premium ($1,800+)' }
        },
        defaultCriteria: [
            { name: 'Motor Power', weight: 1.9, description: 'Continuous horsepower' },
            { name: 'Running Surface', weight: 1.8, description: 'Belt size, cushioning' },
            { name: 'Build Quality', weight: 1.7, description: 'Stability, weight capacity' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline, connectivity' }
        ],
        specFields: ['motor_hp', 'belt_size', 'weight_capacity', 'incline', 'speed_range']
    },
    'exercise bike': {
        name: 'Exercise Bikes',
        amazonCategory: 'sports',
        searchTerms: ['exercise bike', 'stationary bike', 'spin bike'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Ride Quality', weight: 2.0, description: 'Smoothness, resistance' },
            { name: 'Comfort', weight: 1.8, description: 'Seat, adjustability' },
            { name: 'Build Quality', weight: 1.6, description: 'Stability, durability' },
            { name: 'Features', weight: 1.5, description: 'Console, programs' }
        ],
        specFields: ['flywheel', 'resistance_type', 'weight_capacity', 'adjustability', 'dimensions']
    },
    elliptical: {
        name: 'Elliptical Machines',
        amazonCategory: 'sports',
        searchTerms: ['elliptical machine', 'elliptical trainer', 'cross trainer'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Stride Length', weight: 2.0, description: 'Natural movement' },
            { name: 'Resistance', weight: 1.8, description: 'Smoothness, levels' },
            { name: 'Build Quality', weight: 1.7, description: 'Stability' },
            { name: 'Features', weight: 1.5, description: 'Programs, incline' }
        ],
        specFields: ['stride_length', 'resistance_levels', 'weight_capacity', 'incline', 'programs']
    },
    'rowing machine': {
        name: 'Rowing Machines',
        amazonCategory: 'sports',
        searchTerms: ['rowing machine', 'rower'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Resistance Quality', weight: 2.0, description: 'Smoothness, resistance type' },
            { name: 'Build Quality', weight: 1.8, description: 'Frame durability' },
            { name: 'Comfort', weight: 1.6, description: 'Seat, footrests, handle' },
            { name: 'Monitor', weight: 1.5, description: 'Display, tracking' }
        ],
        specFields: ['resistance_type', 'rail_length', 'weight_capacity', 'dimensions', 'monitor']
    },
    'fitness tracker': {
        name: 'Fitness Trackers',
        amazonCategory: 'sports',
        searchTerms: ['fitness tracker', 'activity tracker', 'smart band'],
        priceRanges: {
            low: { min: 30, max: 100, label: 'Budget ($30-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Tracking Accuracy', weight: 2.0, description: 'Heart rate, steps, sleep' },
            { name: 'Battery Life', weight: 1.8, description: 'Days per charge' },
            { name: 'Features', weight: 1.6, description: 'GPS, SpO2, workout modes' },
            { name: 'App Quality', weight: 1.5, description: 'Data insights, goals' }
        ],
        specFields: ['battery_life', 'sensors', 'gps', 'water_resistance', 'compatibility']
    },
    'yoga mat': {
        name: 'Yoga Mats',
        amazonCategory: 'sports',
        searchTerms: ['yoga mat', 'exercise mat'],
        priceRanges: {
            low: { min: 15, max: 40, label: 'Budget ($15-$40)' },
            mid: { min: 40, max: 100, label: 'Mid-Range ($40-$100)' },
            high: { min: 100, max: null, label: 'Premium ($100+)' }
        },
        defaultCriteria: [
            { name: 'Grip & Traction', weight: 2.0, description: 'Slip resistance' },
            { name: 'Cushioning', weight: 1.8, description: 'Thickness, comfort' },
            { name: 'Material Quality', weight: 1.7, description: 'Durability, eco-friendly' },
            { name: 'Size & Portability', weight: 1.4, description: 'Dimensions, weight' }
        ],
        specFields: ['thickness', 'material', 'dimensions', 'weight', 'texture']
    },
    'home gym': {
        name: 'Home Gym Equipment',
        amazonCategory: 'sports',
        searchTerms: ['adjustable dumbbells', 'weight set', 'home gym'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 700, label: 'Mid-Range ($300-$700)' },
            high: { min: 700, max: null, label: 'Premium ($700+)' }
        },
        defaultCriteria: [
            { name: 'Weight Range', weight: 2.0, description: 'Min/max weight' },
            { name: 'Build Quality', weight: 1.9, description: 'Durability, safety' },
            { name: 'Space Efficiency', weight: 1.7, description: 'Footprint, storage' },
            { name: 'Versatility', weight: 1.6, description: 'Exercise variety' }
        ],
        specFields: ['weight_range', 'adjustment_type', 'dimensions', 'material', 'warranty']
    },
    
    // ========================================
    // Additional Electronics & Tech Categories
    // ========================================
    'action camera': {
        name: 'Action Cameras',
        amazonCategory: 'electronics',
        searchTerms: ['action camera', 'gopro', 'sports camera'],
        priceRanges: {
            low: { min: 50, max: 200, label: 'Budget ($50-$200)' },
            mid: { min: 200, max: 400, label: 'Mid-Range ($200-$400)' },
            high: { min: 400, max: null, label: 'Premium ($400+)' }
        },
        defaultCriteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/5K resolution, frame rates, stabilization' },
            { name: 'Durability', weight: 1.8, description: 'Waterproof rating, shock resistance, build quality' },
            { name: 'Battery Life', weight: 1.6, description: 'Recording time per battery' },
            { name: 'Features', weight: 1.5, description: 'Voice control, GPS, time-lapse, slow-mo' },
            { name: 'Ease of Use', weight: 1.3, description: 'Interface, mounting, connectivity' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features and quality' }
        ],
        specFields: ['resolution', 'fps', 'stabilization', 'waterproof_rating', 'battery', 'mounting']
    },
    'mirrorless camera': {
        name: 'Mirrorless Cameras',
        amazonCategory: 'electronics',
        searchTerms: ['mirrorless camera', 'mirrorless digital camera', 'full frame mirrorless'],
        priceRanges: {
            low: { min: 500, max: 1200, label: 'Entry-Level ($500-$1,200)' },
            mid: { min: 1200, max: 2500, label: 'Mid-Range ($1,200-$2,500)' },
            high: { min: 2500, max: null, label: 'Professional ($2,500+)' }
        },
        defaultCriteria: [
            { name: 'Image Quality', weight: 2.0, description: 'Sensor size, resolution, dynamic range' },
            { name: 'Autofocus System', weight: 1.8, description: 'Speed, accuracy, eye/subject tracking' },
            { name: 'Video Capabilities', weight: 1.6, description: '4K/8K, frame rates, log profiles' },
            { name: 'Build & Ergonomics', weight: 1.4, description: 'Weather sealing, grip, controls' },
            { name: 'Lens Ecosystem', weight: 1.5, description: 'Available lenses, compatibility, cost' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        specFields: ['sensor_size', 'megapixels', 'autofocus_points', 'video_resolution', 'iso_range', 'fps']
    },
    'drone camera': {
        name: 'Camera Drones',
        amazonCategory: 'electronics',
        searchTerms: ['drone camera', 'quadcopter', 'aerial camera drone'],
        priceRanges: {
            low: { min: 100, max: 500, label: 'Budget ($100-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Professional ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Camera Quality', weight: 2.0, description: 'Sensor size, resolution, gimbal stabilization' },
            { name: 'Flight Time', weight: 1.8, description: 'Minutes per battery charge' },
            { name: 'Range & Stability', weight: 1.7, description: 'Max distance, wind resistance, GPS' },
            { name: 'Safety Features', weight: 1.6, description: 'Obstacle avoidance, return home, geofencing' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, foldable design' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        specFields: ['camera_resolution', 'flight_time', 'range', 'weight', 'obstacle_avoidance', 'gps']
    },
    'gaming console': {
        name: 'Gaming Consoles',
        amazonCategory: 'electronics',
        searchTerms: ['gaming console', 'playstation', 'xbox', 'nintendo switch'],
        priceRanges: {
            low: { min: 200, max: 350, label: 'Budget ($200-$350)' },
            mid: { min: 350, max: 500, label: 'Current Gen ($350-$500)' },
            high: { min: 500, max: null, label: 'Premium Bundles ($500+)' }
        },
        defaultCriteria: [
            { name: 'Exclusive Games', weight: 2.0, description: 'First-party titles and exclusivity' },
            { name: 'Performance', weight: 1.8, description: 'Graphics, frame rates, loading times' },
            { name: 'Game Library', weight: 1.7, description: 'Available titles, backwards compatibility' },
            { name: 'Online Services', weight: 1.5, description: 'Multiplayer, subscriptions, features' },
            { name: 'Media Features', weight: 1.3, description: 'Streaming apps, 4K Blu-ray, media capabilities' },
            { name: 'Value for Money', weight: 1.5, description: 'Console price, game costs, subscriptions' }
        ],
        specFields: ['gpu', 'cpu', 'storage', 'resolution', 'exclusive_games', 'online_service']
    },
    'gaming headset': {
        name: 'Gaming Headsets',
        amazonCategory: 'electronics',
        searchTerms: ['gaming headset', 'gaming headphones', 'pc gaming headset'],
        priceRanges: {
            low: { min: 30, max: 80, label: 'Budget ($30-$80)' },
            mid: { min: 80, max: 200, label: 'Mid-Range ($80-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, positional accuracy, bass' },
            { name: 'Microphone Quality', weight: 1.8, description: 'Voice clarity, noise cancellation' },
            { name: 'Comfort', weight: 1.7, description: 'Long-session wearability, weight, padding' },
            { name: 'Compatibility', weight: 1.5, description: 'PC, console, wireless options' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, materials, adjustability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and quality' }
        ],
        specFields: ['driver_size', 'frequency', 'microphone_type', 'connectivity', 'compatibility', 'wireless']
    },
    'gaming laptop': {
        name: 'Gaming Laptops',
        amazonCategory: 'electronics',
        searchTerms: ['gaming laptop', 'gaming notebook', 'rtx laptop'],
        priceRanges: {
            low: { min: 700, max: 1200, label: 'Budget ($700-$1,200)' },
            mid: { min: 1200, max: 2000, label: 'Mid-Range ($1,200-$2,000)' },
            high: { min: 2000, max: null, label: 'High-End ($2,000+)' }
        },
        defaultCriteria: [
            { name: 'GPU Performance', weight: 2.0, description: 'Graphics card, gaming capability' },
            { name: 'Display Quality', weight: 1.8, description: 'Refresh rate, resolution, color accuracy' },
            { name: 'CPU Performance', weight: 1.7, description: 'Processor for gaming and multitasking' },
            { name: 'Cooling System', weight: 1.6, description: 'Thermal management, noise levels' },
            { name: 'Battery Life', weight: 1.3, description: 'Non-gaming usage duration' },
            { name: 'Build & Portability', weight: 1.4, description: 'Weight, thickness, build quality' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs gaming performance' }
        ],
        specFields: ['gpu', 'cpu', 'ram', 'display_refresh', 'storage', 'weight', 'cooling']
    },
    'gaming monitor': {
        name: 'Gaming Monitors',
        amazonCategory: 'electronics',
        searchTerms: ['gaming monitor', '144hz monitor', 'high refresh monitor'],
        priceRanges: {
            low: { min: 150, max: 300, label: 'Budget ($150-$300)' },
            mid: { min: 300, max: 600, label: 'Mid-Range ($300-$600)' },
            high: { min: 600, max: null, label: 'Premium ($600+)' }
        },
        defaultCriteria: [
            { name: 'Refresh Rate', weight: 2.0, description: 'Hz for smooth gameplay (144Hz, 240Hz, etc)' },
            { name: 'Response Time', weight: 1.8, description: 'Input lag and pixel response' },
            { name: 'Display Quality', weight: 1.7, description: 'Resolution, panel type, color accuracy' },
            { name: 'Adaptive Sync', weight: 1.5, description: 'G-Sync, FreeSync support' },
            { name: 'Size & Ergonomics', weight: 1.4, description: 'Screen size, adjustability, curved' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs specs and features' }
        ],
        specFields: ['refresh_rate', 'response_time', 'resolution', 'panel_type', 'size', 'adaptive_sync']
    },
    'mechanical keyboard': {
        name: 'Mechanical Keyboards',
        amazonCategory: 'electronics',
        searchTerms: ['mechanical keyboard', 'gaming keyboard', 'rgb keyboard'],
        priceRanges: {
            low: { min: 50, max: 100, label: 'Budget ($50-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Switch Type', weight: 2.0, description: 'Tactile, linear, clicky feel and sound' },
            { name: 'Build Quality', weight: 1.8, description: 'Materials, stability, durability' },
            { name: 'Features', weight: 1.6, description: 'Hot-swap, RGB, programmability, wireless' },
            { name: 'Typing Experience', weight: 1.7, description: 'Comfort, layout, keycap quality' },
            { name: 'Customization', weight: 1.4, description: 'Software, macros, key remapping' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to features' }
        ],
        specFields: ['switch_type', 'layout', 'hot_swap', 'connectivity', 'rgb', 'keycaps']
    },
    'wireless earbuds': {
        name: 'Wireless Earbuds',
        amazonCategory: 'electronics',
        searchTerms: ['wireless earbuds', 'true wireless', 'bluetooth earbuds'],
        priceRanges: {
            low: { min: 30, max: 100, label: 'Budget ($30-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, balance' },
            { name: 'Active Noise Cancellation', weight: 1.8, description: 'ANC effectiveness, transparency mode' },
            { name: 'Battery Life', weight: 1.7, description: 'Earbuds + case total hours' },
            { name: 'Fit & Comfort', weight: 1.6, description: 'Secure fit, ear tip options, comfort' },
            { name: 'Call Quality', weight: 1.4, description: 'Microphone clarity for calls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        specFields: ['driver_size', 'anc', 'battery', 'waterproof', 'codec', 'bluetooth_version']
    },
    'portable bluetooth speaker': {
        name: 'Portable Bluetooth Speakers',
        amazonCategory: 'electronics',
        searchTerms: ['bluetooth speaker', 'portable speaker', 'wireless speaker'],
        priceRanges: {
            low: { min: 20, max: 80, label: 'Budget ($20-$80)' },
            mid: { min: 80, max: 200, label: 'Mid-Range ($80-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Audio clarity, bass, volume, distortion' },
            { name: 'Battery Life', weight: 1.8, description: 'Hours of playback per charge' },
            { name: 'Durability', weight: 1.7, description: 'Waterproof rating, drop resistance' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, carrying options' },
            { name: 'Connectivity', weight: 1.3, description: 'Bluetooth range, pairing, multi-device' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs sound and features' }
        ],
        specFields: ['wattage', 'battery', 'waterproof_rating', 'bluetooth_range', 'weight', 'pairing']
    },
    'soundbar': {
        name: 'Soundbars',
        amazonCategory: 'electronics',
        searchTerms: ['soundbar', 'tv soundbar', 'home theater soundbar'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 700, label: 'Mid-Range ($300-$700)' },
            high: { min: 700, max: null, label: 'Premium ($700+)' }
        },
        defaultCriteria: [
            { name: 'Sound Quality', weight: 2.0, description: 'Clarity, bass, surround sound quality' },
            { name: 'Subwoofer', weight: 1.8, description: 'Wireless sub included, bass performance' },
            { name: 'Connectivity', weight: 1.6, description: 'HDMI eARC, optical, Bluetooth, WiFi' },
            { name: 'Dolby Atmos Support', weight: 1.5, description: 'Height channels, immersive audio' },
            { name: 'Ease of Setup', weight: 1.3, description: 'Installation, calibration, controls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        specFields: ['channels', 'subwoofer', 'dolby_atmos', 'hdmi_earc', 'wattage', 'wireless']
    },
    'external hard drive': {
        name: 'External Hard Drives',
        amazonCategory: 'electronics',
        searchTerms: ['external hard drive', 'portable ssd', 'external storage'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 250, label: 'Mid-Range ($100-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Storage Capacity', weight: 2.0, description: 'Total storage space (TB)' },
            { name: 'Speed', weight: 1.8, description: 'Transfer rates, SSD vs HDD' },
            { name: 'Durability', weight: 1.6, description: 'Shock resistance, build quality, warranty' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, bus-powered' },
            { name: 'Compatibility', weight: 1.3, description: 'USB-C, USB-A, Mac/PC formatting' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per TB' }
        ],
        specFields: ['capacity', 'type', 'interface', 'transfer_speed', 'dimensions', 'weight']
    },
    'power bank': {
        name: 'Power Banks',
        amazonCategory: 'electronics',
        searchTerms: ['power bank', 'portable charger', 'battery pack'],
        priceRanges: {
            low: { min: 15, max: 40, label: 'Budget ($15-$40)' },
            mid: { min: 40, max: 80, label: 'Mid-Range ($40-$80)' },
            high: { min: 80, max: null, label: 'Premium ($80+)' }
        },
        defaultCriteria: [
            { name: 'Capacity', weight: 2.0, description: 'mAh rating, device charges per bank' },
            { name: 'Charging Speed', weight: 1.8, description: 'Fast charging, PD, QC support' },
            { name: 'Port Selection', weight: 1.6, description: 'USB-C, USB-A, wireless charging' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, pocketability' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, safety features' },
            { name: 'Value for Money', weight: 1.5, description: 'Price relative to capacity and speed' }
        ],
        specFields: ['capacity', 'output_ports', 'fast_charging', 'input_charging', 'weight', 'dimensions']
    },
    'wireless router': {
        name: 'Wireless Routers',
        amazonCategory: 'electronics',
        searchTerms: ['wifi router', 'wireless router', 'wifi 6 router'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 300, label: 'Mid-Range ($150-$300)' },
            high: { min: 300, max: null, label: 'Premium ($300+)' }
        },
        defaultCriteria: [
            { name: 'WiFi Speed', weight: 2.0, description: 'WiFi 6/6E/7, max speeds, bands' },
            { name: 'Coverage Range', weight: 1.8, description: 'Square footage, multi-story capability' },
            { name: 'Device Capacity', weight: 1.6, description: 'Simultaneous connected devices' },
            { name: 'Features', weight: 1.5, description: 'QoS, parental controls, VPN, guest network' },
            { name: 'Ports', weight: 1.3, description: 'Gigabit ethernet, USB ports' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        specFields: ['wifi_standard', 'speed', 'bands', 'antennas', 'ethernet_ports', 'processor']
    },
    'mesh wifi': {
        name: 'Mesh WiFi Systems',
        amazonCategory: 'electronics',
        searchTerms: ['mesh wifi', 'mesh network', 'whole home wifi'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Coverage Area', weight: 2.0, description: 'Square footage per node, scalability' },
            { name: 'Speed & Performance', weight: 1.8, description: 'WiFi 6/6E, throughput, latency' },
            { name: 'Ease of Setup', weight: 1.7, description: 'App control, installation simplicity' },
            { name: 'Node Count & Placement', weight: 1.6, description: 'Included nodes, expansion options' },
            { name: 'Features', weight: 1.4, description: 'Smart home integration, parental controls, security' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs coverage and performance' }
        ],
        specFields: ['wifi_standard', 'coverage', 'nodes', 'bands', 'ethernet_ports', 'speed']
    },
    
    // ========================================
    // Home Appliances & Kitchen Categories
    // ========================================
    'air fryer': {
        name: 'Air Fryers',
        amazonCategory: 'appliances',
        searchTerms: ['air fryer', 'air fryer oven', 'countertop air fryer'],
        priceRanges: {
            low: { min: 40, max: 80, label: 'Budget ($40-$80)' },
            mid: { min: 80, max: 150, label: 'Mid-Range ($80-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Even cooking, crispiness, temperature accuracy' },
            { name: 'Capacity', weight: 1.8, description: 'Basket size, family servings' },
            { name: 'Ease of Use', weight: 1.6, description: 'Controls, presets, digital display' },
            { name: 'Cleaning', weight: 1.5, description: 'Dishwasher safe, non-stick coating' },
            { name: 'Build Quality', weight: 1.4, description: 'Materials, durability, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and features' }
        ],
        specFields: ['capacity', 'wattage', 'temp_range', 'presets', 'timer', 'basket_type']
    },
    'blender': {
        name: 'Blenders',
        amazonCategory: 'appliances',
        searchTerms: ['blender', 'high speed blender', 'countertop blender'],
        priceRanges: {
            low: { min: 30, max: 100, label: 'Budget ($30-$100)' },
            mid: { min: 100, max: 300, label: 'Mid-Range ($100-$300)' },
            high: { min: 300, max: null, label: 'Premium ($300+)' }
        },
        defaultCriteria: [
            { name: 'Blending Power', weight: 2.0, description: 'Motor strength, crushing ice, smooth results' },
            { name: 'Versatility', weight: 1.7, description: 'Functions, speeds, food processing capability' },
            { name: 'Container Quality', weight: 1.6, description: 'Size, material, measurement marks' },
            { name: 'Ease of Cleaning', weight: 1.5, description: 'Self-clean, dishwasher safe, blade access' },
            { name: 'Build Quality', weight: 1.5, description: 'Durability, materials, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        specFields: ['wattage', 'capacity', 'speeds', 'blade_type', 'jar_material', 'controls']
    },
    'espresso machine': {
        name: 'Espresso Machines',
        amazonCategory: 'appliances',
        searchTerms: ['espresso machine', 'espresso maker', 'home espresso machine'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Entry-Level ($100-$300)' },
            mid: { min: 300, max: 800, label: 'Mid-Range ($300-$800)' },
            high: { min: 800, max: null, label: 'Premium ($800+)' }
        },
        defaultCriteria: [
            { name: 'Espresso Quality', weight: 2.0, description: 'Extraction, crema, temperature stability' },
            { name: 'Steam Wand', weight: 1.8, description: 'Milk frothing capability, power, control' },
            { name: 'Ease of Use', weight: 1.6, description: 'Learning curve, consistency, automation' },
            { name: 'Build Quality', weight: 1.5, description: 'Materials, boiler type, durability' },
            { name: 'Maintenance', weight: 1.4, description: 'Cleaning, descaling, part replacement' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and features' }
        ],
        specFields: ['boiler_type', 'pressure', 'portafilter', 'steam_wand', 'grinder', 'water_reservoir']
    },
    'instant pot': {
        name: 'Instant Pots & Pressure Cookers',
        amazonCategory: 'appliances',
        searchTerms: ['instant pot', 'pressure cooker', 'multi cooker'],
        priceRanges: {
            low: { min: 50, max: 100, label: 'Budget ($50-$100)' },
            mid: { min: 100, max: 150, label: 'Mid-Range ($100-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Pressure cooking, even heating, results' },
            { name: 'Capacity', weight: 1.8, description: 'Quart size, family servings' },
            { name: 'Functions', weight: 1.7, description: 'Pressure, slow cook, sauté, yogurt, etc' },
            { name: 'Ease of Use', weight: 1.6, description: 'Controls, presets, learning curve' },
            { name: 'Safety Features', weight: 1.5, description: 'Pressure release, lid locking, sensors' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and versatility' }
        ],
        specFields: ['capacity', 'functions', 'pressure_levels', 'wattage', 'programs', 'materials']
    },
    'water filter': {
        name: 'Water Filters',
        amazonCategory: 'appliances',
        searchTerms: ['water filter', 'water filtration system', 'drinking water filter'],
        priceRanges: {
            low: { min: 20, max: 100, label: 'Pitcher/Faucet ($20-$100)' },
            mid: { min: 100, max: 300, label: 'Counter/Under-Sink ($100-$300)' },
            high: { min: 300, max: null, label: 'RO Systems ($300+)' }
        },
        defaultCriteria: [
            { name: 'Filtration Quality', weight: 2.0, description: 'Contaminants removed, certifications' },
            { name: 'Filter Lifespan', weight: 1.8, description: 'Gallons per filter, replacement frequency' },
            { name: 'Flow Rate', weight: 1.6, description: 'Water dispensing speed' },
            { name: 'Installation', weight: 1.4, description: 'Setup complexity, space requirements' },
            { name: 'Ongoing Costs', weight: 1.6, description: 'Filter replacement prices' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial + ongoing costs vs quality' }
        ],
        specFields: ['filter_type', 'capacity', 'filtration_stages', 'flow_rate', 'certifications', 'filter_life']
    },
    'humidifier': {
        name: 'Humidifiers',
        amazonCategory: 'appliances',
        searchTerms: ['humidifier', 'cool mist humidifier', 'ultrasonic humidifier'],
        priceRanges: {
            low: { min: 25, max: 60, label: 'Budget ($25-$60)' },
            mid: { min: 60, max: 150, label: 'Mid-Range ($60-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Humidification Capacity', weight: 2.0, description: 'Room size coverage, output rate' },
            { name: 'Run Time', weight: 1.8, description: 'Tank size, hours per fill' },
            { name: 'Ease of Cleaning', weight: 1.7, description: 'Tank access, mold prevention, maintenance' },
            { name: 'Noise Level', weight: 1.6, description: 'Quiet operation for bedrooms' },
            { name: 'Features', weight: 1.4, description: 'Humidistat, auto-shutoff, timer, warm/cool mist' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capacity and features' }
        ],
        specFields: ['tank_capacity', 'coverage_area', 'mist_type', 'runtime', 'noise_level', 'humidistat']
    },
    'robot vacuum': {
        name: 'Robot Vacuums',
        amazonCategory: 'appliances',
        searchTerms: ['robot vacuum', 'robotic vacuum cleaner', 'automatic vacuum'],
        priceRanges: {
            low: { min: 150, max: 300, label: 'Budget ($150-$300)' },
            mid: { min: 300, max: 600, label: 'Mid-Range ($300-$600)' },
            high: { min: 600, max: null, label: 'Premium ($600+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Suction, carpet/hardwood, edge cleaning' },
            { name: 'Navigation', weight: 1.8, description: 'Mapping, obstacle avoidance, efficiency' },
            { name: 'Battery Life', weight: 1.6, description: 'Runtime, recharge and resume' },
            { name: 'Smart Features', weight: 1.5, description: 'App control, scheduling, room selection' },
            { name: 'Maintenance', weight: 1.4, description: 'Self-emptying, filter cleaning, brush tangles' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        specFields: ['suction', 'navigation_type', 'battery', 'dustbin_capacity', 'mopping', 'self_emptying']
    },
    'cordless vacuum': {
        name: 'Cordless Vacuums',
        amazonCategory: 'appliances',
        searchTerms: ['cordless vacuum', 'stick vacuum', 'cordless stick vacuum'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Suction Power', weight: 2.0, description: 'Cleaning effectiveness on various surfaces' },
            { name: 'Battery Life', weight: 1.8, description: 'Runtime on different power modes' },
            { name: 'Weight & Ergonomics', weight: 1.6, description: 'Easy handling, balance, maneuverability' },
            { name: 'Attachments', weight: 1.5, description: 'Tools for furniture, crevices, pet hair' },
            { name: 'Bin Capacity', weight: 1.3, description: 'Dust cup size, emptying ease' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        specFields: ['suction', 'battery', 'runtime', 'weight', 'dustbin_capacity', 'attachments']
    },
    'printer': {
        name: 'Printers',
        amazonCategory: 'electronics',
        searchTerms: ['printer', 'inkjet printer', 'laser printer', 'all-in-one printer'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 350, label: 'Mid-Range ($150-$350)' },
            high: { min: 350, max: null, label: 'Premium ($350+)' }
        },
        defaultCriteria: [
            { name: 'Print Quality', weight: 2.0, description: 'Text sharpness, photo quality, color accuracy' },
            { name: 'Print Speed', weight: 1.7, description: 'Pages per minute for text and photos' },
            { name: 'Cost Per Page', weight: 1.8, description: 'Ink/toner costs, cartridge yield' },
            { name: 'Features', weight: 1.5, description: 'Duplex, scan, copy, wireless, mobile printing' },
            { name: 'Reliability', weight: 1.6, description: 'Duty cycle, build quality, paper handling' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial cost + long-term ink costs' }
        ],
        specFields: ['print_type', 'print_speed', 'resolution', 'connectivity', 'functions', 'cost_per_page']
    },
    'smart thermostat': {
        name: 'Smart Thermostats',
        amazonCategory: 'appliances',
        searchTerms: ['smart thermostat', 'wifi thermostat', 'programmable thermostat'],
        priceRanges: {
            low: { min: 70, max: 150, label: 'Budget ($70-$150)' },
            mid: { min: 150, max: 250, label: 'Mid-Range ($150-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Energy Savings', weight: 2.0, description: 'Learning algorithms, scheduling, efficiency' },
            { name: 'Smart Features', weight: 1.8, description: 'Remote control, geofencing, voice assistants' },
            { name: 'Ease of Installation', weight: 1.6, description: 'DIY-friendly, C-wire requirement, compatibility' },
            { name: 'User Interface', weight: 1.5, description: 'Display quality, app usability, controls' },
            { name: 'Compatibility', weight: 1.5, description: 'HVAC systems, multi-zone, sensors' },
            { name: 'Value for Money', weight: 1.4, description: 'Price vs features and savings' }
        ],
        specFields: ['display_type', 'sensors', 'compatibility', 'voice_control', 'geofencing', 'learning']
    },
    'smart lock': {
        name: 'Smart Locks',
        amazonCategory: 'appliances',
        searchTerms: ['smart lock', 'keyless entry', 'smart deadbolt'],
        priceRanges: {
            low: { min: 80, max: 150, label: 'Budget ($80-$150)' },
            mid: { min: 150, max: 250, label: 'Mid-Range ($150-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Security', weight: 2.0, description: 'Lock mechanism, encryption, certifications' },
            { name: 'Access Methods', weight: 1.8, description: 'Keypad, fingerprint, app, voice, key backup' },
            { name: 'Smart Integration', weight: 1.6, description: 'HomeKit, Alexa, Google, notifications' },
            { name: 'Installation', weight: 1.5, description: 'DIY-friendly, fits existing deadbolt' },
            { name: 'Battery Life', weight: 1.4, description: 'Months per battery set, low battery alerts' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and security' }
        ],
        specFields: ['lock_type', 'access_methods', 'connectivity', 'battery_type', 'installation', 'certification']
    },
    'video doorbell': {
        name: 'Video Doorbells',
        amazonCategory: 'appliances',
        searchTerms: ['video doorbell', 'smart doorbell', 'doorbell camera'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 250, label: 'Mid-Range ($150-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Video Quality', weight: 2.0, description: 'Resolution, HDR, night vision, field of view' },
            { name: 'Smart Features', weight: 1.8, description: 'Person detection, packages, two-way audio' },
            { name: 'Storage Options', weight: 1.6, description: 'Cloud subscription, local storage, cost' },
            { name: 'Power Source', weight: 1.5, description: 'Wired, battery, solar, charging frequency' },
            { name: 'Integration', weight: 1.4, description: 'Smart home ecosystems, voice assistants' },
            { name: 'Value for Money', weight: 1.5, description: 'Device + subscription costs' }
        ],
        specFields: ['resolution', 'field_of_view', 'power_type', 'storage', 'detection', 'night_vision']
    },
    
    // ========================================
    // Fitness, Health & Office Categories
    // ========================================
    'adjustable dumbbell': {
        name: 'Adjustable Dumbbells',
        amazonCategory: 'sports',
        searchTerms: ['adjustable dumbbells', 'adjustable weights', 'selecttech dumbbells'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 450, label: 'Mid-Range ($250-$450)' },
            high: { min: 450, max: null, label: 'Premium ($450+)' }
        },
        defaultCriteria: [
            { name: 'Weight Range', weight: 2.0, description: 'Min to max weight per dumbbell' },
            { name: 'Adjustment System', weight: 1.8, description: 'Speed and ease of weight changes' },
            { name: 'Build Quality', weight: 1.7, description: 'Durability, materials, stability' },
            { name: 'Space Efficiency', weight: 1.6, description: 'Footprint, storage base design' },
            { name: 'Grip & Comfort', weight: 1.5, description: 'Handle ergonomics, balance when lifting' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per weight range' }
        ],
        specFields: ['weight_range', 'adjustment_type', 'increments', 'dimensions', 'warranty', 'handle_type']
    },
    'blood pressure monitor': {
        name: 'Blood Pressure Monitors',
        amazonCategory: 'health',
        searchTerms: ['blood pressure monitor', 'bp monitor', 'home blood pressure'],
        priceRanges: {
            low: { min: 20, max: 50, label: 'Budget ($20-$50)' },
            mid: { min: 50, max: 100, label: 'Mid-Range ($50-$100)' },
            high: { min: 100, max: null, label: 'Premium ($100+)' }
        },
        defaultCriteria: [
            { name: 'Accuracy', weight: 2.0, description: 'Clinical validation, consistent readings' },
            { name: 'Ease of Use', weight: 1.8, description: 'Simple operation, cuff application, display' },
            { name: 'Cuff Fit', weight: 1.7, description: 'Adjustable range, comfortable, proper sizing' },
            { name: 'Features', weight: 1.5, description: 'Memory, averaging, irregular heartbeat detection' },
            { name: 'Connectivity', weight: 1.3, description: 'App sync, data tracking, sharing' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs accuracy and features' }
        ],
        specFields: ['cuff_size', 'memory_slots', 'connectivity', 'display_type', 'validation', 'power_source']
    },
    'protein powder': {
        name: 'Protein Powders',
        amazonCategory: 'health',
        searchTerms: ['protein powder', 'whey protein', 'plant protein'],
        priceRanges: {
            low: { min: 15, max: 40, label: 'Budget ($15-$40)' },
            mid: { min: 40, max: 70, label: 'Mid-Range ($40-$70)' },
            high: { min: 70, max: null, label: 'Premium ($70+)' }
        },
        defaultCriteria: [
            { name: 'Protein Quality', weight: 2.0, description: 'Protein per serving, amino acid profile, bioavailability' },
            { name: 'Taste & Mixability', weight: 1.8, description: 'Flavor quality, texture, blending ease' },
            { name: 'Ingredients', weight: 1.7, description: 'Clean label, artificial additives, allergens' },
            { name: 'Protein Type', weight: 1.6, description: 'Whey, casein, plant-based, isolate vs concentrate' },
            { name: 'Certifications', weight: 1.4, description: 'Third-party testing, NSF, Informed Sport' },
            { name: 'Value for Money', weight: 1.5, description: 'Cost per serving of protein' }
        ],
        specFields: ['protein_type', 'protein_per_serving', 'servings', 'flavors', 'certifications', 'additives']
    },
    'running shoe': {
        name: 'Running Shoes',
        amazonCategory: 'sports',
        searchTerms: ['running shoes', 'running sneakers', 'jogging shoes'],
        priceRanges: {
            low: { min: 50, max: 100, label: 'Budget ($50-$100)' },
            mid: { min: 100, max: 150, label: 'Mid-Range ($100-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Cushioning & Support', weight: 2.0, description: 'Impact absorption, arch support, stability' },
            { name: 'Fit & Comfort', weight: 1.9, description: 'True to size, breathability, toe box width' },
            { name: 'Durability', weight: 1.7, description: 'Outsole wear, upper quality, expected mileage' },
            { name: 'Weight', weight: 1.5, description: 'Lightness for speed vs cushioning' },
            { name: 'Terrain Suitability', weight: 1.4, description: 'Road, trail, track, treadmill' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and performance' }
        ],
        specFields: ['cushioning_type', 'drop', 'weight', 'support_type', 'terrain', 'upper_material']
    },
    'standing desk': {
        name: 'Standing Desks',
        amazonCategory: 'furniture',
        searchTerms: ['standing desk', 'adjustable desk', 'sit stand desk'],
        priceRanges: {
            low: { min: 200, max: 400, label: 'Budget ($200-$400)' },
            mid: { min: 400, max: 800, label: 'Mid-Range ($400-$800)' },
            high: { min: 800, max: null, label: 'Premium ($800+)' }
        },
        defaultCriteria: [
            { name: 'Stability', weight: 2.0, description: 'Wobble at full height, weight capacity' },
            { name: 'Height Range', weight: 1.8, description: 'Min/max height adjustment, suitable for your height' },
            { name: 'Motor Quality', weight: 1.7, description: 'Smooth operation, speed, noise level' },
            { name: 'Desktop Size', weight: 1.6, description: 'Workspace area, depth for monitors' },
            { name: 'Features', weight: 1.4, description: 'Memory presets, cable management, controls' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs build quality and features' }
        ],
        specFields: ['height_range', 'desktop_size', 'weight_capacity', 'motor_type', 'memory_presets', 'adjustment_speed']
    },
    'ergonomic office chair': {
        name: 'Ergonomic Office Chairs',
        amazonCategory: 'furniture',
        searchTerms: ['office chair', 'ergonomic chair', 'desk chair'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 700, label: 'Mid-Range ($300-$700)' },
            high: { min: 700, max: null, label: 'Premium ($700+)' }
        },
        defaultCriteria: [
            { name: 'Lumbar Support', weight: 2.0, description: 'Adjustable lower back support, comfort' },
            { name: 'Adjustability', weight: 1.9, description: 'Seat height, armrests, tilt, headrest' },
            { name: 'Comfort & Cushioning', weight: 1.8, description: 'Seat padding, breathable materials' },
            { name: 'Build Quality', weight: 1.7, description: 'Materials, durability, weight capacity, warranty' },
            { name: 'Recline Function', weight: 1.5, description: 'Tilt range, tension control, locking' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and longevity' }
        ],
        specFields: ['lumbar_support', 'adjustments', 'weight_capacity', 'material', 'warranty_years', 'armrest_type']
    },
    'office desk': {
        name: 'Office Desks',
        amazonCategory: 'furniture',
        searchTerms: ['office desk', 'computer desk', 'home office desk'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Desktop Size', weight: 2.0, description: 'Work surface area, depth for monitors' },
            { name: 'Build Quality', weight: 1.8, description: 'Materials, stability, weight capacity' },
            { name: 'Storage & Organization', weight: 1.6, description: 'Drawers, shelves, cable management' },
            { name: 'Assembly', weight: 1.4, description: 'Ease of setup, instructions, time required' },
            { name: 'Style & Finish', weight: 1.3, description: 'Design aesthetics, material finishes' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs size and quality' }
        ],
        specFields: ['dimensions', 'material', 'weight_capacity', 'storage_options', 'cable_management', 'shape']
    },
    'sewing machine': {
        name: 'Sewing Machines',
        amazonCategory: 'home',
        searchTerms: ['sewing machine', 'computerized sewing machine', 'home sewing machine'],
        priceRanges: {
            low: { min: 80, max: 200, label: 'Budget ($80-$200)' },
            mid: { min: 200, max: 500, label: 'Mid-Range ($200-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Stitch Quality', weight: 2.0, description: 'Precision, consistency, fabric handling' },
            { name: 'Stitch Variety', weight: 1.7, description: 'Number of stitches, buttonhole options' },
            { name: 'Ease of Use', weight: 1.8, description: 'Threading, bobbin, controls, learning curve' },
            { name: 'Features', weight: 1.6, description: 'Automatic features, speed control, LED light' },
            { name: 'Build Quality', weight: 1.5, description: 'Frame material, durability, motor power' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs capabilities and durability' }
        ],
        specFields: ['stitch_count', 'buttonholes', 'speed', 'frame_material', 'automatic_features', 'accessory_storage']
    },
    
    // ========================================
    // Baby, Kids & Pet Categories
    // ========================================
    'baby car seat': {
        name: 'Baby Car Seats',
        amazonCategory: 'baby',
        searchTerms: ['car seat', 'infant car seat', 'convertible car seat'],
        priceRanges: {
            low: { min: 80, max: 150, label: 'Budget ($80-$150)' },
            mid: { min: 150, max: 300, label: 'Mid-Range ($150-$300)' },
            high: { min: 300, max: null, label: 'Premium ($300+)' }
        },
        defaultCriteria: [
            { name: 'Safety Ratings', weight: 2.0, description: 'Crash test scores, NHTSA ratings, certifications' },
            { name: 'Ease of Installation', weight: 1.8, description: 'LATCH, base system, secure fit indicators' },
            { name: 'Comfort & Support', weight: 1.7, description: 'Padding, headrest, recline positions' },
            { name: 'Growth Range', weight: 1.6, description: 'Weight/height limits, convertible options' },
            { name: 'Material Quality', weight: 1.5, description: 'Fabric, cleaning, durability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs safety and longevity' }
        ],
        specFields: ['type', 'weight_limits', 'height_limits', 'safety_ratings', 'installation_type', 'recline_positions']
    },
    'baby monitor': {
        name: 'Baby Monitors',
        amazonCategory: 'baby',
        searchTerms: ['baby monitor', 'video baby monitor', 'baby camera'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Video Quality', weight: 2.0, description: 'Resolution, night vision, zoom capability' },
            { name: 'Range & Connectivity', weight: 1.8, description: 'Signal range, WiFi vs dedicated, reliability' },
            { name: 'Features', weight: 1.7, description: 'Two-way audio, temperature, lullabies, alerts' },
            { name: 'Battery Life', weight: 1.6, description: 'Parent unit runtime, power options' },
            { name: 'Privacy & Security', weight: 1.6, description: 'Encryption, secure connection' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and reliability' }
        ],
        specFields: ['video_resolution', 'connection_type', 'range', 'night_vision', 'two_way_audio', 'temperature_sensor']
    },
    'baby stroller': {
        name: 'Baby Strollers',
        amazonCategory: 'baby',
        searchTerms: ['stroller', 'baby stroller', 'jogging stroller'],
        priceRanges: {
            low: { min: 100, max: 250, label: 'Budget ($100-$250)' },
            mid: { min: 250, max: 500, label: 'Mid-Range ($250-$500)' },
            high: { min: 500, max: null, label: 'Premium ($500+)' }
        },
        defaultCriteria: [
            { name: 'Maneuverability', weight: 2.0, description: 'Steering, turning radius, one-hand push' },
            { name: 'Folding & Storage', weight: 1.8, description: 'Compact fold, self-standing, trunk fit' },
            { name: 'Comfort', weight: 1.7, description: 'Seat padding, recline, canopy, suspension' },
            { name: 'Build Quality', weight: 1.7, description: 'Frame durability, wheels, weight capacity' },
            { name: 'Features', weight: 1.5, description: 'Storage basket, cup holders, adapters' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and longevity' }
        ],
        specFields: ['stroller_type', 'weight_capacity', 'folded_dimensions', 'wheel_type', 'recline_positions', 'canopy']
    },
    'board game': {
        name: 'Board Games',
        amazonCategory: 'toys',
        searchTerms: ['board game', 'strategy game', 'family board game'],
        priceRanges: {
            low: { min: 15, max: 35, label: 'Budget ($15-$35)' },
            mid: { min: 35, max: 60, label: 'Mid-Range ($35-$60)' },
            high: { min: 60, max: null, label: 'Premium ($60+)' }
        },
        defaultCriteria: [
            { name: 'Fun Factor', weight: 2.0, description: 'Engagement, replayability, excitement' },
            { name: 'Player Count', weight: 1.7, description: 'Min/max players, scales well' },
            { name: 'Complexity', weight: 1.8, description: 'Learning curve, rules clarity, age appropriateness' },
            { name: 'Play Time', weight: 1.6, description: 'Session length, fits available time' },
            { name: 'Component Quality', weight: 1.4, description: 'Pieces, board, card quality, durability' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs replayability and quality' }
        ],
        specFields: ['player_count', 'play_time', 'age_rating', 'complexity', 'category', 'expansion_available']
    },
    'automatic pet feeder': {
        name: 'Automatic Pet Feeders',
        amazonCategory: 'pet-supplies',
        searchTerms: ['automatic pet feeder', 'automatic cat feeder', 'automatic dog feeder'],
        priceRanges: {
            low: { min: 30, max: 80, label: 'Budget ($30-$80)' },
            mid: { min: 80, max: 150, label: 'Mid-Range ($80-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Portion Control', weight: 2.0, description: 'Accurate dispensing, customizable portions' },
            { name: 'Capacity', weight: 1.8, description: 'Days of food storage, suitable for trips' },
            { name: 'Reliability', weight: 1.8, description: 'Consistent operation, jam prevention, backup power' },
            { name: 'Programming', weight: 1.6, description: 'Schedule flexibility, multiple meals, app control' },
            { name: 'Cleaning', weight: 1.5, description: 'Dishwasher safe, easy disassembly' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and reliability' }
        ],
        specFields: ['capacity', 'portions_per_day', 'connectivity', 'power_source', 'voice_recording', 'bowl_material']
    },
    'dog bed': {
        name: 'Dog Beds',
        amazonCategory: 'pet-supplies',
        searchTerms: ['dog bed', 'orthopedic dog bed', 'pet bed'],
        priceRanges: {
            low: { min: 25, max: 60, label: 'Budget ($25-$60)' },
            mid: { min: 60, max: 150, label: 'Mid-Range ($60-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Comfort & Support', weight: 2.0, description: 'Cushioning, orthopedic foam, joint support' },
            { name: 'Size & Fit', weight: 1.8, description: 'Suitable for dog size, sleeping style' },
            { name: 'Durability', weight: 1.7, description: 'Chew-resistant, quality stitching, longevity' },
            { name: 'Washability', weight: 1.7, description: 'Machine washable, removable cover, easy cleaning' },
            { name: 'Material Quality', weight: 1.5, description: 'Fabric, fill, non-toxic, odor resistant' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs durability and comfort' }
        ],
        specFields: ['size', 'foam_type', 'cover_material', 'washable', 'bolster', 'warranty']
    },
    'dog food': {
        name: 'Dog Food',
        amazonCategory: 'pet-supplies',
        searchTerms: ['dog food', 'dry dog food', 'premium dog food'],
        priceRanges: {
            low: { min: 20, max: 50, label: 'Budget ($20-$50)' },
            mid: { min: 50, max: 80, label: 'Mid-Range ($50-$80)' },
            high: { min: 80, max: null, label: 'Premium ($80+)' }
        },
        defaultCriteria: [
            { name: 'Nutritional Quality', weight: 2.0, description: 'Protein content, ingredients quality, AAFCO compliance' },
            { name: 'Ingredient Sourcing', weight: 1.8, description: 'Real meat, whole grains, no fillers, transparency' },
            { name: 'Dog Size/Age Suitability', weight: 1.7, description: 'Formulated for life stage, breed size' },
            { name: 'Digestibility', weight: 1.6, description: 'No common allergens, stomach sensitivity' },
            { name: 'Palatability', weight: 1.5, description: 'Dogs enjoy eating it, consistent intake' },
            { name: 'Value for Money', weight: 1.5, description: 'Cost per day vs nutritional quality' }
        ],
        specFields: ['protein_percentage', 'life_stage', 'breed_size', 'special_diet', 'bag_size', 'grain_free']
    },
    'cat litter box': {
        name: 'Self-Cleaning Cat Litter Boxes',
        amazonCategory: 'pet-supplies',
        searchTerms: ['self cleaning litter box', 'automatic litter box', 'robot litter box'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 400, label: 'Mid-Range ($150-$400)' },
            high: { min: 400, max: null, label: 'Premium ($400+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Mechanism', weight: 2.0, description: 'Rake, rotating, sifting - effectiveness and reliability' },
            { name: 'Odor Control', weight: 1.8, description: 'Sealed waste compartment, carbon filters' },
            { name: 'Size & Capacity', weight: 1.7, description: 'Suitable for cat size, litter capacity, waste bin' },
            { name: 'Litter Compatibility', weight: 1.6, description: 'Clumping, crystal, clay - which types work' },
            { name: 'Noise Level', weight: 1.5, description: 'Quiet operation, won\'t scare cats' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and maintenance costs' }
        ],
        specFields: ['cleaning_type', 'size', 'litter_type', 'waste_capacity', 'power_source', 'connectivity']
    },
    
    // ========================================
    // Automotive Categories
    // ========================================
    'car battery': {
        name: 'Car Batteries',
        amazonCategory: 'automotive',
        searchTerms: ['car battery', 'automotive battery', 'agm battery'],
        priceRanges: {
            low: { min: 80, max: 150, label: 'Budget ($80-$150)' },
            mid: { min: 150, max: 250, label: 'Mid-Range ($150-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Cold Cranking Amps', weight: 2.0, description: 'Starting power in cold weather' },
            { name: 'Reserve Capacity', weight: 1.8, description: 'Runtime without alternator' },
            { name: 'Warranty', weight: 1.7, description: 'Free replacement period, prorated coverage' },
            { name: 'Brand Reliability', weight: 1.6, description: 'Track record, failure rates, reviews' },
            { name: 'Maintenance', weight: 1.4, description: 'Maintenance-free vs serviceable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs longevity and performance' }
        ],
        specFields: ['cca', 'reserve_capacity', 'group_size', 'battery_type', 'warranty_years', 'maintenance']
    },
    'car dash cam': {
        name: 'Car Dash Cams',
        amazonCategory: 'automotive',
        searchTerms: ['dash cam', 'dashboard camera', 'car camera'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 250, label: 'Mid-Range ($100-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/1440p/1080p resolution, night vision, HDR' },
            { name: 'Field of View', weight: 1.7, description: 'Wide angle coverage, dual camera options' },
            { name: 'Reliability', weight: 1.8, description: 'Heat tolerance, build quality, loop recording' },
            { name: 'Features', weight: 1.6, description: 'GPS, parking mode, G-sensor, WiFi' },
            { name: 'Storage & Mounting', weight: 1.4, description: 'Max SD card, adhesive quality, wire routing' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and video quality' }
        ],
        specFields: ['resolution', 'field_of_view', 'fps', 'gps', 'parking_mode', 'storage_capacity']
    },
    'car floor mat': {
        name: 'Car Floor Mats',
        amazonCategory: 'automotive',
        searchTerms: ['car floor mats', 'all weather floor mats', 'car mat liners'],
        priceRanges: {
            low: { min: 30, max: 70, label: 'Budget ($30-$70)' },
            mid: { min: 70, max: 150, label: 'Mid-Range ($70-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Coverage & Fit', weight: 2.0, description: 'Custom-fit, raised edges, footwell coverage' },
            { name: 'Material Quality', weight: 1.8, description: 'Durability, weather resistance, easy clean' },
            { name: 'Protection Level', weight: 1.7, description: 'Waterproof, dirt containment, carpet protection' },
            { name: 'Retention System', weight: 1.6, description: 'Hooks, clips, non-slip backing' },
            { name: 'Ease of Cleaning', weight: 1.5, description: 'Removable, hose-washable, maintenance' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs coverage and durability' }
        ],
        specFields: ['material', 'rows_covered', 'custom_fit', 'edge_height', 'retention_type', 'color_options']
    },
    'car jump starter': {
        name: 'Car Jump Starters',
        amazonCategory: 'automotive',
        searchTerms: ['jump starter', 'portable jump starter', 'battery booster'],
        priceRanges: {
            low: { min: 40, max: 80, label: 'Budget ($40-$80)' },
            mid: { min: 80, max: 150, label: 'Mid-Range ($80-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Peak Amps', weight: 2.0, description: 'Starting power for engine size, CCA rating' },
            { name: 'Battery Capacity', weight: 1.8, description: 'mAh, number of jumps per charge' },
            { name: 'Safety Features', weight: 1.7, description: 'Reverse polarity, overcharge, spark protection' },
            { name: 'Additional Features', weight: 1.6, description: 'USB charging, flashlight, air compressor' },
            { name: 'Portability', weight: 1.4, description: 'Size, weight, case included' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        specFields: ['peak_amps', 'capacity', 'engine_size', 'usb_ports', 'flashlight', 'compressor']
    },
    'car phone mount': {
        name: 'Car Phone Mounts',
        amazonCategory: 'automotive',
        searchTerms: ['phone mount', 'car phone holder', 'phone car mount'],
        priceRanges: {
            low: { min: 10, max: 25, label: 'Budget ($10-$25)' },
            mid: { min: 25, max: 50, label: 'Mid-Range ($25-$50)' },
            high: { min: 50, max: null, label: 'Premium ($50+)' }
        },
        defaultCriteria: [
            { name: 'Stability & Grip', weight: 2.0, description: 'Holds phone securely, no vibration, strong grip' },
            { name: 'Mounting Location', weight: 1.8, description: 'Dashboard, windshield, vent, CD slot options' },
            { name: 'Adjustability', weight: 1.7, description: 'Viewing angles, rotation, telescoping arm' },
            { name: 'Phone Compatibility', weight: 1.6, description: 'Size range, case-friendly, thickness' },
            { name: 'Ease of Use', weight: 1.5, description: 'One-hand operation, quick release' },
            { name: 'Value for Money', weight: 1.4, description: 'Price vs quality and features' }
        ],
        specFields: ['mount_type', 'grip_type', 'phone_size_range', 'rotation', 'one_hand_operation', 'charging']
    },
    'obd-ii scanner': {
        name: 'OBD-II Scanners',
        amazonCategory: 'automotive',
        searchTerms: ['obd2 scanner', 'code reader', 'car diagnostic tool'],
        priceRanges: {
            low: { min: 20, max: 60, label: 'Basic ($20-$60)' },
            mid: { min: 60, max: 200, label: 'Mid-Range ($60-$200)' },
            high: { min: 200, max: null, label: 'Professional ($200+)' }
        },
        defaultCriteria: [
            { name: 'Diagnostic Capability', weight: 2.0, description: 'Code reading, live data, systems covered' },
            { name: 'Ease of Use', weight: 1.8, description: 'Interface clarity, instructions, Bluetooth vs wired' },
            { name: 'Vehicle Compatibility', weight: 1.7, description: 'Works with your car make/model/year' },
            { name: 'Features', weight: 1.6, description: 'Code definitions, freeze frame, smog check' },
            { name: 'Build Quality', weight: 1.4, description: 'Durability, screen quality, cable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs functionality depth' }
        ],
        specFields: ['connection_type', 'protocols', 'live_data', 'graph_capability', 'update_method', 'screen_size']
    },
    'portable tire inflator': {
        name: 'Portable Tire Inflators',
        amazonCategory: 'automotive',
        searchTerms: ['tire inflator', 'air compressor', 'portable air pump'],
        priceRanges: {
            low: { min: 25, max: 50, label: 'Budget ($25-$50)' },
            mid: { min: 50, max: 100, label: 'Mid-Range ($50-$100)' },
            high: { min: 100, max: null, label: 'Premium ($100+)' }
        },
        defaultCriteria: [
            { name: 'Inflation Speed', weight: 2.0, description: 'PSI per minute, tire fill time' },
            { name: 'Max PSI', weight: 1.8, description: 'Pressure capability for SUVs, trucks, bikes' },
            { name: 'Power Source', weight: 1.7, description: 'Battery, 12V car, AC, versatility' },
            { name: 'Accuracy & Features', weight: 1.6, description: 'Digital gauge, auto-shutoff, preset PSI' },
            { name: 'Portability', weight: 1.5, description: 'Size, weight, storage case' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and durability' }
        ],
        specFields: ['max_psi', 'cfm', 'power_source', 'gauge_type', 'auto_shutoff', 'weight']
    },
    
    // ========================================
    // Personal Care & Beauty Categories
    // ========================================
    'electric toothbrush': {
        name: 'Electric Toothbrushes',
        amazonCategory: 'beauty',
        searchTerms: ['electric toothbrush', 'power toothbrush', 'rechargeable toothbrush'],
        priceRanges: {
            low: { min: 25, max: 70, label: 'Budget ($25-$70)' },
            mid: { min: 70, max: 150, label: 'Mid-Range ($70-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Cleaning Performance', weight: 2.0, description: 'Plaque removal, brushing technology, clinical results' },
            { name: 'Battery Life', weight: 1.7, description: 'Days per charge, charging method' },
            { name: 'Brush Modes', weight: 1.6, description: 'Sensitive, whitening, gum care options' },
            { name: 'Smart Features', weight: 1.5, description: 'App connectivity, pressure sensor, timer' },
            { name: 'Replacement Cost', weight: 1.6, description: 'Brush head prices, replacement frequency' },
            { name: 'Value for Money', weight: 1.5, description: 'Initial + ongoing costs vs performance' }
        ],
        specFields: ['brushing_technology', 'modes', 'battery_life', 'pressure_sensor', 'timer', 'travel_case']
    },
    'electric shaver': {
        name: 'Electric Shavers',
        amazonCategory: 'beauty',
        searchTerms: ['electric shaver', 'electric razor', 'mens shaver'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 250, label: 'Mid-Range ($100-$250)' },
            high: { min: 250, max: null, label: 'Premium ($250+)' }
        },
        defaultCriteria: [
            { name: 'Shave Closeness', weight: 2.0, description: 'Cut quality, smooth finish, irritation level' },
            { name: 'Comfort', weight: 1.8, description: 'Skin sensitivity, no nicks, pivoting heads' },
            { name: 'Battery & Runtime', weight: 1.6, description: 'Cordless minutes, quick charge, wet/dry' },
            { name: 'Ease of Cleaning', weight: 1.6, description: 'Washable, cleaning station, maintenance' },
            { name: 'Versatility', weight: 1.5, description: 'Trimmer attachment, facial hair, body use' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and longevity' }
        ],
        specFields: ['head_type', 'blades_count', 'battery_runtime', 'waterproof', 'cleaning_station', 'trimmer']
    },
    'hair dryer': {
        name: 'Hair Dryers',
        amazonCategory: 'beauty',
        searchTerms: ['hair dryer', 'blow dryer', 'ionic hair dryer'],
        priceRanges: {
            low: { min: 20, max: 60, label: 'Budget ($20-$60)' },
            mid: { min: 60, max: 150, label: 'Mid-Range ($60-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Drying Speed', weight: 2.0, description: 'Wattage, airflow power, time to dry' },
            { name: 'Heat Settings', weight: 1.7, description: 'Temperature options, cool shot, control' },
            { name: 'Hair Health', weight: 1.8, description: 'Ionic, ceramic, tourmaline technology, frizz reduction' },
            { name: 'Weight & Ergonomics', weight: 1.6, description: 'Comfortable to hold, balance, fatigue' },
            { name: 'Attachments', weight: 1.4, description: 'Concentrator, diffuser, comb nozzles' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and durability' }
        ],
        specFields: ['wattage', 'heat_settings', 'ionic', 'weight', 'cord_length', 'attachments']
    },
    'hair straightener': {
        name: 'Hair Straighteners',
        amazonCategory: 'beauty',
        searchTerms: ['hair straightener', 'flat iron', 'hair iron'],
        priceRanges: {
            low: { min: 20, max: 60, label: 'Budget ($20-$60)' },
            mid: { min: 60, max: 150, label: 'Mid-Range ($60-$150)' },
            high: { min: 150, max: null, label: 'Premium ($150+)' }
        },
        defaultCriteria: [
            { name: 'Straightening Performance', weight: 2.0, description: 'Single-pass smoothing, lasting results' },
            { name: 'Plate Material', weight: 1.8, description: 'Ceramic, titanium, tourmaline - heat distribution' },
            { name: 'Heat-Up Time', weight: 1.6, description: 'Seconds to reach temperature, temperature range' },
            { name: 'Hair Protection', weight: 1.7, description: 'Even heat, no hot spots, adjustable temperature' },
            { name: 'Plate Width', weight: 1.5, description: 'Suitable for hair length and thickness' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and longevity' }
        ],
        specFields: ['plate_material', 'plate_width', 'temp_range', 'heat_up_time', 'auto_shutoff', 'ionic']
    },
    'curling iron': {
        name: 'Curling Irons',
        amazonCategory: 'beauty',
        searchTerms: ['curling iron', 'curling wand', 'hair curler'],
        priceRanges: {
            low: { min: 15, max: 50, label: 'Budget ($15-$50)' },
            mid: { min: 50, max: 120, label: 'Mid-Range ($50-$120)' },
            high: { min: 120, max: null, label: 'Premium ($120+)' }
        },
        defaultCriteria: [
            { name: 'Curl Quality', weight: 2.0, description: 'Defined curls, bounce, lasting hold' },
            { name: 'Barrel Material', weight: 1.7, description: 'Ceramic, titanium, tourmaline - heat distribution' },
            { name: 'Barrel Size', weight: 1.8, description: 'Suitable for desired curl type, hair length' },
            { name: 'Heat Settings', weight: 1.6, description: 'Temperature control, range, heat-up speed' },
            { name: 'Ease of Use', weight: 1.5, description: 'Clamp vs wand, swivel cord, cool tip' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs performance and features' }
        ],
        specFields: ['barrel_size', 'barrel_material', 'temp_settings', 'clamp_type', 'swivel_cord', 'heat_up_time']
    },
    
    // ========================================
    // Remaining Categories
    // ========================================
    'tent': {
        name: 'Camping Tents',
        amazonCategory: 'sports',
        searchTerms: ['tent', 'camping tent', 'backpacking tent'],
        priceRanges: {
            low: { min: 50, max: 150, label: 'Budget ($50-$150)' },
            mid: { min: 150, max: 350, label: 'Mid-Range ($150-$350)' },
            high: { min: 350, max: null, label: 'Premium ($350+)' }
        },
        defaultCriteria: [
            { name: 'Weather Protection', weight: 2.0, description: 'Waterproofing, wind resistance, rainfly quality' },
            { name: 'Capacity & Space', weight: 1.8, description: 'Sleeps count, interior room, vestibule space' },
            { name: 'Setup Ease', weight: 1.7, description: 'Assembly time, pole system, instructions' },
            { name: 'Durability', weight: 1.7, description: 'Fabric quality, pole strength, zipper reliability' },
            { name: 'Ventilation', weight: 1.5, description: 'Airflow, condensation management, mesh panels' },
            { name: 'Weight & Portability', weight: 1.6, description: 'Packed size, carry weight, backpacking vs car camping' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and features' }
        ],
        specFields: ['capacity', 'seasons', 'weight', 'floor_area', 'peak_height', 'doors']
    },
    'grill': {
        name: 'Grills',
        amazonCategory: 'home-garden',
        searchTerms: ['grill', 'bbq grill', 'gas grill', 'charcoal grill', 'pellet grill'],
        priceRanges: {
            low: { min: 100, max: 300, label: 'Budget ($100-$300)' },
            mid: { min: 300, max: 800, label: 'Mid-Range ($300-$800)' },
            high: { min: 800, max: null, label: 'Premium ($800+)' }
        },
        defaultCriteria: [
            { name: 'Cooking Performance', weight: 2.0, description: 'Heat distribution, temperature control, searing capability' },
            { name: 'Fuel Type', weight: 1.8, description: 'Gas (convenience), charcoal (flavor), pellet (versatility)' },
            { name: 'Cooking Area', weight: 1.7, description: 'Primary + warming rack square inches' },
            { name: 'Build Quality', weight: 1.7, description: 'Materials, durability, weather resistance, warranty' },
            { name: 'Features', weight: 1.5, description: 'Side burner, rotisserie, temperature gauge, storage' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs cooking area and features' }
        ],
        specFields: ['fuel_type', 'cooking_area', 'burners', 'btus', 'material', 'side_burner']
    },
    'mattress': {
        name: 'Mattresses',
        amazonCategory: 'home-garden',
        searchTerms: ['mattress', 'memory foam mattress', 'hybrid mattress'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Comfort & Support', weight: 2.0, description: 'Pressure relief, spinal alignment, sleep position suitability' },
            { name: 'Firmness Level', weight: 1.9, description: 'Soft, medium, firm - matches preference and body type' },
            { name: 'Motion Isolation', weight: 1.7, description: 'Partner disturbance, quiet, stability' },
            { name: 'Temperature Regulation', weight: 1.6, description: 'Cooling features, breathability, hot sleeper friendly' },
            { name: 'Durability & Warranty', weight: 1.6, description: 'Expected lifespan, warranty length, quality materials' },
            { name: 'Trial Period', weight: 1.5, description: 'Sleep trial length, return policy, hassle-free' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and longevity' }
        ],
        specFields: ['type', 'firmness', 'thickness', 'materials', 'trial_nights', 'warranty_years']
    },
    'outdoor patio furniture': {
        name: 'Outdoor Patio Furniture',
        amazonCategory: 'home-garden',
        searchTerms: ['patio furniture', 'outdoor furniture set', 'patio set'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Weather Resistance', weight: 2.0, description: 'UV, rain, fade resistance, rust-proof' },
            { name: 'Material Quality', weight: 1.8, description: 'Wicker, aluminum, teak, poly lumber durability' },
            { name: 'Comfort', weight: 1.7, description: 'Cushion quality, ergonomics, seating depth' },
            { name: 'Set Completeness', weight: 1.6, description: 'Pieces included, serves group size' },
            { name: 'Maintenance', weight: 1.5, description: 'Cleaning ease, cushion storage, upkeep' },
            { name: 'Style & Aesthetics', weight: 1.4, description: 'Design appeal, color options, modern/traditional' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs quality and longevity' }
        ],
        specFields: ['material', 'pieces_count', 'seating_capacity', 'cushion_included', 'weather_resistant', 'assembly']
    },
    'backup power station': {
        name: 'Backup Power Stations',
        amazonCategory: 'electronics',
        searchTerms: ['portable power station', 'battery generator', 'solar generator'],
        priceRanges: {
            low: { min: 200, max: 500, label: 'Budget ($200-$500)' },
            mid: { min: 500, max: 1200, label: 'Mid-Range ($500-$1,200)' },
            high: { min: 1200, max: null, label: 'Premium ($1,200+)' }
        },
        defaultCriteria: [
            { name: 'Capacity', weight: 2.0, description: 'Watt-hours, devices charged, runtime' },
            { name: 'Output Ports', weight: 1.8, description: 'AC outlets, USB-A, USB-C, DC, variety' },
            { name: 'Charging Speed', weight: 1.7, description: 'Recharge time, solar capable, passthrough' },
            { name: 'Power Output', weight: 1.8, description: 'Max watts, surge capacity, handles devices' },
            { name: 'Portability', weight: 1.5, description: 'Weight, size, handle, truly portable' },
            { name: 'Value for Money', weight: 1.5, description: 'Price per Wh capacity and features' }
        ],
        specFields: ['capacity_wh', 'ac_outlets', 'max_output', 'recharge_time', 'solar_input', 'weight']
    },
    'generator': {
        name: 'Generators',
        amazonCategory: 'home-garden',
        searchTerms: ['generator', 'portable generator', 'inverter generator'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Professional ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Power Output', weight: 2.0, description: 'Starting and running watts, sufficient for needs' },
            { name: 'Fuel Efficiency', weight: 1.8, description: 'Runtime per tank, fuel consumption, economy mode' },
            { name: 'Noise Level', weight: 1.7, description: 'Decibels, inverter vs conventional, quiet operation' },
            { name: 'Portability', weight: 1.6, description: 'Weight, wheels, handles, easy to move' },
            { name: 'Features', weight: 1.5, description: 'Electric start, outlets, USB, inverter technology' },
            { name: 'Reliability', weight: 1.7, description: 'Brand reputation, build quality, warranty' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs power and features' }
        ],
        specFields: ['running_watts', 'starting_watts', 'runtime', 'fuel_type', 'noise_level', 'inverter']
    },
    'cordless drill': {
        name: 'Cordless Drills',
        amazonCategory: 'tools',
        searchTerms: ['cordless drill', 'power drill', 'drill driver'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Professional ($200+)' }
        },
        defaultCriteria: [
            { name: 'Power & Torque', weight: 2.0, description: 'Voltage, max torque, drilling capacity' },
            { name: 'Battery Life', weight: 1.8, description: 'Amp-hours, runtime, batteries included' },
            { name: 'Versatility', weight: 1.7, description: 'Drill/driver modes, hammer function, speed settings' },
            { name: 'Chuck Size', weight: 1.5, description: '1/2" vs 3/8", keyless, bit compatibility' },
            { name: 'Ergonomics', weight: 1.6, description: 'Weight, grip, balance, comfort' },
            { name: 'Value for Money', weight: 1.5, description: 'Kit contents, price vs performance' }
        ],
        specFields: ['voltage', 'torque', 'chuck_size', 'battery_ah', 'speed_settings', 'brushless']
    },
    'streaming media player': {
        name: 'Streaming Media Players',
        amazonCategory: 'electronics',
        searchTerms: ['streaming device', 'roku', 'fire tv stick', 'apple tv'],
        priceRanges: {
            low: { min: 25, max: 60, label: 'Budget ($25-$60)' },
            mid: { min: 60, max: 130, label: 'Mid-Range ($60-$130)' },
            high: { min: 130, max: null, label: 'Premium ($130+)' }
        },
        defaultCriteria: [
            { name: 'Content Access', weight: 2.0, description: 'App availability, services supported, library' },
            { name: 'Video Quality', weight: 1.8, description: '4K, HDR, Dolby Vision, frame rates' },
            { name: 'Performance', weight: 1.7, description: 'Speed, responsiveness, no lag, smooth navigation' },
            { name: 'Remote & Control', weight: 1.6, description: 'Voice control, ergonomics, TV power/volume' },
            { name: 'Interface', weight: 1.5, description: 'Ease of use, search, recommendations' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs features and performance' }
        ],
        specFields: ['resolution', 'hdr_support', 'processor', 'storage', 'voice_assistant', 'remote_type']
    },
    'microphone': {
        name: 'USB Microphones',
        amazonCategory: 'electronics',
        searchTerms: ['usb microphone', 'podcast microphone', 'streaming microphone'],
        priceRanges: {
            low: { min: 40, max: 100, label: 'Budget ($40-$100)' },
            mid: { min: 100, max: 200, label: 'Mid-Range ($100-$200)' },
            high: { min: 200, max: null, label: 'Premium ($200+)' }
        },
        defaultCriteria: [
            { name: 'Audio Quality', weight: 2.0, description: 'Clarity, warmth, frequency response, bit depth' },
            { name: 'Polar Pattern', weight: 1.7, description: 'Cardioid, omnidirectional options, background rejection' },
            { name: 'Ease of Use', weight: 1.8, description: 'Plug-and-play, controls, headphone monitoring' },
            { name: 'Build Quality', weight: 1.6, description: 'Materials, stability, durability, included mount' },
            { name: 'Features', weight: 1.5, description: 'Mute button, gain control, LED indicators' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs audio quality and features' }
        ],
        specFields: ['sample_rate', 'bit_depth', 'polar_pattern', 'frequency_response', 'connection', 'monitoring']
    },
    'digital piano': {
        name: 'Digital Pianos',
        amazonCategory: 'musical-instruments',
        searchTerms: ['digital piano', 'electric piano', '88 key keyboard'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Key Action', weight: 2.0, description: 'Weighted keys, hammer action, realistic feel' },
            { name: 'Sound Quality', weight: 1.9, description: 'Piano samples, speaker quality, polyphony' },
            { name: 'Key Count', weight: 1.7, description: '88 keys (full), 76, or 61 keys' },
            { name: 'Features', weight: 1.6, description: 'Voices, recording, metronome, lesson functions' },
            { name: 'Connectivity', weight: 1.5, description: 'MIDI, USB, headphones, app integration' },
            { name: 'Build Quality', weight: 1.5, description: 'Durability, stand included, pedals' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs key action and sound' }
        ],
        specFields: ['keys', 'action_type', 'polyphony', 'voices', 'connectivity', 'speakers']
    },
    'home security camera': {
        name: 'Home Security Camera Systems',
        amazonCategory: 'electronics',
        searchTerms: ['security camera system', 'nvr system', 'surveillance camera'],
        priceRanges: {
            low: { min: 150, max: 400, label: 'Budget ($150-$400)' },
            mid: { min: 400, max: 1000, label: 'Mid-Range ($400-$1,000)' },
            high: { min: 1000, max: null, label: 'Premium ($1,000+)' }
        },
        defaultCriteria: [
            { name: 'Video Quality', weight: 2.0, description: '4K/1080p resolution, night vision, HDR' },
            { name: 'Storage Options', weight: 1.8, description: 'Local NVR, cloud, subscription costs, capacity' },
            { name: 'Smart Detection', weight: 1.7, description: 'Person, vehicle, package detection, zones' },
            { name: 'Coverage', weight: 1.7, description: 'Number of cameras, field of view, placement' },
            { name: 'Reliability', weight: 1.6, description: 'Weatherproof, wired vs wireless, connectivity' },
            { name: 'Integration', weight: 1.5, description: 'Smart home, voice assistants, app quality' },
            { name: 'Value for Money', weight: 1.5, description: 'System + ongoing costs vs features' }
        ],
        specFields: ['resolution', 'cameras_included', 'storage_type', 'night_vision', 'poe', 'detection']
    },
    'smart scale': {
        name: 'Smart Scales',
        amazonCategory: 'health',
        searchTerms: ['smart scale', 'body composition scale', 'bluetooth scale'],
        priceRanges: {
            low: { min: 20, max: 50, label: 'Budget ($20-$50)' },
            mid: { min: 50, max: 100, label: 'Mid-Range ($50-$100)' },
            high: { min: 100, max: null, label: 'Premium ($100+)' }
        },
        defaultCriteria: [
            { name: 'Measurement Accuracy', weight: 2.0, description: 'Weight precision, consistency, calibration' },
            { name: 'Body Metrics', weight: 1.8, description: 'Body fat %, muscle mass, BMI, bone density' },
            { name: 'App Quality', weight: 1.7, description: 'Data visualization, trends, goal tracking, insights' },
            { name: 'Multi-User Support', weight: 1.6, description: 'Automatic user recognition, family profiles' },
            { name: 'Integration', weight: 1.5, description: 'Apple Health, Google Fit, Fitbit sync' },
            { name: 'Value for Money', weight: 1.5, description: 'Price vs metrics and features' }
        ],
        specFields: ['max_weight', 'measurements', 'connectivity', 'users', 'battery_type', 'display']
    },
    'smart tv': {
        name: 'Smart TVs',
        amazonCategory: 'electronics',
        searchTerms: ['smart tv', '4k tv', 'led tv'],
        priceRanges: {
            low: { min: 200, max: 600, label: 'Budget ($200-$600)' },
            mid: { min: 600, max: 1500, label: 'Mid-Range ($600-$1,500)' },
            high: { min: 1500, max: null, label: 'Premium ($1,500+)' }
        },
        defaultCriteria: [
            { name: 'Picture Quality', weight: 2.0, description: '4K/8K, HDR, contrast, color accuracy, brightness' },
            { name: 'Screen Size', weight: 1.8, description: 'Suitable for room size and viewing distance' },
            { name: 'Smart Platform', weight: 1.7, description: 'OS responsiveness, app selection, updates' },
            { name: 'Gaming Features', weight: 1.5, description: 'HDMI 2.1, VRR, low latency, 120Hz' },
            { name: 'Audio Quality', weight: 1.4, description: 'Built-in speakers, Dolby Atmos support' },
            { name: 'Build & Design', weight: 1.3, description: 'Thin bezels, stand quality, VESA mount' },
            { name: 'Value for Money', weight: 1.6, description: 'Price per inch with feature set' }
        ],
        specFields: ['screen_size', 'resolution', 'panel_type', 'refresh_rate', 'hdr', 'smart_platform']
    }
};

/**
 * Get category configuration
 */
export function getCategoryConfig(category) {
    return CATEGORY_CONFIG[category] || null;
}

/**
 * Get all available categories
 */
export function getCategories() {
    return Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
        id,
        name: config.name
    }));
}

/**
 * AI-powered product research
 * Uses AI to find and analyze products based on category and criteria
 */
export async function researchProducts(category, options = {}) {
    const { 
        maxProducts = 5, 
        priceRange = null,
        specificQuery = null 
    } = options;
    
    const config = getCategoryConfig(category);
    if (!config && !specificQuery) {
        throw new Error(`Unknown category: ${category}`);
    }
    
    const categoryName = config?.name || 'Products';
    const searchContext = specificQuery || `top ${categoryName} in 2024-2025`;
    
    // Log price constraint for debugging
    if (priceRange) {
        console.log(`🎯 Price constraint active for ${categoryName}:`, priceRange);
    } else {
        console.log(`📊 No price constraint for ${categoryName} - showing all prices`);
    }
    
    // Build the combined prompt with system instructions
    const systemPrompt = getResearchSystemPrompt();
    const userPrompt = buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, config?.specFields);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    
    try {
        console.log(`🔍 Requesting AI to research ${maxProducts} ${categoryName} products...`);
        console.log(`📝 Prompt preview:`, userPrompt.substring(0, 300) + '...');
        
        // Use aiService.call() which handles the API request
        const response = await aiService.call(fullPrompt, { skipCache: true });
        
        console.log(`📦 AI returned product data, parsing...`);
        
        // Parse the AI response into product objects
        const products = parseProductResponse(response);
        
        console.log(`✨ Successfully parsed ${products.length} products from AI response`);
        
        // Convert to AffiliateProduct instances
        return products.map(p => new AffiliateProduct({
            ...p,
            amazonUrl: generateSearchLink(p.name) // Use search link based on product name
        }));
    } catch (error) {
        console.error('Product research error:', error);
        throw new Error('Failed to research products. Please try again.');
    }
}

/**
 * Get system prompt for product research
 */
function getResearchSystemPrompt() {
    return `You are an expert product researcher and tech analyst. Your job is to provide accurate, up-to-date information about consumer electronics and products.

When researching products:
1. Focus on popular, well-reviewed products available on Amazon
2. Include real product names and accurate specifications
3. Provide genuine pros and cons based on expert reviews
4. Use realistic Amazon star ratings (1-5 scale)
5. Include estimated prices (may vary)

IMPORTANT: Always respond with valid JSON. Do not include any text before or after the JSON array.`;
}

/**
 * Build research prompt for AI
 */
function buildResearchPrompt(categoryName, searchContext, maxProducts, priceRange, specFields) {
    let prompt = `Research and provide detailed information about ${maxProducts} top ${categoryName} products based on: "${searchContext}"

`;

    if (priceRange) {
        prompt += `IMPORTANT PRICE CONSTRAINT:\n`;
        if (priceRange.min && priceRange.max) {
            prompt += `- ONLY include products priced between $${priceRange.min} and $${priceRange.max}\n`;
        } else if (priceRange.min) {
            prompt += `- ONLY include products priced at $${priceRange.min} or higher\n`;
        } else if (priceRange.max) {
            prompt += `- ONLY include products priced up to $${priceRange.max}\n`;
        }
        
        // Handle excluded ranges (for non-contiguous selections like low + high)
        if (priceRange.excludeRanges && priceRange.excludeRanges.length > 0) {
            prompt += `- EXCLUDE products in these price ranges:\n`;
            priceRange.excludeRanges.forEach(range => {
                if (range.min && range.max) {
                    prompt += `  * $${range.min} to $${range.max}\n`;
                }
            });
        }
        
        prompt += `- Do NOT suggest products outside this price range under any circumstances\n\n`;
    }

    prompt += `For each product, provide:
1. name: Full product name (exact model/variant)
2. description: Brief 1-2 sentence description
3. price: Estimated price in USD (number only)
4. rating: Amazon star rating (1-5, can use decimals like 4.5)
5. reviewCount: Approximate number of reviews
6. imageUrl: Leave empty string ""
7. specs: Object with key specifications`;

    if (specFields && specFields.length > 0) {
        prompt += ` (include: ${specFields.join(', ')})`;
    }

    prompt += `
8. pros: Array of 3-4 key advantages
9. cons: Array of 2-3 notable drawbacks

Respond with a JSON array of products. Example format:
[
  {
    "name": "Product Name Model",
    "description": "Brief description",
    "price": 999,
    "rating": 4.5,
    "reviewCount": 1234,
    "imageUrl": "",
    "specs": {
      "processor": "Apple M3 Pro",
      "ram": "18GB"
    },
    "pros": ["Great battery life", "Excellent display"],
    "cons": ["Expensive", "Limited ports"]
  }
]

`;

    if (priceRange) {
        prompt += `CRITICAL REMINDER: All ${maxProducts} products MUST be within the specified price range. Do not include any products outside the price constraints.\n\n`;
    }

    prompt += `Provide exactly ${maxProducts} products, ranked by overall quality and popularity`;
    
    if (priceRange) {
        prompt += ` within the specified price range`;
    }
    
    prompt += `.`;

    return prompt;
}

/**
 * Parse AI response into product objects
 */
function parseProductResponse(response) {
    // Extract JSON from response (handle potential markdown code blocks)
    let jsonStr = response;
    
    // Try to extract JSON from code blocks
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
    } else {
        // Try to find JSON array directly
        const arrayMatch = response.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
            jsonStr = arrayMatch[0];
        }
    }
    
    try {
        const products = JSON.parse(jsonStr);
        
        if (!Array.isArray(products)) {
            throw new Error('Response is not an array');
        }
        
        // Validate and clean each product
        return products.map(p => ({
            name: p.name || 'Unknown Product',
            description: p.description || '',
            price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || null,
            rating: typeof p.rating === 'number' ? Math.min(5, Math.max(1, p.rating)) : null,
            reviewCount: parseInt(p.reviewCount) || 0,
            imageUrl: p.imageUrl || '',
            specs: p.specs || {},
            pros: Array.isArray(p.pros) ? p.pros : [],
            cons: Array.isArray(p.cons) ? p.cons : []
        }));
    } catch (error) {
        console.error('Failed to parse product response:', error, jsonStr);
        throw new Error('Failed to parse product data');
    }
}

/**
 * AI-powered product evaluation
 * Evaluates a product against specific criteria
 */
export async function evaluateProduct(product, criteria) {
    const prompt = `Evaluate the following product against specific criteria.

Product: ${product.name}
${product.description ? `Description: ${product.description}` : ''}
${product.specs ? `Specs: ${JSON.stringify(product.specs)}` : ''}
${product.pros?.length ? `Pros: ${product.pros.join(', ')}` : ''}
${product.cons?.length ? `Cons: ${product.cons.join(', ')}` : ''}
${product.rating ? `Amazon Rating: ${product.rating}/5 (${product.reviewCount} reviews)` : ''}

Rate this product on the following criteria using a 1-5 star scale:
- 1 star: Poor/Significantly below expectations
- 2 stars: Below average/Some major limitations  
- 3 stars: Average/Acceptable but not exceptional
- 4 stars: Good/Above average with minor limitations
- 5 stars: Excellent/Outstanding in this area

Criteria to evaluate:
${criteria.map((c, i) => `${i + 1}. ${c.name}: ${c.description || ''}`).join('\n')}

IMPORTANT: Use the FULL range (1-5). Don't cluster all scores around 3-4. Be decisive and differentiate clearly between products. A product can excel in one area (5 stars) and be weak in another (1-2 stars). This helps users understand real trade-offs. Reserve 5 stars for truly exceptional performance and use 1-2 stars for genuine weaknesses.

Respond with a JSON object containing ratings and brief explanations (2-3 sentences each):
{
  "ratings": {
    "criterion_id": { "value": 4, "explanation": "Brief reason" }
  }
}

Use the criterion names as keys (lowercase, underscores for spaces).`;

    try {
        const systemPrompt = 'You are a product evaluation expert. Provide accurate ratings based on product specifications and general knowledge. Always respond with valid JSON.';
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        const response = await aiService.call(fullPrompt);
        
        // Parse response
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1] || jsonMatch[0];
        }
        
        const result = JSON.parse(jsonStr);
        
        // Map ratings back to criterion IDs
        const ratings = {};
        criteria.forEach(c => {
            const key = c.name.toLowerCase().replace(/\s+/g, '_');
            if (result.ratings && result.ratings[key]) {
                ratings[c.id] = {
                    value: Math.min(5, Math.max(1, result.ratings[key].value)),
                    explanation: result.ratings[key].explanation || ''
                };
            }
        });
        
        return ratings;
    } catch (error) {
        console.error('Product evaluation error:', error);
        throw new Error('Failed to evaluate product');
    }
}

/**
 * AI-powered batch evaluation of all products
 */
export async function evaluateAllProducts(products, criteria) {
    const allScores = {};
    
    for (const product of products) {
        try {
            const ratings = await evaluateProduct(product, criteria);
            
            // Map ratings to product alternative ID
            const productId = product.id || product.name;
            allScores[productId] = {};
            
            Object.entries(ratings).forEach(([criterionId, scoreData]) => {
                allScores[productId][criterionId] = scoreData;
            });
        } catch (error) {
            console.error(`Failed to evaluate ${product.name}:`, error);
        }
    }
    
    return allScores;
}

/**
 * Get comparison insights between products
 */
export async function getProductComparison(products, criteria) {
    const productList = products.map(p => `- ${p.name}: ${p.description || ''}`).join('\n');
    const criteriaList = criteria.map(c => `- ${c.name} (weight: ${c.weight})`).join('\n');
    
    const prompt = `Compare these products for a buyer trying to make a decision:

Products:
${productList}

Criteria being evaluated:
${criteriaList}

Provide a comparison analysis in JSON format:
{
  "winner": "Product name that's the best overall choice",
  "winnerReason": "2-3 sentence explanation of why it wins",
  "tradeoffs": [
    "Key tradeoff 1 between options",
    "Key tradeoff 2"
  ],
  "buyerProfiles": {
    "Budget Buyer": "Which product and why",
    "Performance Seeker": "Which product and why",
    "Best Value": "Which product and why"
  },
  "watchOuts": ["Things the buyer should consider or verify"]
}`;

    try {
        const systemPrompt = 'You are a product comparison expert helping consumers make informed purchase decisions. Always respond with valid JSON.';
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        const response = await aiService.call(fullPrompt);
        
        let jsonStr = response;
        const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1] || jsonMatch[0];
        }
        
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Comparison analysis error:', error);
        throw new Error('Failed to generate comparison insights');
    }
}

export default {
    getCategoryConfig,
    getCategories,
    researchProducts,
    evaluateProduct,
    evaluateAllProducts,
    getProductComparison
};
