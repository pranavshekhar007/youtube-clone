import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js"; // Formats timestamps in a human-readable way

const Card = ({ type, video }) => {
  // State to store channel details
  const [channel, setChannel] = useState(null);
  // State to track if video is playing (not used currently)
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch channel details based on video userId
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (video?.userId) {
          const res = await axios.get(
            `http://localhost:7070/api/users/find/${video.userId}`
          );
          setChannel(res.data);
        }
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    fetchChannel();
  }, [video?.userId]);

  // If video data is not available yet, show loading text
  if (!video) {
    return <p>Loading video...</p>;
  }

  return (
    <Link to={`/video/${video._id}`} className="no-underline">
      <div
        className={`${
          type !== "sm" ? "w-[360px] mb-11" : "mb-2 flex gap-2"
        } cursor-pointer`}
        onClick={() => setIsPlaying(true)} // Set playing state when clicked (not utilized yet)
      >
        {/* Video Thumbnail */}
        <img
          className={`w-full ${
            type === "sm" ? "h-[120px]" : "h-[202px]"
          } bg-gray-400 flex-1`}
          src={
            video.imgUrl
              ? video.imgUrl.startsWith("http")
                ? video.imgUrl
                : `http://localhost:7070${video.imgUrl}` // Ensures valid URL
              : "/placeholder.jpg" // Default placeholder image
          }
          alt="video thumbnail"
        />

        {/* Video Details Section */}
        <div className={`flex gap-3 flex-1 ${type !== "sm" ? "mt-4" : ""}`}>
          {/* Channel Avatar (Hidden in Small View) */}
          <img
            className={`w-9 h-9 rounded-full bg-gray-400 ${
              type === "sm" ? "hidden" : "block"
            }`}
            src={channel?.img || "/default-avatar.png"} // Prevents crash if no image
            alt="channel avatar"
          />
          
          {/* Video Information */}
          <div>
            {/* Video Title */}
            <h1 className="text-lg font-medium text-textColor">
              {video.title || "Untitled Video"}
            </h1>
            
            {/* Channel Name */}
            <h2 className="text-sm text-textSoft mt-2 mb-2">
              {channel?.name || "Unknown Channel"}
            </h2>
            
            {/* Video Views and Upload Time */}
            <div className="text-sm text-textSoft">
              {video.views ? `${video.views} views` : "0 views"} • {video.createdAt ? format(video.createdAt) : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;