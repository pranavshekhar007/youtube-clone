import express from "express";
import { addVideo, deleteVideo, getVideo, upDateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, upDateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", verifyToken, getVideo)

export default router;