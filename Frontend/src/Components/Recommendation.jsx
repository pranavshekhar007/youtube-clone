import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";

const Recommendation = ({ tags }) => {
  // State to store recommended videos
  const [videos, setVideos] = useState([]);

  // Fetch videos based on the provided tags when component mounts or tags change
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Make an API call to fetch videos related to the given tags
        const res = await axios.get(`http://localhost:7070/api/videos/tags?tags=${tags}`);
        
        // Update state with the retrieved video data
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideos();
  }, [tags]); // Dependency array ensures re-fetching when `tags` changes

  return (
    <div className="flex-2">
      {/* Render recommended videos using the Card component */}
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Recommendation;
