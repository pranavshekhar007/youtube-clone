import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full cursor-pointer transition-transform transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail / Video */}
      <div className="relative w-full h-[180px] bg-gray-200 rounded-lg overflow-hidden">
        {!isHovered ? (
          <>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FaPlay className="text-white text-4xl bg-black bg-opacity-50 p-3 rounded-full" />
            </div>
          </>
        ) : (
          <video src={video.videoUrl} autoPlay muted loop className="w-full h-full object-cover" />
        )}
      </div>

      {/* Video Details */}
      <div className="flex mt-3">
        {/* Channel Avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channelName}
          className="w-10 h-10 rounded-full mr-3"
        />

        {/* Video Info */}
        <div>
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-gray-500 text-xs">{video.channelName}</p>
          <p className="text-gray-500 text-xs">{video.views} • {video.uploadDate}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
