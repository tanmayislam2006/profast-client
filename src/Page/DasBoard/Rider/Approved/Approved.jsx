import React from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Approved = () => {
  const axiosSecure = useAxiosSecure();
  const { data: approvedRider = [], refetch } = useQuery({
    queryKey: ["allAprove-Riders"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/riders?status=approved`);
      return response.data;
    },
  });
  console.log(approvedRider);
  return <div>active rider should be here {approvedRider.length}</div>;
};

export default Approved;
