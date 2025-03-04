import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Import jwtDecode

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // ✅ Store decoded user info

  // ✅ Decode JWT Token and Set User
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // ✅ Store user info
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  const handleUpload = async () => {
    if (!title || !desc || !imgFile || !videoFile) {
      alert("Please fill all fields and upload files");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("imgFile", imgFile);
    formData.append("videoFile", videoFile);

    console.log("Uploading:", { title, desc, tags, imgFile, videoFile });

    try {
      const response = await axios.post("http://localhost:7070/api/videos", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Send token in header
        },
      });
      alert("Video uploaded successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload video");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mt-16 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {user ? `Welcome, ${user.username}` : "Upload Video"} {/* ✅ Show username */}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImgFile(e.target.files[0])}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleUpload}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
};

export default VideoUpload;
