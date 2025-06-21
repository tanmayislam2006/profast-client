import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, our posture corrector is designed to fit a wide range of ages and body types comfortably.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Many users report significant improvement in posture and reduction in back pain with regular use.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include smart features such as vibration alerts to remind you to correct your posture.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You can sign up for restock notifications on our website and we’ll email you as soon as it’s available.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-2">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      {faqData.map((item, idx) => (
        <div
          key={idx}
          className={`mb-4 rounded-lg border ${
            openIndex === idx
              ? "border-[#3bb3b3] bg-[#e6f6f6]"
              : "border-transparent bg-gray-100"
          } transition`}
        >
          <button
            className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
            // Toggle FAQ answer visibility: open clicked item or close if already open
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          >
            <span
              className={
                openIndex === idx ? "text-[#00363a]" : "text-[#00363a]"
              }
            >
              {item.question}
            </span>
            <span>
              {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-6 text-gray-700 text-base">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
