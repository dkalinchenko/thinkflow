"use client";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple Pricing: Free Forever"
          paragraph="OptiMind is completely free with all features included. No hidden costs, no premium tiers, no subscriptions. Just smart decisions."
          center
          width="665px"
        />

        <div className="mx-auto max-w-[550px]">
          <div
            className="wow fadeInUp relative z-10 overflow-hidden rounded-md bg-white px-8 py-10 shadow-pricing dark:bg-gray-dark sm:p-12 lg:px-6 lg:py-10 xl:p-12"
            data-wow-delay=".15s"
          >
            <div className="mb-7 text-center">
              <h3 className="mb-3 text-3xl font-bold text-black dark:text-white">
                Free Forever
              </h3>
              <p className="text-base font-medium text-body-color">
                Everything you need to make smart decisions
              </p>
            </div>
            <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
              <div className="text-center">
                <span className="text-5xl font-bold text-primary">$0</span>
                <p className="mt-2 text-base font-medium text-body-color">
                  No credit card required
                </p>
              </div>
            </div>
            <div className="mb-9 space-y-3">
              <OfferList text="Unlimited comparisons" status="active" />
              <OfferList text="AI-powered suggestions" status="active" />
              <OfferList text="Custom criteria & weights" status="active" />
              <OfferList text="Visual results & charts" status="active" />
              <OfferList text="No account required" status="active" />
              <OfferList text="Browser-based privacy" status="active" />
              <OfferList text="Save & share results" status="active" />
              <OfferList text="All features included" status="active" />
            </div>
            <div className="text-center">
              <a
                href="#features"
                className="inline-block rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
              >
                Get Started Free
              </a>
            </div>
            
            <div className="mt-8 border-t border-body-color border-opacity-10 pt-8 text-center dark:border-white dark:border-opacity-10">
              <p className="text-sm font-medium text-body-color">
                💡 Want to support OptiMind? Premium features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
