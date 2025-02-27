import React, { useEffect, useState } from "react";
import FilterButtons from "../Components/FilterButtons";
import { useAuth } from "../context/AuthProvider";
import Video from "./Video";
// import VideoCard from "./VideoCard";
// import sampleVideos from "../utils/sampleVideos";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    


  // Filter videos based on selected category
  // const filteredVideos =
  //   selectedCategory === "All"
  //     ? sampleVideos
  //     : sampleVideos.filter((video) => video.category === selectedCategory);


  const { data } = useAuth();
  console.log(data);
   
  return (
    <div className="flex">

        <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
          { data.map((item) => {
              if(item.type !== "video") return false;
              return <Video key={item.id} video={item?.video} />
            })}
        </div>
        </div>

   

  

      {/* Filter & Videos */}
      <div>
        {/* Filter Buttons */}
        <FilterButtons selectedCategory={selectedCategory} setCategory={setSelectedCategory} />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Videos Buttons */}
          {/* {filteredVideos.map((video) => (
             <VideoCard key={video.videoId} video={video} /> 
           ))}  */}
        </div>
      </div>
    </div>
  );
};

export default Home;
