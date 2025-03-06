import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";

const VideoUpload = () => {
  // Get the current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle video upload process
  const handleUpload = async () => {
    // Check if the user is signed in
    if (!currentUser) {
      alert("Please sign in to upload content");
      return;
    }

    // Validate that all required fields are filled
    if (!title || !desc || !imgFile || !videoFile) {
      alert("Please fill all fields and upload files");
      return;
    }

    setLoading(true); // Start loading state

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("imgFile", imgFile);
    formData.append("videoFile", videoFile);

    try {
      // Send POST request to upload the video
      await axios.post("http://localhost:7070/api/videos", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Upload Video successfully! 🎉"); // Show success message
    } catch (error) {
      alert("Failed to upload video"); // Show error message
    }

    setLoading(false); // Stop loading state
  };

  // Show message if user is not signed in
  if (!currentUser) {
    return (
      <div className="max-w-lg mt-20 mx-auto p-8 bg-gray-800 shadow-lg rounded-lg text-center border border-gray-700 text-white">
        <h2 className="text-3xl font-bold mb-4 text-red-500">Please Sign In</h2>
        <p className="text-lg text-gray-300">You need to sign in to upload content.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mt-16 mx-auto p-6 bg-gray-900 shadow-lg rounded-lg text-white border border-gray-700">
      {/* Welcome Message */}
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome, {currentUser.username}</h2>

      {/* Video Upload Form */}
      <div className="space-y-4">
        {/* Video Title Input */}
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />

        {/* Video Description Input */}
        <textarea
          placeholder="Video Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        ></textarea>

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />

        {/* Thumbnail Upload */}
        <div className="p-4 border-2 border-dashed border-gray-500 rounded-lg text-center cursor-pointer hover:bg-gray-700">
          <label className="block">
            <FiUploadCloud className="inline-block text-4xl mb-2 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImgFile(e.target.files[0])}
              className="hidden"
            />
            {imgFile ? imgFile.name : "Upload Thumbnail"}
          </label>
        </div>

        {/* Video File Upload */}
        <div className="p-4 border-2 border-dashed border-gray-500 rounded-lg text-center cursor-pointer hover:bg-gray-700">
          <label className="block">
            <FiUploadCloud className="inline-block text-4xl mb-2 text-gray-400" />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="hidden"
            />
            {videoFile ? videoFile.name : "Upload Video"}
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
