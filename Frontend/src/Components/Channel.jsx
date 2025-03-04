import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Get user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user?._id;

  // Fetch channel details on mount
  useEffect(() => {
    if (userId) {
      fetchChannel();
    } else {
      setLoading(false);
    }
  }, [userId]);

  // ✅ Fetch channel details
  const fetchChannel = async () => {
    try {
      // Make sure to pass the token if your route is protected
      const res = await axios.get(`http://localhost:7070/api/channels/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannel(res.data);
    } catch (error) {
      console.error("Error fetching channel:", error);
      // If channel not found, channel remains null
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new channel
  const createChannel = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7070/api/channels",
        {
          name: newChannelName,
          description: newChannelDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Channel created successfully! 🎉");
      setChannel(res.data);
    } catch (error) {
      toast.error("A channel for this user already exists or another error occurred.");
    }
  };

  // ✅ Update channel
  const updateChannel = async () => {
    if (!channel) return;
    try {
      const res = await axios.put(
        `http://localhost:7070/api/channels/${channel._id}`,
        {
          name: updatedName || channel.name, // fallback to existing name
          description: updatedDescription || channel.description, // fallback to existing desc
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChannel(res.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating channel:", error);
    }
  };

  // ✅ Delete channel
  const deleteChannel = async () => {
    if (!channel) return;
    try {
      await axios.delete(`http://localhost:7070/api/channels/${channel._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannel(null);
      toast.success("Channel deleted successfully! 🎉");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  // Optional: You can show a loading spinner until we've determined whether there's a channel
  if (loading) {
    return <div className="mt-16">Loading...</div>;
  }

  return (
    <div className="mt-16">
      {channel ? (
        <>
          {/* Show Channel Info */}
          <h1>{channel.name}</h1>
          <p>{channel.description}</p>

          {/* Edit Channel */}
          {editing ? (
            <div>
              <input
                type="text"
                placeholder="New Channel Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <button onClick={updateChannel}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)}>Edit Channel</button>
          )}

          {/* Delete Channel */}
          <button onClick={deleteChannel} style={{ color: "red", marginLeft: "10px" }}>
            Delete Channel
          </button>
        </>
      ) : (
        <div>
          {/* Create Channel */}
          <h2>Create Your Channel</h2>
          <input
            type="text"
            placeholder="Channel Name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Channel Description"
            value={newChannelDescription}
            onChange={(e) => setNewChannelDescription(e.target.value)}
          />
          <button onClick={createChannel}>Create Channel</button>
        </div>
      )}
    </div>
  );
};

export default Channel;
