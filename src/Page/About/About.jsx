import { useState } from "react";

const tabs = ["Story", "Mission", "Success", "Team & Others"];

const tabContent = {
  Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,
  Mission: `Our mission is to redefine parcel delivery in Bangladesh with real-time tracking, responsive service, and reliable logistics. We focus on transparency, speed, and customer trust.`,
  Success: `Thousands of successful deliveries across 64 districts and growing. Our success is built on consistent, on-time service and satisfied users who trust us with their important packages.`,
  "Team & Others": `Our team consists of experienced logistics professionals, tech innovators, and dedicated support staff. Together, we ensure smooth parcel movement and excellent customer care.`,
};

const About = () => {
  const [activeTab, setActiveTab] = useState("Story");

  return (
    <section className="bg-white p-8 rounded-lg shadow-md max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-[#00363a] mb-2">About Us</h2>
      <p className="text-gray-600 mb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      <hr className="my-6" />

      {/* Tabs */}
      <div className="flex gap-6 mb-6 text-lg font-medium text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`transition ${
              activeTab === tab
                ? "text-[#3d5a2b] font-bold border-b-2 border-[#3d5a2b]"
                : "hover:text-[#3d5a2b]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-gray-700 space-y-5 leading-relaxed">
        <p>{tabContent[activeTab]}</p>
        <p>{tabContent[activeTab]}</p>
        <p>{tabContent[activeTab]}</p>
      </div>
    </section>
  );
};

export default About;
