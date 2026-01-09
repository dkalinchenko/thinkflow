import SectionTitle from "../Common/SectionTitle";

const Brands = () => {
  const useCases = [
    {
      id: 1,
      name: "Electronics",
      description: "Phones, Laptops, TVs",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" className="fill-current">
          <rect x="6" y="8" width="36" height="24" rx="2" opacity="0.3" />
          <rect x="6" y="8" width="36" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="24" y1="32" x2="24" y2="38" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Home Appliances",
      description: "Refrigerators, Washers",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" className="fill-current">
          <rect x="10" y="4" width="28" height="40" rx="2" opacity="0.3" />
          <rect x="10" y="4" width="28" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="11" r="2" fill="currentColor" />
          <circle cx="16" cy="28" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Fitness Gear",
      description: "Trackers, Equipment",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" className="fill-current">
          <path d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zm0 28c-6.617 0-12-5.383-12-12S17.383 12 24 12s12 5.383 12 12-5.383 12-12 12z" opacity="0.3" />
          <path d="M24 16c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Life Decisions",
      description: "Colleges, Jobs, Travel",
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" className="fill-current">
          <circle cx="24" cy="24" r="16" opacity="0.3" />
          <path d="M24 8c8.837 0 16 7.163 16 16s-7.163 16-16 16S8 32.837 8 24 15.163 8 24 8m0-2C13.507 6 6 13.507 6 24s7.507 18 18 18 18-7.507 18-18S34.493 6 24 6z" />
          <path d="M24 14v10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="use-cases" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Compare Anything"
          paragraph="OptiMind is flexible enough for any decision. From electronics to life choices, we've got you covered."
          center
          mb="50px"
        />
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="wow fadeInUp group relative overflow-hidden rounded-lg bg-white p-8 text-center shadow-one transition-all hover:shadow-two dark:bg-gray-dark dark:shadow-three dark:hover:shadow-gray-dark"
              data-wow-delay=".1s"
            >
              <div className="mb-6 flex justify-center text-primary transition-all group-hover:scale-110">
                {useCase.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                {useCase.name}
              </h3>
              <p className="text-base font-medium text-body-color">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-base font-medium text-body-color">
            Any time you have multiple options to weigh, OptiMind brings clarity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brands;
