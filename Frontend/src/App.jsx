import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

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

  return (
    <div className="flex">
      {/* Navbar - Always Fixed at the Top */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar - Only Shows When Opened */}
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} isLargeScreen={isLargeScreen} />
        )}

        {/* Main Content (Switches Between Home, Search, Channel) */}

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen && isLargeScreen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
