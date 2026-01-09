'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Frequently Asked Questions
              </h2>
              <p className="text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                Common questions about our comparison tool
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px]">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="wow fadeInUp group mb-4"
                  data-wow-delay={`.${index + 1}s`}
                >
                  <div className="rounded-lg bg-white shadow-one dark:bg-dark dark:shadow-three">
                    <button
                      className="flex w-full items-center justify-between p-6 text-left"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <h3 className="pr-4 text-lg font-semibold text-black dark:text-white">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`fill-current transition-transform duration-200 ${
                            openIndex === index ? 'rotate-180' : ''
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 14L4 8L5.4 6.6L10 11.2L14.6 6.6L16 8L10 14Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                    {openIndex === index && (
                      <div className="border-t border-gray-200 p-6 pt-4 dark:border-gray-700">
                        <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                          {faq.answer}
                        </p>
                      </div>
                    )}
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

export default FAQSection;
