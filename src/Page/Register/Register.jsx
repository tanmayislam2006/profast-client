import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useProfastAuth from "../../Hook/useProfastAuth";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import defaultAvatar from "../../assets/authImage.png";
import axios from "axios";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);
  const { googleLogin, createAccount } = useProfastAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      if (result.user) {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
          uid: user.uid,
          role: "user",
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };
        axios.post(
          "https://profast-server-indol.vercel.app/register",
          userData
        );
        toast.success("Registration successful!");
        navigate(location?.state || "/");
      }
    });
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    // Handle form submission
    if (data.name && data.email && data.password) {
      createAccount(data.email, data.password)
        .then((result) => {
          if (result.user) {
            toast.success("Registration successful!");
            navigate(location?.state || "/");
            const userData = {
              name: result.user.name,
              email: result.user.email,
              profileImage: image,
              uid: result.user.uid,
              role: "user",
              creationTime: result.user?.metadata?.creationTime,
              lastSignInTime: result.user?.metadata?.lastSignInTime,
            };
            axios.post(
              "https://profast-server-indol.vercel.app/register",
              userData
            );
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Registration failed");
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMMGBB_API_KEY
          }`,
          formData
        )
        .then((response) => {
          if (response.data.success) {
            setImage(response.data.data.url);
          } else {
            toast.error("Image upload failed");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Image upload failed");
        });
    }
  };
  return (
    <div className="max-w-md w-full border-2 border-primary/20 rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Create an Account
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col items-center mb-2 gap-2">
          {/*  */}
          <div className="relative w-20 h-20 mb-1">
            <img
              src={image || preview}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 shadow"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-primary/80 p-1 rounded-full cursor-pointer border-2 border-white"
            >
              <FaUserCircle size={22} className="text-white" />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <span className="text-xs text-gray-400">Upload Image</span>
        </div>
        <div className="mb-4 relative">
          <FaUserCircle
            size={20}
            className="absolute left-4 top-4 text-gray-400"
          />
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-12 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
            {...register("name", { required: true })}
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
          {...register("email", { required: true })}
        />
        <div className="mb-4 relative ">
          <p
            onClick={() => setShowPass(!showPass)}
            className="absolute right-8 bottom-4 cursor-pointer"
          >
            {showPass ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </p>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
            {...register("password", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary cursor-pointer text-white font-bold py-3 rounded-lg mt-2"
        >
          Register
        </button>
      </form>
      <div className="my-4 w-full flex items-center">
        <div className="flex-1 h-px bg-primary/20"></div>
        <span className="mx-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-primary/20"></div>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-full cursor-pointer flex items-center justify-center gap-3 border border-primary/30 py-3 rounded-lg font-semibold text-primary "
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <Link
          state={location.state}
          to="/login"
          className="text-primary font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
