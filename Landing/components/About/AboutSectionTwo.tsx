import { getImagePath } from "@/lib/utils";
import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src={getImagePath("/images/about/about-image-2.svg")}
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src={getImagePath("/images/about/about-image-2-dark.svg")}
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                How ThinkFlow Works
              </h2>
              <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg">
                Using ThinkFlow is quick and intuitive. Get from indecision to clarity in 6 simple steps:
              </p>
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">1</span>
                  Name Your Decision
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Describe what you&apos;re deciding &ndash; &ldquo;Best Laptop for Programming&rdquo; or &ldquo;Which Treadmill to Buy?&rdquo;
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">2</span>
                  List Your Criteria
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Enter factors that matter – performance, battery, price, screen quality. AI can suggest some too!
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">3</span>
                  Add Your Options
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Input the products or alternatives you want to compare – Laptop A, B, and C.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">4</span>
                  Assign Weights
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Tell ThinkFlow how important each criterion is – maybe performance 30%, price 30%, battery 20%.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">5</span>
                  Rate Each Option
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Score each product against each criterion on a 1-10 scale. Quick like a survey!
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-3 flex items-center text-xl font-bold text-black dark:text-white">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-base font-bold text-white">6</span>
                  Get Your Results
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color pl-11">
                  Voilà! See weighted scores, charts, and your clear winner. Make confident decisions!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
