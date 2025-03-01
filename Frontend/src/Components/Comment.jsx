import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/userRoutes/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <div className="flex gap-2 my-7">
      <img
        className="w-12 h-12 rounded-full"
        src={channel.img}
        alt="avatar"
      />
      <div className="flex flex-col gap-2 text-textColor">
        <span className="text-sm font-medium">
          {channel.name} <span className="text-xs font-normal text-textSoft ml-1">1 day ago</span>
        </span>
        <span className="text-base">{comment.desc}</span>
      </div>
    </div>
  );
};

export default Comment;
