import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: `https://profast-server-indol.vercel.app`,
    });
  }, []);
  return axiosInstance;
};

export default useAxios;
