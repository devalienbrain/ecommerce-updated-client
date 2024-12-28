import React from "react";
import { useUser } from "../../provider/UserContext";

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading user details...</div>; // Handle loading state
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <img
          src={
            user.role === "Admin"
              ? "https://i.ibb.co/qjQ0dt1/manager.png"
              : "https://i.ibb.co/VvKP7TQ/user.png"
          }
          alt="User Avatar"
          className="w-9 h-9 rounded-full"
        />
        <span className="font-medium">{user.email}</span>
      </div>

      <div className="mt-4 p-4 border rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">User Details</h3>
        <ul className="mt-2">
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Role:</strong> {user.role}
          </li>
          <li>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
