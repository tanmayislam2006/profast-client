import React from "react";

const Pricing = () => {
  return (
    <div className="bg-[#f6f8f9] min-h-screen py-8">
      <form className="max-w-6xl mx-auto space-y-8 bg-white rounded-3xl shadow-md px-6 md:px-10 py-8 md:py-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-1">Send a Parcel</h2>
          <p className="text-gray-500">Fill in the details below</p>
        </div>

        {/* Parcel Info */}
        <div className="p-4 rounded-xl shadow space-y-4 bg-neutral-50 py-5">
          <h3 className="font-semibold text-xl">Parcel Info</h3>
          <div className="space-y-4">
            {/* Parcel Name */}
            <div>
              <label className="label">Parcel Name</label>
              <input
                className="input input-bordered w-full"
                placeholder="Describe your parcel"
                name="title"
              />
            </div>
            {/* Type */}
            <div>
              <label className="label">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    name="type"
                    className="radio"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    name="type"
                    className="radio"
                  />
                  Non-Document
                </label>
              </div>
            </div>
            {/* Weight */}
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="input input-bordered w-full"
                placeholder="Enter weight"
                name="weight"
              />
            </div>
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="p-4 rounded-xl shadow-md space-y-4 bg-neutral-50">
            <h3 className="font-semibold text-xl">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                className="input input-bordered w-full"
                placeholder="Name"
                name="sender_name"
              />
              <input
                className="input input-bordered w-full"
                placeholder="Contact"
                name="sender_contact"
              />
              <select className="select select-bordered w-full" name="sender_region">
                <option value="">Select Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
              <select className="select select-bordered w-full" name="sender_center">
                <option value="">Select Service Center</option>
                <option value="Dhaka Central">Dhaka Central</option>
                <option value="Chittagong South">Chittagong South</option>
              </select>
              <input
                className="input input-bordered w-full"
                placeholder="Address"
                name="sender_address"
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
                name="pickup_instruction"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="p-4 rounded-xl shadow-md space-y-4 bg-neutral-50">
            <h3 className="font-semibold text-xl">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                className="input input-bordered w-full"
                placeholder="Name"
                name="receiver_name"
              />
              <input
                className="input input-bordered w-full"
                placeholder="Contact"
                name="receiver_contact"
              />
              <select className="select select-bordered w-full" name="receiver_region">
                <option value="">Select Region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
              <select className="select select-bordered w-full" name="receiver_center">
                <option value="">Select Service Center</option>
                <option value="Dhaka Central">Dhaka Central</option>
                <option value="Chittagong South">Chittagong South</option>
              </select>
              <input
                className="input input-bordered w-full"
                placeholder="Address"
                name="receiver_address"
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
                name="delivery_instruction"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center w-3/5 mx-auto ">
          <button className="btn btn-primary text-black w-full" type="submit">
            Submit
          </button>
        </div>
        <div className="text-gray-700 text-base text-center">
          * PickUp Time 4pm-7pm Approx.
        </div>
      </form>
    </div>
  );
};

export default Pricing;
