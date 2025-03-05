import React from "react";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { MdWatchLater } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgMediaLive } from "react-icons/cg";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { MdPodcasts } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { GiLargeDress } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";
import {
  MdMovie,
  MdSettings,
  MdFlag,
  MdHelp,
  MdFeedback,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, isLargeScreen }) => {
  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      icon: <GoHome />,
      path: "/"
    },
    {
      id: 2,
      name: "Your Channel",
      icon: <MdPerson />,
      path: "/channel"
    },
    {
      id: 3,
      name: "Subscription",
      icon: <MdOutlineSubscriptions />,
      path: "/subscriptions"
    },
  ];

  const sidebarItems2 = [
    {
      id: 1,
      name: "Shorts",
      icon: <SiYoutubeshorts />,
    },
    {
      id: 2,
      name: "History",
      icon: <MdHistory />,
    },
    {
      id: 3,
      name: "Playlists",
      icon: <MdPlaylistPlay />,
    },
    {
      id: 4,
      name: "Your Videos",
      icon: <BiVideo />,
    },
    {
      id: 5,
      name: "Watch Later",
      icon: <MdWatchLater />,
    },
    {
      id: 6,
      name: "Liked Videos",
      icon: <AiOutlineLike />,
    },
  ];

  const sidebarItems3 = [
    {
      id: 1,
      name: "Trending",
      icon: <AiOutlineFire />,
    },
    {
      id: 2,
      name: "Shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      id: 3,
      name: "Music",
      icon: <SiYoutubemusic />,
    },
    {
      id: 4,
      name: "Films",
      icon: <MdMovie />,
    },
    {
      id: 5,
      name: "Live",
      icon: <CgMediaLive />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <SiYoutubegaming />,
    },
    {
      id: 7,
      name: "News",
      icon: <FaRegNewspaper />,
    },
    {
      id: 8,
      name: "Sports",
      icon: <MdSportsSoccer />,
    },
    {
      id: 9,
      name: "Courses",
      icon: <FaGraduationCap />,
    },
    {
      id: 10,
      name: "Fashion & beauty",
      icon: <GiLargeDress />,
    },
    {
      id: 11,
      name: "Podcasts",
      icon: <MdPodcasts />,
    },
  ];

  const sidebarItems4 = [
    {
      id: 1,
      name: "Youtube Premium",
      icon: <FaYoutube />,
    },
    {
      id: 2,
      name: "Youtube Studio",
      icon: <SiYoutubestudio />,
    },
    {
      id: 3,
      name: "Yotube Music",
      icon: <SiYoutubemusic />,
    },
  ];

  const sidebarItems5 = [
    {
      id: 1,
      name: "Setting",
      icon: <MdSettings />,
    },
    {
      id: 2,
      name: "Report History",
      icon: <MdFlag />,
    },
    {
      id: 3,
      name: "Help",
      icon: <MdHelp />,
    },
    {
      id: 4,
      name: "Send Feedback",
      icon: <MdFeedback />,
    },
  ];

  return (
    <div
    className={`h-full bg-white overflow-y-auto 
      fixed top-10 transition-transform duration-300
      ${isOpen ? "translate-x-0 w-1/4 sm:w-64" : "-translate-x-64"}
      ${isLargeScreen ? "lg:translate-x-0 lg:block w-64" : "fixed z-50"}`}
  >
      <div className="mt-10">
        {/* Home  */}
        <div className=" space-y-3 items-center">
          {sidebarItems.map((item) => {
            return (
              <Link key={item.id} to={item.path}>
              <div
                
                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
                >
                <div className="text-xl cursor-pointer">{item.icon}</div>
                <span className="cursor-pointer">{item.name}</span>
              </div>
                </Link>
            );
          })}
        </div>
        <br />
        <hr />

        {/* You */}
        <div className="mt-4 space-y-3 items-center">
          <div className="flex items-center space-x-4 hover:bg-gray-200 duration-300 rounded-xl p-1 cursor-pointer">
            <h1>You</h1>
            <FaChevronRight />
          </div>
          {sidebarItems2.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
              >
                <div className="text-xl cursor-pointer">{item.icon}</div>
                <span className="cursor-pointer">{item.name}</span>
              </div>
            );
          })}
        </div>
        <br />
        <hr />

        {/* Explore */}
        <div className="mt-4 space-y-3 items-center">
          <div className="flex items-center space-x-4 hover:bg-gray-200 duration-300 rounded-xl p-1 cursor-pointer">
            <h1 className="font-semibold">Explore</h1>
          </div>
          {sidebarItems3.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
              >
                <div className="text-xl cursor-pointer">{item.icon}</div>
                <span className="cursor-pointer">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <hr />

      {/* More Section */}
      <div className="mt-4 space-y-3 items-center">
        <div className="flex items-center space-x-4 hover:bg-gray-200 duration-300 rounded-xl p-1 cursor-pointer">
          <h1 className="font-semibold">More From Youtube</h1>
        </div>
        {sidebarItems4.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer text-red-500">
                {item.icon}
              </div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
      </div>
      <br />
      <hr />

      {/* Setting and details Section */}
      <div className="mt-4 space-y-3 items-center">
        {sidebarItems5.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
      </div>
      <br />
      <hr />
      <br />
      <span className="text-xs font-semibold text-gray-500">
        About Press Copyright <br /> <br />
        Contact usCreator Advertise Developers
        <br /> <br />
        <p>
          Terms Privacy Policy & Safety <br /> How YouTube works <br /> Test new
          features
        </p>
        <br />
        <p>© 2025 Pranav Shekhar</p>
      </span>
    </div>
  );
};

export default Sidebar;
