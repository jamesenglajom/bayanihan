import React from "react";

function Faqs({ faqsList = [] }) {
  return (
    <div id="faqs" className="w-full py-10 md:py-16 px-4">
      <div className="container mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-3 md:gap-5 text-center md:text-left">
          <h2 className="font-bold text-4xl md:text-5xl font-fraunces">FAQs</h2>
          <div className="text-gray-600">
            Find answers to common questions about our association
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqsList.map((faq, index) => (
            <div
              key={`faq-item-${index}`}
              className="w-full border-t border-neutral-300 pt-6 pb-8 flex flex-col md:flex-row gap-4 md:gap-10"
            >
              {/* Question: Full width on mobile, 35% on desktop */}
              <div className="w-full md:w-[35%] font-bold text-lg md:text-base leading-tight">
                {faq?.question}
              </div>

              {/* Answer: Full width on mobile, 65% on desktop */}
              <div
                className="w-full md:w-[65%] prose prose-sm max-w-none text-gray-600 faq-answer"
                dangerouslySetInnerHTML={{ __html: faq?.answer || "" }}
              />
            </div>
          ))}
        </div>

        {/* Footer / Call to Action */}
        <div className="flex flex-col gap-4 md:gap-5 bg-neutral-50 p-6 md:p-10 rounded-2xl items-center md:items-start">
          <h3 className="font-bold text-2xl md:text-3xl font-fraunces text-center md:text-left">
            Still have questions?
          </h3>
          <div className="text-gray-500">Reach out anytime</div>
          <div>
            <button className="py-2.5 px-6 border border-neutral-300 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faqs;