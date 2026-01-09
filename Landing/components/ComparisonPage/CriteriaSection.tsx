interface CriteriaItem {
  title: string;
  description: string;
}

interface CriteriaSectionProps {
  criteria: CriteriaItem[];
}

const CriteriaSection = ({ criteria }: CriteriaSectionProps) => {
  return (
    <section id="criteria" className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Key Comparison Criteria
              </h2>
              <p className="text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Our decision matrix helps you evaluate these critical factors
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          {criteria.map((item, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                className="wow fadeInUp group mb-8"
                data-wow-delay={`.${index + 1}s`}
              >
                <div className="rounded-lg bg-white p-6 shadow-one dark:bg-dark dark:shadow-three h-full">
                  <div className="mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      className="fill-current"
                    >
                      <path d="M16 3L4 9v11c0 7.3 5.1 14.1 12 16 6.9-1.9 12-8.7 12-16V9L16 3zm-1.5 21.5l-5-5 1.4-1.4 3.6 3.6 7.6-7.6 1.4 1.4-9 9z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CriteriaSection;
