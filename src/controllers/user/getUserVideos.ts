import { Request, Response } from "express";
import { Video } from "../../db";

export const getUserVideos = async (req: Request, res: Response) => {
    const userId = req.userId;

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    try {
        const userVideos = await Video.find({ 
            userId: userId
        });

        if (userVideos.length === 0) {
            res.status(404).json({ "error": "No videos uploaded yet" });
            return;
        }

        res.status(200).json(
            userVideos.map(video => ({
                id: video._id,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
                videoUrl: video.videoUrl,
                userId: video.userId
            }))
        );
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ "error": "Internal server error" });
        return;
    }
};