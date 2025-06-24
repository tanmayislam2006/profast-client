import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useProfastAuth from "../../Hook/useProfastAuth";
const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};

const Pricing = () => {
  const { user: firebaseUser } = useProfastAuth();
  const serviceArea = useLoaderData();
  // just get the region name from servicearea data
  // to use in the select option
  const uniqueRegions = [...new Set(serviceArea.map((w) => w.region))];
  // get the districts by region
  // to use in the select option
  const getDistrictsByRegion = (region) =>
    serviceArea.filter((w) => w.region === region).map((w) => w.district);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = data.sender_center === data.receiver_center;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document delivery ${
        isSameDistrict ? "within" : "outside"
      } the district.`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.`;
      } else {
        const extraKg = weight - 3;
        const perKgCharge = (extraKg * 40).toFixed(1);
        const districtExtra = isSameDistrict ? 0 : 40;
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `
        Non-document over 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
      `;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${
          isSameDistrict ? "Within Same District" : "Outside District"
        }</p>
        <hr class="my-2"/>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          extraCost > 0
            ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>`
            : ""
        }
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>
    `,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6 ",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: firebaseUser.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };

        console.log("Ready for payment:", parcelData);
      }
    });
  };
  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  return (
    <div className="min-h-screen py-10 flex items-center justify-center">
      <form
        className="w-full max-w-6xl bg-white rounded-3xl  px-8 md:px-16 py-10 space-y-10 border border-green-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">
            Send a Parcel
          </h2>
          <p className="text-gray-500 text-lg">Fill in the details below</p>
        </div>

        {/* Parcel Info */}
        <div className="bg-green-50 p-6 rounded-2xl shadow space-y-5">
          <h3 className="font-semibold text-xl mb-2">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Parcel Name */}
            <div>
              <label className="block font-medium mb-1">Parcel Name</label>
              <input
                {...register("title", { required: "Parcel name is required" })}
                className={`input input-bordered w-full ${
                  errors.title ? "border-red-400" : ""
                }`}
                placeholder="Describe your parcel"
                name="title"
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Type */}
            <div>
              <label className="block font-medium mb-1">Type</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input
                    {...register("type", {
                      required: "Parcel type is required",
                    })}
                    type="radio"
                    value="document"
                    name="type"
                    className="radio radio-primary"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    {...register("type", {
                      required: "Parcel type is required",
                    })}
                    type="radio"
                    value="non-document"
                    name="type"
                    className="radio radio-primary"
                  />
                  Non-Document
                </label>
              </div>
              {errors.type && (
                <span className="text-red-500 text-xs">
                  {errors.type.message}
                </span>
              )}
            </div>
            {/* Weight */}
            <div>
              <label className="block font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                disabled={parcelType === "document"}
                {...register("weight")}
                className={`input input-bordered w-full ${
                  errors.weight ? "border-red-400" : ""
                }`}
                placeholder="Enter weight"
                name="weight"
              />
              {errors.weight && (
                <span className="text-red-500 text-xs">
                  {errors.weight.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div className="bg-green-50 p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Sender Info
            </h3>
            <div className="space-y-3">
              <input
                className={`input input-bordered w-full ${
                  errors.sender_name ? "border-red-400" : ""
                }`}
                placeholder="Name"
                name="sender_name"
                {...register("sender_name", {
                  required: "Sender name is required",
                })}
              />
              {errors.sender_name && (
                <span className="text-red-500 text-xs">
                  {errors.sender_name.message}
                </span>
              )}
              <input
                className={`input input-bordered w-full ${
                  errors.sender_contact ? "border-red-400" : ""
                }`}
                placeholder="Contact"
                name="sender_contact"
                {...register("sender_contact", {
                  required: "Sender contact is required",
                })}
              />
              {errors.sender_contact && (
                <span className="text-red-500 text-xs">
                  {errors.sender_contact.message}
                </span>
              )}
              <select
                className={`select select-bordered w-full ${
                  errors.sender_region ? "border-red-400" : ""
                }`}
                name="sender_region"
                {...register("sender_region", {
                  required: "Sender region is required",
                })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.sender_region && (
                <span className="text-red-500 text-xs">
                  {errors.sender_region.message}
                </span>
              )}
              <select
                className={`select select-bordered w-full ${
                  errors.sender_center ? "border-red-400" : ""
                }`}
                name="sender_center"
                {...register("sender_center", {
                  required: "Sender center is required",
                })}
              >
                <option value="">Select Center</option>
                {/* step down the to get districts by region
                
                */}
                {getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.sender_center && (
                <span className="text-red-500 text-xs">
                  {errors.sender_center.message}
                </span>
              )}
              <input
                className={`input input-bordered w-full ${
                  errors.sender_address ? "border-red-400" : ""
                }`}
                placeholder="Address"
                name="sender_address"
                {...register("sender_address", {
                  required: "Sender address is required",
                })}
              />
              {errors.sender_address && (
                <span className="text-red-500 text-xs">
                  {errors.sender_address.message}
                </span>
              )}
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction (optional)"
                name="pickup_instruction"
                {...register("pickup_instruction")}
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="bg-green-50 p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold text-lg text-primary mb-2">
              Receiver Info
            </h3>
            <div className="space-y-3">
              <input
                className={`input input-bordered w-full ${
                  errors.receiver_name ? "border-red-400" : ""
                }`}
                placeholder="Name"
                name="receiver_name"
                {...register("receiver_name", {
                  required: "Receiver name is required",
                })}
              />
              {errors.receiver_name && (
                <span className="text-red-500 text-xs">
                  {errors.receiver_name.message}
                </span>
              )}
              <input
                className={`input input-bordered w-full ${
                  errors.receiver_contact ? "border-red-400" : ""
                }`}
                placeholder="Contact"
                name="receiver_contact"
                {...register("receiver_contact", {
                  required: "Receiver contact is required",
                })}
              />
              {errors.receiver_contact && (
                <span className="text-red-500 text-xs">
                  {errors.receiver_contact.message}
                </span>
              )}
              <select
                className={`select select-bordered w-full ${
                  errors.receiver_region ? "border-red-400" : ""
                }`}
                name="receiver_region"
                {...register("receiver_region", {
                  required: "Receiver region is required",
                })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.receiver_region && (
                <span className="text-red-500 text-xs">
                  {errors.receiver_region.message}
                </span>
              )}
              <select
                className={`select select-bordered w-full ${
                  errors.receiver_center ? "border-red-400" : ""
                }`}
                name="receiver_center"
                {...register("receiver_center", {
                  required: "Receiver center is required",
                })}
              >
                <option value="">Select Center</option>
                {/* step down the to get districts by region */}
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.receiver_center && (
                <span className="text-red-500 text-xs">
                  {errors.receiver_center.message}
                </span>
              )}
              <input
                className={`input input-bordered w-full ${
                  errors.receiver_address ? "border-red-400" : ""
                }`}
                placeholder="Address"
                name="receiver_address"
                {...register("receiver_address", {
                  required: "Receiver address is required",
                })}
              />
              {errors.receiver_address && (
                <span className="text-red-500 text-xs">
                  {errors.receiver_address.message}
                </span>
              )}
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction (optional)"
                name="delivery_instruction"
                {...register("delivery_instruction")}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center w-3/5 mx-auto mt-8">
          <button className="btn btn-primary font-bold w-full " type="submit">
            Submit
          </button>
        </div>
        <div className="text-gray-700 text-base text-center mt-2">
          * PickUp Time 4pm-7pm Approx.
        </div>
      </form>
    </div>
  );
};

export default Pricing;
