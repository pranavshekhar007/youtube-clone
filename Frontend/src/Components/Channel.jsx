import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
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
    }
  }, [userId]);

  // ✅ Fetch channel details
  const fetchChannel = async () => {
    try {
      const res = await axios.get(`http://localhost:7070/api/channels/${userId}`);
      setChannel(res.data);
      fetchVideos(res.data._id);
    } catch (error) {
      console.error("Error fetching channel:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch videos of the channel
  const fetchVideos = async (channelId) => {
    try {
      const res = await axios.get(`http://localhost:7070/api/channels/${channelId}/videos`);
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
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
      toast.success("create channel successfully! 🎉");
      setChannel(res.data);
    } catch (error) {
      toast.error("channel already will created in on user only one channel will created!");
    }
  };

  // ✅ Update channel
  const updateChannel = async () => {
    try {
      const res = await axios.put(
        `http://localhost:7070/api/channels/${channel._id}`,
        { name: updatedName, description: updatedDescription },
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
    try {
      await axios.delete(`http://localhost:7070/api/channels/${channel._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannel(null);
      setVideos([]);
      toast.success("delete channel successfully! 🎉");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  // ✅ Delete video
  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:7070/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // if (loading) {
  //   return <div className="mt-16">Loading...</div>;
  // }

  return (
    <div className="mt-16">
      {channel ? (
        <>
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
          <button onClick={deleteChannel} style={{ color: "red" }}>
            Delete Channel
          </button>

          {/* Videos */}
          <h2>Videos</h2>
          <div>
            {videos.map((video) => (
              <div key={video._id}>
                <h3>{video.title}</h3>
                <button onClick={() => deleteVideo(video._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
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
