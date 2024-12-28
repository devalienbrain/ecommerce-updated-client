import React, { useEffect, useState } from "react";
import { FaPause, FaTrash } from "react-icons/fa"; // Import React Icons
import useAxios from "../../hooks/useAxios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [actionType, setActionType] = useState(""); // "suspend" or "delete"
  const axiosInstance = useAxios();
  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle suspend user action
  const handleSuspend = async (userId) => {
    setCurrentUserId(userId);
    setActionType("suspend");
    setShowModal(true);
  };

  // Handle delete user action
  const handleDelete = async (userId) => {
    setCurrentUserId(userId);
    setActionType("delete");
    setShowModal(true);
  };

  // Execute action after confirmation
  const executeAction = async () => {
    try {
      if (actionType === "suspend") {
        await axiosInstance.patch(
          `/api/users/${currentUserId}/suspend`
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === currentUserId ? { ...user, status: "suspended" } : user
          )
        );
      } else if (actionType === "delete") {
        await axiosInstance.delete(`/api/users/${currentUserId}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== currentUserId)
        );
      }
      setShowModal(false); // Close modal after action
    } catch (error) {
      console.error(`Error performing ${actionType} action:`, error);
      setShowModal(false);
    }
  };

  // Close modal without action
  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">#</th> {/* Serial number column */}
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Status</th> {/* Status column */}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user?.id}>
              <td className="border p-2">{index + 1}</td>{" "}
              {/* Display serial number */}
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 capitalize">
                {" "}
                <strong>{user.role}</strong>{" "}
              </td>
              <td className="border p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">{user.status}</td>{" "}
              {/* Display user status */}
              <td
                className={`border p-2 flex justify-center space-x-4 ${
                  user?.role === "admin" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <button
                  className="text-yellow-600 text-sm"
                  onClick={() => handleSuspend(user.id)}
                  title="Suspend User" // Tooltip for Suspend
                >
                  <FaPause /> {/* Pause icon for Suspend */}
                </button>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => handleDelete(user.id)}
                  title="Delete User" // Tooltip for Delete
                >
                  <FaTrash /> {/* Trash icon for Delete */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-80">
            <h3 className="text-center font-semibold text-lg mb-4">
              Are you sure you want to {actionType} this user?
            </h3>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={executeAction}
              >
                Yes, {actionType}
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
