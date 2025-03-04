import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";
// import Channel from "../models/Channel.js";



// ✅ Add a new video
// export const addChannelVideo = async (req, res, next) => {
//   try {
//     console.log("Incoming Request Body:", req.body);
//     console.log("Logged-In User ID:", req.user.id);

//     // 🔹 Find the channel linked to the logged-in user
//     const channel = await Channel.findOne({ userId: req.user.id });

//     if (!channel) {
//       console.log("❌ No channel found for this user.");
//       return next(createError(400, "You need to create a channel first!"));
//     }

//     console.log("✅ Channel Found:", channel);

//     // 🔹 Check if the request includes a file (video)
//     if (!req.file) {
//       return next(createError(400, "No video file uploaded!"));
//     }

//     console.log("✅ Uploaded File Details:", req.file);

//     // 🔹 Create a new video object
//     const newVideo = new Video({
//       userId: req.user.id,
//       channelId: channel._id,
//       title: req.body.title,
//       description: req.body.description,
//       videoUrl: req.file.path, // Store video file path
//       tags: req.body.tags ? req.body.tags.split(",") : [],
//     });

//     // 🔹 Save the video in the database
//     const savedVideo = await newVideo.save();
//     console.log("✅ Video Saved Successfully:", savedVideo);

//     // 🔹 Add the video ID to the channel's video list
//     channel.videos.push(savedVideo._id);
//     await channel.save();
//     console.log("✅ Video ID added to channel:", channel.videos);

//     // 🔹 Send the response back
//     res.status(201).json(savedVideo);
//   } catch (err) {
//     console.error("❌ Error in addChannelVideo:", err);
//     next(err);
//   }
// };


export const addVideo = async (req, res) => {
  try {
    console.log("User authenticated:", req.user); // Debug authentication

    if (!req.files || !req.files.videoFile || !req.files.imgFile) {
      return res.status(400).json({ error: "Image and video files are required." });
    }

    const newVideo = new Video({
      userId: req.user.id,
      title: req.body.title,
      desc: req.body.desc,
      tags: req.body.tags.split(","),
      videoUrl: `/uploads/${req.files.videoFile[0].filename}`,
      imgUrl: `/uploads/${req.files.imgFile[0].filename}`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const upDateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video! "));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has deleted");
    } else {
      return next(createError(403, "You can deleted only your video! "));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};


export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The View has been increased");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat());
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
