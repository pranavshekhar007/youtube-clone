import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data || []); // Ensure comments is always an array
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  return (
    <div className="w-full">
      {/* Comment Input */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={currentUser?.img || "/default-avatar.png"} // Fallback avatar
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border-none border-b border-gray-300 bg-transparent outline-none p-1 text-gray-800 dark:text-white"
        />
      </div>

      {/* Display Comments */}
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment._id} comment={comment} />)
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default Comments;
