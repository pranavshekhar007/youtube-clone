import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FilterButtons from "./FilterButtons";
import VideoCard from "./VideoCard";
import sampleVideos from "../utils/sampleVideos";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const handleResize = () => {
          setIsLargeScreen(window.innerWidth >= 1024);
          if (!isLargeScreen) {
            setIsSidebarOpen(false);
          }
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [isLargeScreen]);
    
      const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
    


  // Filter videos based on selected category
  const filteredVideos =
    selectedCategory === "All"
      ? sampleVideos
      : sampleVideos.filter((video) => video.category === selectedCategory);
  
  return (
    <div className="flex">

    <Navbar toggleSidebar={toggleSidebar} />

    {/* Sidebar - Stays hidden when closed */}
    {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} isLargeScreen={isLargeScreen} />}

    <div
      className={`flex-1 transition-all duration-300 ${
        isSidebarOpen && isLargeScreen ? "ml-64" : "ml-0"
      }`}
    >

      {/* Filter & Videos */}
      <div>
        {/* Filter Buttons */}
        <FilterButtons selectedCategory={selectedCategory} setCategory={setSelectedCategory} />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Videos Buttons */}
          {filteredVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
