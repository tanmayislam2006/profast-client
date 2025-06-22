import React, { useState } from "react";
import reviewQuote from "../../assets/customer-top.png"; // Use your actual illustration
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const reviews = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  // Add more reviews as needed
];

const CustomerReview = () => {
  const [current, setCurrent] = useState(1);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="py-14 bg-[#f5f7f7]">
      <div className="flex flex-col items-center mb-6">
        <img src={reviewQuote} alt="" className="w-3/12 mb-2" />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#00363a]">
          What our customers are sayings
        </h2>
        <p className="text-gray-500 text-center max-w-xl mb-8">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="flex justify-center gap-6">
        {reviews.map((review, idx) => (
          <div
            key={review.name}
            className={`transition-all duration-300 w-full max-w-sm rounded-2xl p-8 shadow-sm bg-white mx-2 ${
              idx === current
                ? "opacity-100 scale-100 z-10"
                : "opacity-40 scale-95 z-0"
            }`}
            style={{
              display:
                idx === current || Math.abs(idx - current) === 1
                  ? "block"
                  : "none",
            }}
          >
            <div className="text-4xl text-[#3bb3b3] mb-4">“</div>
            <p className="text-gray-700 mb-6">{review.text}</p>
            <hr className="mb-4 border-dashed border-[#3bb3b3]" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00363a]" />
              <div>
                <div className="font-bold text-[#00363a]">{review.name}</div>
                <div className="text-gray-400 text-sm">{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Carousel Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="flex items-center justify-center">
          <FaChevronLeft />
        </button>
        <div className="flex gap-2">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-[#d6f95a]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="flex items-center justify-center">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CustomerReview;
