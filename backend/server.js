import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js"
import users from "./routes/users.js"
import videos from "./routes/videos.js"
import comments from "./routes/comments.js"
import channels from "./routes/channels.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();
const app = express();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        throw err;
    });
}

app.use(cors({
    origin: "http://localhost:5173", // Allow frontend requests
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/videos", videos);
app.use("/api/comments", comments);
app.use("/api/channels", channels);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () =>{
    connect()
    console.log(`Server is running on port ${PORT}`);
} )