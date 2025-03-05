// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Card from "../Components/Card";

// const Profile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [videos, setVideos] = useState([]);
//   const [editingVideo, setEditingVideo] = useState(null);
//   const [newTitle, setNewTitle] = useState("");

//   useEffect(() => {
//     const fetchUserVideos = async () => {
//       try {
//         const res = await axios.get(`http://localhost:7070/api/videos/user/${currentUser._id}`);
//         setVideos(res.data);
//       } catch (error) {
//         console.error("Error fetching user videos:", error);
//       }
//     };

//     if (currentUser) {
//       fetchUserVideos();
//     }
//   }, [currentUser]);

//   // Handle Video Deletion
//   const handleDelete = async (videoId) => {
//     try {
//       await axios.delete(`http://localhost:7070/api/videos/${videoId}`);
//       setVideos(videos.filter((video) => video._id !== videoId));
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   // Handle Edit Click
//   const handleEditClick = (video) => {
//     setEditingVideo(video._id);
//     setNewTitle(video.title);
//   };

//   // Handle Video Update
//   const handleUpdate = async (videoId) => {
//     try {
//       await axios.put(`http://localhost:7070/api/videos/${videoId}`, { title: newTitle });
//       setVideos(videos.map((video) => (video._id === videoId ? { ...video, title: newTitle } : video)));
//       setEditingVideo(null);
//     } catch (error) {
//       console.error("Error updating video:", error);
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl font-semibold">User not found. Please sign in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mt-15">
//       {/* Channel Banner */}
//       <div className="relative h-60 bg-blue-500">
//         <img
//           src={currentUser?.banner || "/default-banner.jpg"}
//           alt="Channel Banner"
//           className="w-full h-full object-cover"
//         />
//         {/* Profile Image on Banner */}
//         <div className="absolute bottom-[-40px] left-10">
//           <img
//             src={currentUser?.img || "/default-avatar.png"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
//           />
//         </div>
//       </div>

//       {/* Channel Info */}
//       <div className="px-10 py-4 mt-10 flex justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold">{currentUser.name}</h2>
//           <p className="text-gray-600">@{currentUser.username}</p>
//           <p className="text-gray-500">{currentUser.subscribers || 0} subscribers • {videos.length} videos</p>
//         </div>
//         <button className="bg-black text-white px-6 py-2 rounded-full text-lg font-semibold">
//           Subscribe
//         </button>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="border-b border-gray-300 mt-4">
//         <div className="flex space-x-6 px-10">
//           <button className="py-2 border-b-2 border-black font-semibold">Home</button>
//           <button className="py-2 text-gray-600">Videos</button>
//           <button className="py-2 text-gray-600">Shorts</button>
//           <button className="py-2 text-gray-600">Playlists</button>
//           <button className="py-2 text-gray-600">Community</button>
//         </div>
//       </div>

//       {/* Video Filter Bar */}
//       <div className="flex gap-4 px-10 mt-6">
//         <button className="bg-gray-900 text-white px-4 py-2 rounded-full">Latest</button>
//         <button className="bg-gray-200 px-4 py-2 rounded-full">Popular</button>
//         <button className="bg-gray-200 px-4 py-2 rounded-full">Oldest</button>
//       </div>

//       {/* Videos Section */}
//       <div className="w-full px-10 mt-6">
//         <h3 className="text-2xl font-semibold mb-4">Videos</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {videos.length > 0 ? (
//             videos.map((video) => (
//               <div
//                 key={video._id}
//                 className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 overflow-hidden"
//               >
//                 <Card video={video} />
//                 {/* Edit and Delete Buttons */}
//                 <div className="mt-4 flex justify-between items-center">
//                   {editingVideo === video._id ? (
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="text"
//                         className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                         value={newTitle}
//                         onChange={(e) => setNewTitle(e.target.value)}
//                       />
//                       <button
//                         onClick={() => handleUpdate(video._id)}
//                         className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingVideo(null)}
//                         className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleEditClick(video)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(video._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700">No videos uploaded yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
