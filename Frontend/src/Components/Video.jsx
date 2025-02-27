import React from "react";
import { Link } from "react-router-dom";

const Video = (video) => {
  console.log(video);
  return (
    <div>
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col">

            {/* thumbnail & duration   */}
          <div className="h-48 md:h-56 md: rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img
              className="h-full w-full"
              src={video?.thumbnails[0]?.url}
              alt=""
            />
            {video?.lengthSeconds && <Time />} 
          </div>
          {/* channel logo title  */}
          <div className="flex mt-3 space-x-2">
          <div className=" flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                <img 
                className="h-full w-full rounded-full overflow-hidden"
                src="channel logo" 
                alt="" />
            </div>
          </div>
          <div>
            <span className="text-sm fo">
                {video?.title}
            </span>
            <span>{channelName}</span>
            <div>Views</div>
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Video;
