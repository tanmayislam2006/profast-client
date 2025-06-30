import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useProfastAuth from "../../Hook/useProfastAuth";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { googleLogin, loginUser,refetch } = useProfastAuth();
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
        refetch()
        navigate(location?.state || "/");
      }

      toast.success("Login successful!");
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      loginUser(email, password)
        .then((result) => {
          if (result.user) {
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            axios.patch(`http://localhost:5000/login`, {
              lastSignInTime,
              email: result.user.email,
            });
            toast.success("Login successful!");
            refetch()
            navigate(location?.state || "/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Please fill in all fields.");
    }
  };
  return (
    <div className="max-w-md w-full border-2 border-primary/20 rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-primary mb-6">Login to Profast</h2>
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:outline-none focus:border-primary"
          required
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary cursor-pointer text-white font-bold py-3 rounded-lg mt-2"
        >
          Login
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
        Don't have an account?{" "}
        <Link
          state={location.state}
          to="/register"
          className="text-primary font-semibold"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
