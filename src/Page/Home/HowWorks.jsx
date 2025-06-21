import React from "react";
import {
  FaTruckPickup,
  FaShippingFast,
  FaBoxOpen,
  FaRegSmile,
} from "react-icons/fa";

const dataForHowItWorks = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruckPickup size={36} className="text-primary" />,
  },
  {
    title: "Cash On Delivery",
    description: "Quick and reliable delivery for all your needs.",
    icon: <FaShippingFast size={36} className="text-primary" />,
  },
  {
    title: "Secure Packaging",
    description: "Your items are safe with our secure packaging.",
    icon: <FaBoxOpen size={36} className="text-primary" />,
  },
  {
    title: "Happy Customers",
    description: "We ensure customer satisfaction every step of the way.",
    icon: <FaRegSmile size={36} className="text-primary" />,
  },
];

const HowWorks = () => {
  return (
    <div className="my-10">
      <h3 className="text-center font-bold my-8 text-2xl">How It Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {dataForHowItWorks.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl border border-transparent shadow-sm px-4 py-8 flex flex-col gap-3 hover:border-2
             hover:border-primary hover:shadow-lg  transform transition-all duration-300"
          >
            {item.icon}
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
