import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Comment = ({ comment, onDelete }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`http://localhost:7070/api/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async () => {
    try {
      if (!currentUser) {
        console.log("User not authenticated");
        return;
      }

      const token = currentUser.token; // Get token from Redux state
      await axios.delete(`http://localhost:7070/api/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(comment._id); // Remove comment from UI
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="flex gap-2 my-7">
      <img
        className="w-12 h-12 rounded-full"
        src={channel.img || "/default-avatar.png"}
        alt="avatar"
      />
      <div className="flex flex-col gap-2 text-textColor">
        <span className="text-sm font-medium">
          {channel.name} <span className="text-xs font-normal text-textSoft ml-1">1 day ago</span>
        </span>
        <span className="text-base">{comment.desc}</span>
      </div>

      {/* Show delete button only if user owns the comment */}
      {(currentUser?._id === comment.userId || currentUser?._id === channel._id) && (
        <button className="text-red-500 text-sm" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Comment;
