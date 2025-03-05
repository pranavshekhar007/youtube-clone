import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

const Channel = () => {
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [channelCreated, setChannelCreated] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // Get user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ Create a new channel
  const createChannel = async () => {
    try {
      await axios.post(
        "http://localhost:7070/api/channels",
        { name: newChannelName, description: newChannelDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Channel created successfully! 🎉");
      setChannelCreated(true); // Hide form after creation
      setTimeout(() => {
        navigate("/profile"); 
      }, 1500);
    } catch (error) {
      toast.error("A channel for this user already exists or another error occurred.");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">User not found. Please sign in.</p>
      </div>
    );
  }

  // If channel is created, show a message
  if (channelCreated) {
    return (
      <div className="mt-16 text-center text-lg font-semibold">
        Channel created successfully! 🎉
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-sm mx-auto bg-white shadow-md rounded-md p-6 space-y-6">
        <h2 className="text-xl font-semibold">Create Your Channel</h2>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel Name
          </label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Enter channel name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Handle
          </label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Enter channel description"
            value={newChannelDescription}
            onChange={(e) => setNewChannelDescription(e.target.value)}
          />
        </div>
        <button
          onClick={createChannel}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default Channel;
