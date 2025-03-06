import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Comment = ({ comment, onDelete }) => {
  const [channel, setChannel] = useState({}); // Stores channel/user details of the comment author
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux state

  // Fetch user details of the comment author
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

  // Handle comment deletion
  const handleDelete = async () => {
    try {
      if (!currentUser) {
        return;
      }

      const token = currentUser.token; // Get authentication token from Redux state
      await axios.delete(`http://localhost:7070/api/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Send authorization header
      });

      onDelete(comment._id); // Call onDelete function to update UI after deletion
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="flex gap-2 my-7">
      {/* Display user avatar */}
      <img
        className="w-12 h-12 rounded-full"
        src={channel.img || "/default-avatar.png"} // Fallback to default avatar
        alt="avatar"
      />
      <div className="flex flex-col gap-2 text-textColor">
        {/* Display user name and comment time */}
        <span className="text-sm font-medium">
          {channel.name} <span className="text-xs font-normal text-textSoft ml-1">1 day ago</span>
        </span>
        {/* Display comment content */}
        <span className="text-base">{comment.desc}</span>
      </div>

      {/* Show delete button only if current user is the comment owner */}
      {(currentUser?._id === comment.userId || currentUser?._id === channel._id) && (
        <button className="text-red-500 text-sm" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Comment;
