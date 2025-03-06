import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../Components/Card";
import FilterButtons from "../Components/FilterButtons";
import { Link } from "react-router-dom";

const Home = ({ type }) => {
  // State for storing all videos fetched from the backend
  const [videos, setVideos] = useState([]);
  // State for storing filtered videos based on the selected category
  const [filteredVideos, setFilteredVideos] = useState([]);
  // State to track the currently selected category (default: "All")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Accessing the currently logged-in user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Fetch videos from the backend when the 'type' or 'currentUser' changes
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos only if the user is logged in
        if (currentUser) {
          const res = await axios.get(`http://localhost:7070/api/videos/${type}`);
          // Update both videos and filteredVideos state with fetched data
          setVideos(res.data || []);
          setFilteredVideos(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [type, currentUser]); // Dependencies: refetch videos when 'type' or 'currentUser' changes

  // Apply category-based filtering whenever 'selectedCategory' or 'videos' changes
  useEffect(() => {
    if (selectedCategory === "All") {
      // Show all videos when "All" is selected
      setFilteredVideos(videos);
    } else {
      // Convert selectedCategory to lowercase for case-insensitive comparison
      const normalizedCategory = selectedCategory.toLowerCase();

      // Filter videos where at least one tag matches the selected category
      const filtered = videos.filter((video) =>
        video.tags?.some((tag) => tag.toLowerCase() === normalizedCategory)
      );

      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]); // Dependencies: re-run filter when category or videos list changes

  return (
    <div className="min-h-screen">
      {/* Category Filter Buttons */}
      <FilterButtons selectedCategory={selectedCategory} setCategory={setSelectedCategory} />

      <div className="mt-10">
        {/* If the user is not signed in, show the sign-in prompt */}
        {!currentUser ? (
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-red-600">
              Welcome to My YouTube Clone
            </h1>
            <p className="text-lg font-semibold mb-1">
              Created by <span className="text-blue-500">Pranav Shekhar</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please sign in to view content.
            </p>
            <Link to="signin">
              <button className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          // If the user is signed in, show filtered videos
          <div className="w-full flex flex-wrap justify-between px-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <Card key={video._id} video={video} />
              ))
            ) : (
              <p>No videos found for "{selectedCategory}".</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
