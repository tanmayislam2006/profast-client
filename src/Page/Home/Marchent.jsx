import React from 'react';
import boxIllustration from '../../assets/location-marchant.png'; // Use your actual image path

const Marchent = () => {
  return (
    <div className="bg-[#00363a] rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between ">
      <div className="flex-1 text-white">
        <h2 className="font-bold text-3xl md:text-4xl mb-6 leading-tight">
          Merchant and Customer Satisfaction<br />is Our First Priority
        </h2>
        <p className="mb-8 text-base md:text-lg text-gray-200 max-w-xl">
          We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#d6f95a] cursor-pointer text-[#00363a] font-semibold rounded-full px-8 py-3 text-lg transition hover:brightness-95">
            Become a Merchant
          </button>
          <button className="border border-[#d6f95a] text-[#d6f95a] font-semibold rounded-full px-8 py-3 text-lg transition hover:bg-[#d6f95a] cursor-pointer hover:text-[#00363a]">
            Earn with Profast Courier
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-end mt-10 md:mt-0">
        <img
          src={boxIllustration}
          alt="Box Illustration"
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default Marchent;