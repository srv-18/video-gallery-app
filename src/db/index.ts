import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String , unique: true },
    password: { type: String , require: true },
    name: { type: String , require: true },
    userVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});

const videoSchema = new Schema({
    title: { type: String , require: true },
    description: { type: String , require: true },
    thumbnail: { type: String , require: true },
    videoUrl: { type: String , require: true },
    userId: { type: mongoose.Schema.ObjectId, require: true }
});

const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", videoSchema);

export {
    User,
    Video
};