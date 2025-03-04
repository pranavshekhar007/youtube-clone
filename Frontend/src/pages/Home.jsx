import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Components/Card";
import axios from "axios";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user); // Get logged-in user

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (currentUser) { // Fetch only if user is logged in
          const res = await axios.get(`http://localhost:7070/api/videos/${type}`);
          console.log("API Response Data:", res.data);
          setVideos(res.data || []); // Ensure videos is always an array
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [type, currentUser]); // Refetch when user logs in/out

  return (
    <div className="mt-16 flex flex-wrap items-center justify-center h-[calc(100vh-56px)]">
      {/* Show Welcome Message If User is Not Logged In */}
      {!currentUser ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My YouTube Clone</h1>
          <p className="text-lg">Created by Pranav Shekhar</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please sign in to view content.
          </p>
        </div>
      ) : (
        // Show Video Grid When Logged In
        <div className="w-full flex flex-wrap justify-between px-4">
          {videos.length > 0 ? (
            videos.map((video) => <Card key={video._id} video={video} />)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Loading videos...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
