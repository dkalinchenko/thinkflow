import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { getImagePath } from "@/lib/utils";

const Brands = () => {
  const categories = [
    {
      id: 1,
      name: "💻 Tech & Electronics",
      templates: [
        { 
          name: "Laptop Comparison", 
          id: "laptop-comparison", 
          icon: getImagePath("/images/icons/laptop.png"),
          description: "Compare laptop specifications, performance benchmarks, and prices using our weighted decision matrix calculator"
        },
        { 
          name: "Smartphone Comparison", 
          id: "smartphone-comparison", 
          icon: getImagePath("/images/icons/mobile-phone.png"),
          description: "Side-by-side smartphone comparison with camera quality, battery life, and feature analysis"
        },
        { 
          name: "Headphones Comparison", 
          id: "headphones-comparison", 
          icon: getImagePath("/images/icons/headphones.png"),
          description: "Compare headphones by sound quality, noise cancellation, comfort, and value using our selection matrix"
        },
      ],
    },
    {
      id: 2,
      name: "🏠 Home Appliances",
      templates: [
        { 
          name: "Vacuum Cleaner Comparison", 
          id: "vacuum-comparison", 
          icon: getImagePath("/images/icons/vacuum.png"),
          description: "Compare vacuum cleaners by suction power, filtration, and cleaning performance with our weighted scoring model"
        },
        { 
          name: "Air Purifier Comparison", 
          id: "air-purifier-comparison", 
          icon: getImagePath("/images/icons/air-purifier.png"),
          description: "Evaluate air purifiers using our decision matrix tool for HEPA filtration, coverage area, and noise levels"
        },
        { 
          name: "Coffee Maker Comparison", 
          id: "coffee-maker-comparison", 
          icon: getImagePath("/images/icons/coffee-machine.png"),
          description: "Compare coffee makers by brew quality, features, and ease of use with our product comparison tool"
        },
      ],
    },
    {
      id: 3,
      name: "🏋️ Fitness & Health",
      templates: [
        { 
          name: "Treadmill Comparison", 
          id: "treadmill-comparison", 
          icon: getImagePath("/images/icons/treadmill.png"),
          description: "Compare treadmills using our weighted decision matrix for motor power, running surface, and durability"
        },
        { 
          name: "Exercise Bike Comparison", 
          id: "exercise-bike-comparison", 
          icon: getImagePath("/images/icons/elliptical.png"),
          description: "Evaluate exercise bikes and ellipticals with our selection matrix tool for resistance, comfort, and features"
        },
        { 
          name: "Home Gym Equipment", 
          id: "home-gym-comparison", 
          icon: getImagePath("/images/icons/gym.png"),
          description: "Compare home gym equipment using our prioritization matrix for versatility, space efficiency, and value"
        },
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
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="wow fadeInUp rounded-lg bg-white p-8 shadow-one"
              data-wow-delay=".1s"
            >
              <h3 className="mb-6 text-2xl font-bold text-black">
                {category.name}
              </h3>
              <div className="space-y-6">
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
                    <div key={template.id} className="flex items-start gap-4">
                      <div className="flex h-[70px] w-[70px] flex-shrink-0 items-center justify-center rounded-md bg-primary bg-opacity-10">
                        <Image src={template.icon} alt={template.name} width={40} height={40} />
                      </div>
                      <div className="flex-1">
                        <a href={href} className="mb-2 block text-lg font-semibold text-black hover:text-primary">
                          {template.name}
                        </a>
                        <p className="text-sm text-body-color">{template.description}</p>
                      </div>
                    </div>
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
