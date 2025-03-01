import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:7070/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <div className="flex-2">
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Recommendation;
