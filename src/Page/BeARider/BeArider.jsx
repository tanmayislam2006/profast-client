import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useProfastAuth from "../../Hook/useProfastAuth";
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/animations/rider.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const BeArider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useProfastAuth();
  const serviceArea = useLoaderData();

  // get unique regions
  const uniqueRegions = [...new Set(serviceArea.map((w) => w.region))];

  // filter districts/warehouses by region
  const getDistrictsByRegion = (region) =>
    serviceArea.filter((w) => w.region === region).map((w) => w.district);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const riderRegion = watch("rider_region");

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      application_date: new Date().toISOString(),
      rider_status: "pending",
    };
    try {
      const res = await axiosSecure.post("/riders", riderData, {
        withCredentials: true,
      });
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Successfully applied as a rider!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      reset();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-5 items-center justify-center min-h-screen">
      {/* Left: Animation/Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className=" rounded-2xl  p-6 flex flex-col items-center h-full min-h-[600px]">
          <Lottie
            animationData={riderImg}
            className="w-full h-80"
            loop={true}
          />
          <h2 className="text-xl font-bold text-primary mt-4">
            Become a Profast Rider!
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Join our team and deliver happiness across the country.
          </p>
        </div>
      </div>
      {/* Right: Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 bg-white  py-2 px-8 rounded-2xl  h-full  flex flex-col justify-center"
      >
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">
          Rider Registration
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              {...register("rider_name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              placeholder="Your Name"
            />
            {errors.rider_name && (
              <span className="text-red-500 text-sm">
                {errors.rider_name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">NID Number</label>
            <input
              type="text"
              {...register("nid_number", {
                required: "NID number is required",
              })}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              placeholder="NID Number"
            />
            {errors.nid_number && (
              <span className="text-red-500 text-sm">
                {errors.nid_number.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
            />
            {errors.dob && (
              <span className="text-red-500 text-sm">{errors.dob.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="tel"
              {...register("mobile", { required: "Mobile number is required" })}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              placeholder="Mobile Number"
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">
                {errors.mobile.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Bike Registration ID
            </label>
            <input
              type="text"
              {...register("bike_registration", {
                required: "Bike registration ID is required",
              })}
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              placeholder="Bike Registration ID"
            />
            {errors.bike_registration && (
              <span className="text-red-500 text-sm">
                {errors.bike_registration.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-gray-100"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Region</label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              {...register("rider_region", { required: "Region is required" })}
            >
              <option value="">Select your region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.rider_region && (
              <span className="text-red-500 text-sm">
                {errors.rider_region.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Warehouse / District
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
              {...register("warehouse", { required: "Warehouse is required" })}
              disabled={!riderRegion}
            >
              <option value="">Select warehouse</option>
              {riderRegion &&
                getDistrictsByRegion(riderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.warehouse && (
              <span className="text-red-500 text-sm">
                {errors.warehouse.message}
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="w-full btn btn-primary font-bold mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeArider;
