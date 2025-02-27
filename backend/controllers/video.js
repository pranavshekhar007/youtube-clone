import User from "../models/User.js"
import Video from "../models/Video.js"
import { createError } from "../error.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body});
    try {
        const saveVideo = await newVideo.save()
        res.status(200).json(saveVideo);
    } catch (error){next(err)} 
}

export const upDateVideo = async (req, res, next) => {
    
}

export const deleteVideo = async (req, res, next) => {
    
}

export const getVideo = async (req, res, next) => {
    
}