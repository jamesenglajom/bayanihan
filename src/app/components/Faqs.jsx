import React from "react";

function Faqs() {
  const faqsList = [
    {
      question: "How do i join",
      answer:
        "Membership is open to all who share our values. Visit our about page or contact us directly. We welcome everyone interested in preserving Filipino culture and supporting our community.",
    },
    {
      question: "What events do you host?",
      answer:
        "We organize cultural celebrations, community service days, educational workshops, anmd social gatherings throughout the year. Check our Events page for upcoming activities and dates.",
    },
    {
      question: "Is there a membership fee?",
      answer:
        "We offer flexible membership options to fit different circumstances. Contact us to discuss what works best for your situation and commitment level.",
    },
    {
      question: "Can I volunteer?",
      answer:
        "Absolutely. We rely on volunteers to make our programs possible. Reach out through our contact form and let us know how you'd like to contribute.",
    },
    {
      question: "How can I donate?",
      answer:
        "Your support helps us continue our work. Contact us for information about donation options and how your contribution makes a difference.",
    },
  ];
  return (
    <div id="faqs" className="w-full py-7.5 my-7">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-5xl font-fraunces">FAQs</h2>
          <div>Find answers to common questions about our association</div>
        </div>
        <div className="py-5">
          {faqsList.map((faq, index) => (
            <div
              key={`faq-item-${index}`}
              className="w-full border-t border-neutral-300 pt-4 pb-10 flex gap-5"
            >
              <div className="w-[35%] font-bold">{faq?.question}</div>
              <div className="w-[65%]">{faq?.answer}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-3xl font-fraunces">
            Still have questions?
          </h3>
          <div>Reach out anytime</div>
          <div>
            <button className="py-2 px-3 border border-neutral-200 rounded-md">
                Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
