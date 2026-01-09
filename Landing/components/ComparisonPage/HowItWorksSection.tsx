interface HowItWorksSectionProps {
  steps: string[];
}

const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                How Our Comparison Tool Works
              </h2>
              <p className="text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Make objective decisions in 5 simple steps
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="wow fadeInUp group mb-6 flex items-start"
                  data-wow-delay={`.${index + 1}s`}
                >
                  <div className="mr-4 flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
