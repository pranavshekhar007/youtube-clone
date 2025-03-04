import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Components/Card";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user); // Get user from Redux
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!currentUser) return; // Prevent fetching videos if not logged in

      try {
        const res = await axios.get(`http://localhost:7070/api/videos/search${query}`);
        setVideos(res.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchVideos();
  }, [query, currentUser]); // Re-run when query OR user state changes

  return (
    <div className="flex flex-wrap gap-2 p-2 mt-16">
      {!currentUser ? (
        <p className="text-gray-600 dark:text-gray-400 w-full text-center mt-16">
          Please sign in to search for videos.
        </p>
      ) : videos.length > 0 ? (
        videos.map((video) => <Card key={video._id} video={video} />)
      ) : (
        <p className="text-gray-600 dark:text-gray-400 w-full text-center mt-4">
          No videos found.
        </p>
      )}
    </div>
  );
};

export default Search;
