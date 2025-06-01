import { Request, Response } from "express";
import { Video } from "../../db";

export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();

        if (videos.length === 0) {
            res.status(404).json({ "error": "No videos uploaded yet" });
            return;
        }

        res.status(200).json(
            videos.map(v => ({
                id: v._id,
                title: v.title,
                description: v.description,
                thumbnail: v.thumbnail,
                videoUrl: v.videoUrl,
                userId: v.userId
            }))
        );
    } catch (error) {
        res.status(500).json({ "internal error": error });
        return;
    }
};