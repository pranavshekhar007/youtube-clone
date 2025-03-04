import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">User not found. Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img
          src={currentUser.img || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 shadow-lg"
        />
        <h2 className="text-2xl font-semibold mt-4">{currentUser.name}</h2>
        <p className="text-gray-600">{currentUser.email}</p>
        <p className="mt-2 text-sm text-gray-500">
          Member since: {new Date(currentUser.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
