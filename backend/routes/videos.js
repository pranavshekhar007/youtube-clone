import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, upDateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
import { uploadFiles } from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/", verifyToken,uploadFiles, addVideo)
router.put("/:id", verifyToken, upDateVideo)
router.delete("/:id", verifyToken, deleteVideo)
// router.post("/", verifyToken, addChannelVideo);
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getByTag )
router.get("/search",  search)
 
export default router;