import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

const Channel = () => {
  // State to store channel name and description
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [channelCreated, setChannelCreated] = useState(false); // Track channel creation status
  
  // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // React Router navigation hook
  const navigate = useNavigate();

  // Retrieve user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Function to create a new channel
  const createChannel = async () => {
    try {
      await axios.post(
        "http://localhost:7070/api/channels",
        { name: newChannelName, description: newChannelDescription },
        { headers: { Authorization: `Bearer ${token}` } } // Send token for authentication
      );
      toast.success("Channel created successfully! 🎉");
      setChannelCreated(true); // Update state to indicate success
      
      // Redirect to profile page after 1.5 seconds
      setTimeout(() => {
        navigate("/profile"); 
      }, 1500);
    } catch (error) {
      toast.error("A channel for this user already exists or another error occurred.");
    }
  };

  // Show message if user is not logged in
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">User not found. Please sign in.</p>
      </div>
    );
  }

  // If channel is successfully created, show confirmation message
  if (channelCreated) {
    return (
      <div className="mt-16 text-center text-lg font-semibold">
        Channel created successfully! 🎉
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-sm mx-auto bg-white shadow-md rounded-md p-6 space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold">Create Your Channel</h2>
        
        {/* Channel Name Input */}
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
        
        {/* Channel Description Input */}
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
        
        {/* Create Channel Button */}
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
