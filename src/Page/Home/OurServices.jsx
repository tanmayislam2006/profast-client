import React from "react";
import serviceIcon from "../../assets/service.png"; // Replace with your actual icon

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24/72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <div className="bg-[#00363a] rounded-3xl p-6 md:p-14 my-8">
      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-2">
        Our Services
      </h2>
      <p className="text-gray-200 text-center mb-10 max-w-2xl mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-7 flex flex-col items-center text-center shadow-sm transition hover:bg-[#d6f95a] hover:text-[#00363a] hover:font-semibold ${
              service.highlight
                ? "bg-[#d6f95a] text-[#00363a] font-semibold"
                : "bg-white text-[#00363a]"
            }`}
          >
            <img src={serviceIcon} alt="" className="w-14 h-14 mb-4" />
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p className="text-base">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
