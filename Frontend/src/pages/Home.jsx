import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../Components/Card";
import FilterButtons from "../Components/FilterButtons";
import "../styles/Home.css"; // Import Home.css

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (currentUser) {
          const res = await axios.get(`http://localhost:7070/api/videos/${type}`);
          setVideos(res.data || []);
          setFilteredVideos(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [type, currentUser]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredVideos(videos);
    } else {
      const normalizedCategory = selectedCategory.toLowerCase();
      const filtered = videos.filter((video) =>
        video.tags?.some((tag) => tag.toLowerCase() === normalizedCategory)
      );
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  return (
    <div className="home-container">
      <FilterButtons selectedCategory={selectedCategory} setCategory={setSelectedCategory} />

      <div className="video-grid">
        {!currentUser ? (
          <div className="welcome-message">
            <h1>Welcome to My YouTube Clone</h1>
            <p>Created by Pranav Shekhar</p>
            <p>Please sign in to view content.</p>
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-between px-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => <Card key={video._id} video={video} />)
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
