import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [videoType, setVideoType] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
      },
      (error) => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    if (video) {
      uploadFile(video, "videoUrl");
      setVideoType(video.type);
    }
  }, [video]);

  useEffect(() => {
    if (img) uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7070/api/videos", {
        ...inputs,
        tags,
      });
      setOpen(false);
      if (res.status === 200) navigate(`/video/${res.data._id}`);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-full max-w-md md:max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl hover:text-red-500 transition"
          onClick={() => setOpen(false)}
        >
          <AiOutlineClose />
        </button>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold mb-6">
          Upload a New Video
        </h1>

        {/* Video Upload */}
        <label className="block mb-2 text-gray-400">Upload Video:</label>
        <div className="relative border border-gray-700 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer">
          <input
            type="file"
            accept="video/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          <div className="flex items-center justify-center space-x-2">
            <AiOutlineCloudUpload className="text-3xl text-blue-500" />
            <p className="text-sm text-gray-300">
              {video ? video.name : "Click to upload a video"}
            </p>
          </div>
        </div>

        {/* Video Type Display */}
        {video && (
          <p className="text-sm text-gray-400 mt-2">
            Selected Video Type:{" "}
            <span className="text-green-400 font-semibold">{videoType}</span>
          </p>
        )}

        {/* Progress Bar */}
        {videoPerc > 0 && (
          <div className="mt-3 w-full bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${videoPerc}%` }}
            ></div>
            <p className="text-xs text-gray-400 text-center mt-1">
              {videoPerc}% Uploaded
            </p>
          </div>
        )}

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter video title"
          name="title"
          onChange={handleChange}
          className="w-full p-2 mt-4 bg-gray-800 border border-gray-700 rounded-md text-white"
        />

        {/* Description */}
        <textarea
          placeholder="Enter video description"
          name="desc"
          rows="3"
          onChange={handleChange}
          className="w-full p-2 mt-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        ></textarea>

        {/* Tags Input */}
        <input
          type="text"
          placeholder="Separate tags with commas"
          onChange={handleTags}
          className="w-full p-2 mt-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />

        {/* Image Upload */}
        <label className="block mt-4 text-gray-400">Upload Thumbnail:</label>
        <div className="relative border border-gray-700 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <div className="flex items-center justify-center space-x-2">
            <AiOutlineCloudUpload className="text-3xl text-green-500" />
            <p className="text-sm text-gray-300">
              {img ? img.name : "Click to upload a thumbnail"}
            </p>
          </div>
        </div>

        {/* Image Progress Bar */}
        {imgPerc > 0 && (
          <div className="mt-3 w-full bg-gray-700 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${imgPerc}%` }}
            ></div>
            <p className="text-xs text-gray-400 text-center mt-1">
              {imgPerc}% Uploaded
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={videoPerc < 100 || imgPerc < 100}
          className={`w-full mt-6 p-3 rounded-md font-semibold text-white transition ${
            videoPerc < 100 || imgPerc < 100
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {videoPerc < 100 || imgPerc < 100 ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
