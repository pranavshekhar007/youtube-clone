import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";


// ✅ Enable cookies in all axios requests
axios.defaults.withCredentials = true;

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
    <div className="flex">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} isLargeScreen={isLargeScreen} />
        )}

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
    </PersistGate>
    </Provider>
  );
};

export default App;
