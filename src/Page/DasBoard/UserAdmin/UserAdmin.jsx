import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "./../../../Hook/useAxiosSecure";

const updateUserRole = async ({ id, role }) => {
  return toast("user role change,", id, role);
};

const UserAdmin = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const handleRoleChange = (user, newRole) => {
    mutation.mutate({ id: user._id, role: newRole });
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (isError) return <div className="text-error">Failed to load users.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-base-100 transition">
                <td>
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border object-cover shadow"
                  />
                </td>
                <td className="font-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-info"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="">
                  {user.role !== "admin" ? (
                    <button
                      className="btn btn-xs btn-success mx-2"
                      onClick={() => handleRoleChange(user, "admin")}
                      disabled={mutation.isLoading}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-warning mx-2"
                      onClick={() => handleRoleChange(user, "user")}
                      disabled={mutation.isLoading}
                    >
                      Remove Admin
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-outline btn-info"
                    onClick={() => openModal(user)}
                  >
                    Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Info Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedUser.profileImage}
                alt={selectedUser.name}
                className="w-20 h-20 rounded-full border mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{selectedUser.name}</h3>
              <p className="text-gray-500 mb-2">{selectedUser.email}</p>
              <span
                className={`badge ${
                  selectedUser.role === "admin" ? "badge-success" : "badge-info"
                } mb-2`}
              >
                {selectedUser.role}
              </span>
              <div className="w-full mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">User ID:</span>
                  <span>{selectedUser.uid}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Created:</span>
                  <span>{selectedUser.creationTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Last Sign In:</span>
                  <span>{selectedUser.lastSignInTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;
