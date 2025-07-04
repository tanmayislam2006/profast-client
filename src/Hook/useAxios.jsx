import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: `http://localhost:5000`,
    });
  }, []);
  return axiosInstance;
};

export default useAxios;
