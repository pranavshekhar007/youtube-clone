import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when component mounts or videoId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:7070/api/comments/${videoId}`);
        setComments(res.data || []); // Ensure comments is always an array
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) return; // Prevent empty comments
      const token = currentUser.token; // Get authentication token

      const res = await axios.post(
        "http://localhost:7070/api/comments/",
        {
          videoId,
          desc: newComment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [res.data, ...prev]); // Add new comment at the top
      setNewComment(""); // Clear input field after submission
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment._id !== id));
  };

  return (
    <div className="w-full">
      {/* Input field for adding a new comment */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={currentUser?.img || "/default-avatar.png"} // User avatar
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border-none border-b border-gray-300 bg-transparent outline-none p-1 text-gray-800 dark:text-white"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>

      {/* Display list of comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} onDelete={handleDeleteComment} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default Comments;
