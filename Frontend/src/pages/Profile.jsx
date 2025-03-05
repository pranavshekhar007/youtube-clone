import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../Components/Card";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchUserVideos();
      fetchChannel();
    }
  }, [currentUser]);

  // ✅ Fetch user videos
  const fetchUserVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:7070/api/videos/user/${currentUser._id}`);
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching user videos:", error);
    }
  };

  // ✅ Fetch user channel
  const fetchChannel = async () => {
    try {
      const res = await axios.get(`http://localhost:7070/api/channels/${currentUser._id}`);
      setChannel(res.data);
    } catch (error) {
      console.error("Error fetching channel:", error);
      setChannel(null);
    }
  };

  // Handle Video Deletion
  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:7070/api/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
      toast.success("Video Deleted successfully! 🎉");
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
 
  // Handle Edit Click
  const handleEditClick = (video) => {
    setEditingVideo(video._id);
    setNewTitle(video.title);
  };

  // Handle Video Update
  const handleUpdate = async (videoId) => {
    try {
      await axios.put(`http://localhost:7070/api/videos/${videoId}`, { title: newTitle });
      setVideos(videos.map((video) => (video._id === videoId ? { ...video, title: newTitle } : video)));
      setEditingVideo(null);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">User not found. Please sign in.</p>
      </div>
    );
  }


  return (
    <div className="w-full">
      {/* Channel Banner */}
      {channel && (
        <div className="relative w-full h-60 bg-gray-300">
          <img
            src={channel.bannerUrl || "/default-banner.jpg"} 
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
          {/* Profile Image */}
          <div className="absolute left-10 bottom-[-40px]">
            <img
              src={channel.profileUrl || "/default-profile.png"} 
              alt="Channel Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      )}
  
      {/* Channel Info Section */}
      <div className="px-10 mt-14">
        <h2 className="text-2xl font-bold">{channel?.name}</h2>
        <p className="text-gray-600">@{channel?.description} • {videos.length} videos</p>
        <button className="mt-2 px-4 py-2 bg-black text-white rounded-md">Subscribe</button>
      </div>
  
      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 mt-6 px-10 flex space-x-6 text-lg">
        <button className="pb-2 border-b-4 border-black font-bold">Videos</button>
        <button className="pb-2 text-gray-500 hover:text-black">Shorts</button>
        <button className="pb-2 text-gray-500 hover:text-black">Playlists</button>
        <button className="pb-2 text-gray-500 hover:text-black">Community</button>
      </div>
  
      {/* Sorting Buttons */}
      <div className="px-10 mt-4 flex space-x-4">
        <button className="px-3 py-1 border rounded-md bg-gray-200">Latest</button>
        <button className="px-3 py-1 border rounded-md">Popular</button>
        <button className="px-3 py-1 border rounded-md">Oldest</button>
      </div>
  
      {/* Videos Section */}
      <div className="w-full px-10 mt-6">
        <h3 className="text-2xl font-semibold mb-4">Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 overflow-hidden"
              >
                <Card video={video} />
                {/* Edit and Delete Buttons */}
                <div className="mt-4 flex justify-between items-center">
                  {editingVideo === video._id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdate(video._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingVideo(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(video)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Profile;
