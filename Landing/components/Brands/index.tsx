import SectionTitle from "../Common/SectionTitle";

const Brands = () => {
  const categories = [
    {
      id: 1,
      name: "💻 Tech & Electronics",
      templates: [
        { name: "Laptops", id: "laptop-comparison" },
        { name: "Smartphones", id: "smartphone-comparison" },
        { name: "Headphones", id: "headphones-comparison" },
        { name: "Cameras", id: "camera-comparison" },
        { name: "Smartwatches", id: "smartwatch-comparison" },
        { name: "Tablets", id: "tablet-comparison" },
      ],
    },
    {
      id: 2,
      name: "🏠 Home Appliances",
      templates: [
        { name: "Refrigerators", id: "refrigerator-comparison" },
        { name: "Washing Machines", id: "washing-machine-comparison" },
        { name: "Dishwashers", id: "dishwasher-comparison" },
        { name: "Vacuum Cleaners", id: "vacuum-comparison" },
        { name: "Air Purifiers", id: "air-purifier-comparison" },
        { name: "Coffee Makers", id: "coffee-maker-comparison" },
      ],
    },
    {
      id: 3,
      name: "🏋️ Fitness & Health",
      templates: [
        { name: "Treadmills", id: "treadmill-comparison" },
        { name: "Exercise Bikes", id: "exercise-bike-comparison" },
        { name: "Rowing Machines", id: "rowing-machine-comparison" },
        { name: "Ellipticals", id: "elliptical-comparison" },
        { name: "Fitness Trackers", id: "fitness-tracker-comparison" },
        { name: "Home Gyms", id: "home-gym-comparison" },
      ],
    },
  ];

  return (
    <section id="use-cases" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Start Comparing Products"
          paragraph="Click any category below to instantly start comparing products with AI-powered analysis"
          center
          mb="50px"
        />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="wow fadeInUp rounded-lg bg-white p-6 shadow-one dark:bg-gray-dark dark:shadow-three"
              data-wow-delay=".1s"
            >
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.templates.map((template) => {
                  // Map template IDs to comparison page slugs
                  const slugMap: Record<string, string> = {
                    'laptop-comparison': 'laptops',
                    'smartphone-comparison': 'smartphones',
                    'headphones-comparison': 'headphones',
                    'camera-comparison': 'cameras',
                    'smartwatch-comparison': 'smartwatches',
                    'tablet-comparison': 'tablets',
                    'refrigerator-comparison': 'refrigerators',
                    'washing-machine-comparison': 'washing-machines',
                    'dishwasher-comparison': 'dishwashers',
                    'vacuum-cleaner-comparison': 'vacuum-cleaners',
                    'air-purifier-comparison': 'air-purifiers',
                    'coffee-maker-comparison': 'coffee-makers',
                    'treadmill-comparison': 'treadmills',
                    'exercise-bike-comparison': 'exercise-bikes',
                    'rowing-machine-comparison': 'rowing-machines',
                    'fitness-tracker-comparison': 'fitness-trackers',
                    'yoga-mat-comparison': 'yoga-mats',
                    'home-gym-equipment-comparison': 'home-gyms',
                  };
                  
                  const slug = slugMap[template.id];
                  const href = slug ? `/compare/${slug}` : `/app.html?template=${template.id}`;
                  
                  return (
                    <a
                      key={template.id}
                      href={href}
                      className="inline-block rounded-md bg-gray-2 px-3 py-1.5 text-sm font-medium text-black transition-all hover:bg-primary hover:text-white dark:bg-dark dark:text-white dark:hover:bg-primary"
                    >
                      {template.name}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-base font-medium text-body-color">
            Or <a href="/app.html" className="text-primary hover:underline">launch the app</a> to create a custom comparison
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brands;
