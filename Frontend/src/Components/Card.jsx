import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (video?.userId) {
          const res = await axios.get(`http://localhost:7070/api/users/find/${video.userId}`);
          setChannel(res.data);
        }
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    fetchChannel();
  }, [video?.userId]);

  if (!video) {
    return <p>Loading video...</p>;
  }

  return (
    <Link to={`/video/${video._id}`} className="no-underline">
      <div
        className={`${
          type !== "sm" ? "w-[360px] mb-11" : "mb-2 flex gap-2"
        } cursor-pointer`}
      >
        <img
          className={`w-full ${type === "sm" ? "h-[120px]" : "h-[202px]"} bg-gray-400 flex-1`}
          src={video.imgUrl || "/placeholder.jpg"} // Fallback image
          alt="video thumbnail"
        />
        <div className={`flex gap-3 flex-1 ${type !== "sm" ? "mt-4" : ""}`}>
          <img
            className={`w-9 h-9 rounded-full bg-gray-400 ${type === "sm" ? "hidden" : "block"}`}
            src={channel?.img || "/default-avatar.png"} // Prevents crash
            alt="channel avatar"
          />
          <div>
            <h1 className="text-lg font-medium text-textColor">{video.title || "Untitled Video"}</h1>
            <h2 className="text-sm text-textSoft mt-2 mb-2">{channel?.name || "Unknown Channel"}</h2>
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
