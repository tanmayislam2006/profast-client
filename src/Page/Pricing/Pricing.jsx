import React, { useState } from "react";

const Pricing = () => {
  const [parcelType, setParcelType] = useState("document");
  const [form, setForm] = useState({
    email: "",
    email2: "",
    senderEmail: "",
    senderWarehouse: "",
    senderEmail2: "",
    senderEmail3: "",
    senderRegion: "",
    pickupInstruction: "",
    receiverEmail: "",
    receiverWarehouse: "",
    receiverEmail2: "",
    receiverEmail3: "",
    receiverRegion: "",
    deliveryInstruction: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#f6f8f9] min-h-screen py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-md px-10 py-12">
        <h1 className="text-4xl font-bold mb-6">Add Parcel</h1>
        <hr className="mb-8" />
        <div className="text-xl font-semibold mb-6">Enter your parcel details</div>
        <div className="flex items-center gap-8 mb-8">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              value="document"
              checked={parcelType === "document"}
              onChange={() => setParcelType("document")}
              className="accent-[#ACC857] w-5 h-5"
            />
            <span className="ml-2 text-[#2E7D32] font-medium">Document</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              value="not-document"
              checked={parcelType === "not-document"}
              onChange={() => setParcelType("not-document")}
              className="accent-[#ACC857] w-5 h-5"
            />
            <span className="ml-2 text-gray-700 font-medium">Not-Document</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#ACC857]"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#ACC857]"
              type="email"
              name="email2"
              placeholder="Email"
              value={form.email2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender Details */}
          <div>
            <div className="font-bold text-lg mb-4">Sender Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="senderEmail"
                  placeholder="Email"
                  value={form.senderEmail}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Sender Pickup Wire house</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  name="senderWarehouse"
                  value={form.senderWarehouse}
                  onChange={handleChange}
                >
                  <option value="">Select Wire house</option>
                  <option value="wh1">Warehouse 1</option>
                  <option value="wh2">Warehouse 2</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="senderEmail2"
                  placeholder="Email"
                  value={form.senderEmail2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="senderEmail3"
                  placeholder="Email"
                  value={form.senderEmail3}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Your Region</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  name="senderRegion"
                  value={form.senderRegion}
                  onChange={handleChange}
                >
                  <option value="">Select your region</option>
                  <option value="region1">Region 1</option>
                  <option value="region2">Region 2</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Pickup Instruction</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] min-h-[60px] focus:outline-none"
                  name="pickupInstruction"
                  placeholder="Pickup Instruction"
                  value={form.pickupInstruction}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* Receiver Details */}
          <div>
            <div className="font-bold text-lg mb-4">Receiver Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="receiverEmail"
                  placeholder="Email"
                  value={form.receiverEmail}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Receiver Delivery Wire house</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  name="receiverWarehouse"
                  value={form.receiverWarehouse}
                  onChange={handleChange}
                >
                  <option value="">Select Wire house</option>
                  <option value="wh1">Warehouse 1</option>
                  <option value="wh2">Warehouse 2</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="receiverEmail2"
                  placeholder="Email"
                  value={form.receiverEmail2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  type="email"
                  name="receiverEmail3"
                  placeholder="Email"
                  value={form.receiverEmail3}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Receiver Region</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] focus:outline-none"
                  name="receiverRegion"
                  value={form.receiverRegion}
                  onChange={handleChange}
                >
                  <option value="">Select your region</option>
                  <option value="region1">Region 1</option>
                  <option value="region2">Region 2</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Delivery Instruction</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-[#fafafa] min-h-[60px] focus:outline-none"
                  name="deliveryInstruction"
                  placeholder="Delivery Instruction"
                  value={form.deliveryInstruction}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-700 text-base mt-4 mb-8">
          * PickUp Time 4pm-7pm Approx.
        </div>
        <button
          className="bg-[#d2f365] text-[#222] font-semibold rounded-md px-10 py-3 mt-2 transition disabled:opacity-60"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Pricing;