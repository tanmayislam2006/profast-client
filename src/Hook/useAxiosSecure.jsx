import { useMemo } from "react";
import axios from "axios"; // Ensure this path is correct

const useAxiosSecure = () => {
  // Get user objects and logOut function from your context


  // Memoize the axios instance so it's only created once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "https://profast-server-indol.vercel.app", // A more common port number
    });
  }, []);
  // Return the fully configured axios instance
  return axiosSecure;
};

export default useAxiosSecure;
