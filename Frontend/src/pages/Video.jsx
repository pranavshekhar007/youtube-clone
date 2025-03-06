import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply, FaSave } from "react-icons/fa";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Comments from "../Components/Comments";
import Recommendation from "../Components/Recommendation";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `http://localhost:7070/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `http://localhost:7070/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error fetching video/channel:", err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if (!currentUser) return;
    await axios.put(`http://localhost:7070/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    if (!currentUser) return;
    await axios.put(`http://localhost:7070/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    if (currentUser.subscribedUsers.includes(channel._id)) {
      await axios.put(`http://localhost:7070/api/users/unsub/${channel._id}`);
    } else {
      await axios.put(`http://localhost:7070/api/users/sub/${channel._id}`);
    }
    dispatch(subscription(channel._id));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 mt-16">
      {/* Video Content */}
      <div className="w-full lg:w-2/3">
        <div className="relative w-full h-[250px] md:h-[450px] lg:h-[500px] rounded-lg shadow-lg overflow-hidden">
          {currentVideo.videoUrl.includes("youtube.com") ||
          currentVideo.videoUrl.includes("youtu.be") ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={currentVideo.videoUrl.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              className="w-full h-full object-cover rounded-lg shadow-lg"
              src={`http://localhost:7070${currentVideo.videoUrl}`}
              controls
            />
          )}
        </div>

        <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white mt-4">
          {currentVideo.title}
        </h1>

        <div className="flex flex-wrap justify-between items-center text-gray-600 dark:text-gray-300 mt-2">
          <span>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </span>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2" onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <FaThumbsUp className="text-blue-600" />
              ) : (
                <FaRegThumbsUp />
              )}
              {currentVideo.likes?.length}
            </button>
            <button className="flex items-center gap-2" onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <FaThumbsDown className="text-red-600" />
              ) : (
                <FaRegThumbsDown />
              )}
              Dislike
            </button>
            <button className="flex items-center gap-2">
              <FaReply /> Share
            </button>
            <button className="flex items-center gap-2">
              <FaSave /> Save
            </button>
          </div>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Channel Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 rounded-full" src={channel.img} alt="Channel Avatar" />
            <div className="text-gray-800 dark:text-white">
              <span className="font-semibold">{channel.name}</span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {channel.subscribers} subscribers
              </p>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                {currentVideo.desc}
              </p>
            </div>
          </div>
          <button
            onClick={handleSub}
            className={`px-4 py-2 rounded text-white font-medium ${
              currentUser.subscribedUsers?.includes(channel._id)
                ? "bg-gray-500"
                : "bg-red-600"
            }`}
          >
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {/* Comments */}
        <Comments videoId={currentVideo._id} />
      </div>

      {/* Recommendations */}
      <div className="w-full lg:w-1/3">
        <Recommendation tags={currentVideo.tags} />
      </div>
    </div>
  );
};

export default Video;
