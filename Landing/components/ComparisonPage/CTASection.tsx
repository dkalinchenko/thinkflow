interface CTASectionProps {
  ctaText: string;
  templateId: string;
  productName: string;
}

const CTASection = ({ ctaText, templateId, productName }: CTASectionProps) => {
  return (
    <section id="cta" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative z-10 overflow-hidden rounded-lg bg-primary px-8 py-12 text-center md:px-12 md:py-16"
              data-wow-delay=".1s"
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[45px]">
                Ready to Find Your Perfect {productName}?
              </h2>
              <p className="mb-8 text-base text-white/90 md:text-lg">
                Use our free decision matrix tool to compare options objectively. No account needed.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <a
                  href={`/app.html?template=${templateId}`}
                  className="inline-block rounded-sm bg-white px-8 py-4 text-base font-semibold text-primary duration-300 ease-in-out hover:bg-opacity-90"
                >
                  {ctaText} →
                </a>
                <a
                  href="/app.html"
                  className="inline-block rounded-sm border-2 border-white px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-white hover:text-primary"
                >
                  View All Templates
                </a>
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
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_93:235"
                      x1="-159.441"
                      y1="204.714"
                      x2="-159.441"
                      y2="915.952"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute right-0 top-0 z-[-1]">
                <svg
                  width="279"
                  height="106"
                  viewBox="0 0 279 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <path
                      d="M-57 12L50.0357 74.9323C54.9662 77.9323 61.0338 77.9323 65.9643 74.9323L173 12"
                      stroke="url(#paint0_linear_93:237)"
                      strokeWidth="4"
                    />
                    <path
                      d="M83.9643 84.9323C88.8948 87.9323 94.9624 87.9323 99.8929 84.9323L206.929 22.0677C211.859 19.0677 217.927 19.0677 222.857 22.0677L329.893 84.9323C334.824 87.9323 340.891 87.9323 345.822 84.9323L452.858 22"
                      stroke="url(#paint1_linear_93:237)"
                      strokeWidth="4"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_93:237"
                      x1="359.5"
                      y1="18.2666"
                      x2="349.622"
                      y2="125.789"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_93:237"
                      x1="329"
                      y1="18.2666"
                      x2="329"
                      y2="85.8002"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
