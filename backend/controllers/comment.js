import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    if (!req.user) {
        return next(createError(401, "User not authenticated"));
    }

    const newComment = new Comment({ ...req.body,
        videoId: String(req.body.videoId), userId: req.user.id });

    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id); // Fix here
        if (!comment) return next(createError(404, "Comment not found!"));

        const video = await Video.findById(comment.videoId); // Fix here
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } else {
            return next(createError(403, "You can delete only your comment!"));
        }
    } catch (err) {
        next(err);
    }
};


export const getComments = async (req, res, next) => {
    try {
        console.log("Fetching comments for videoId:", req.params.videoId); // Debugging log
        const comments = await Comment.find({ videoId: String(req.params.videoId) });
        console.log("Comments fetched:", comments); // Debugging log
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};
