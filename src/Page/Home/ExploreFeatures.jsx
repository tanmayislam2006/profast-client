import React from 'react';
import liveTrackingImg from '../../assets/live-tracking.png';
import safeDeliveryImg from '../../assets/safe-delivery.png';
import callCenterImg from '../../assets/support.png';

const features = [
  {
    title: 'Live Parcel Tracking',
    description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: liveTrackingImg,
    alt: 'Live Parcel Tracking Illustration',
  },
  {
    title: '100% Safe Delivery',
    description: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    image: safeDeliveryImg,
    alt: 'Safe Delivery Illustration',
  },
  {
    title: '24/7 Call Center Support',
    description: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    image: callCenterImg,
    alt: 'Call Center Support Illustration',
  },
];

const ExploreFeatures = () => {
  return (
    <div className="py-10 px-2 md:px-8 lg:px-16">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl shadow-sm mb-8 p-6 md:p-10 `}
        >
          <div className="flex-shrink-0 w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
            <img
              src={feature.image}
              alt={feature.alt}
              className="max-h-40 md:max-h-48 w-auto object-contain"
            />
          </div>
          <div className="md:w-3/4 md:pl-8 md:pr-8 text-left">
            <h3 className="font-bold text-2xl text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreFeatures;