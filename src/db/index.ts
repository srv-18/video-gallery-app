import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String , unique: true },
    password: String,
    name: String,
    userVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});

const videoSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    videoUrl: String,
    userId: mongoose.Schema.ObjectId
});

const User = mongoose.model("User", userSchema);
const Video = mongoose.model("video", videoSchema);

export {
    User,
    Video
};