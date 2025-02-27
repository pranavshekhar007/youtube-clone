import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import videoRoutes from "./routes/videoRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        throw err;
    });
}

app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/userRoutes", userRoutes);
app.use("/api/videoRoutes", videoRoutes);
app.use("/api/commentRoutes", commentRoutes);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

const PORT = 7070;

app.listen(PORT, () =>{
    connect()
    console.log(`Server is running on port ${PORT}`);
} )