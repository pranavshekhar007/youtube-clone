import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "axios";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
      const res = await axios.get("http://localhost:7070/api/videos/" + type);
      console.log("Full Response:", res); // Log full response
      console.log("API Response Data:", res.data);
      setVideos(res.data); // Ensure `res.data` is an array
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <div className=" mt-16 flex flex-wrap justify-between">
      {Array.isArray(videos) ? videos.map((video) => (
        <Card key={video._id} video={video} />
      )) : <p>Loading videos...</p>}
    </div>
  );
};

export default Home;
