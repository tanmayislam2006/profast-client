import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = (email) => {
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ["user", email],
    enabled: !!email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/${email}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return query;
};

export default useUserData;
