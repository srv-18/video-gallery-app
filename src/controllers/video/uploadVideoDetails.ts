import { Request, Response } from "express";
import { Video } from "../../db";
import env from "../../env/variables";

export const uploadVideoDetails = async (req: Request, res: Response) => {
    const { title, description, imageKey, videoKey } = req.body;
    const userId = req.userId;

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    if(!title || !description || !imageKey || !videoKey) {
        res.status(401).json({ "error": "Please provide proper input to upload" });
        return;
    }

    try {
        const uploadedVideo = await Video.create({
            title,
            description,
            thumbnail: `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${imageKey}`,
            videoUrl: `${env.S3_ENDPOINT}/${env.S3_BUCKET_NAME}/${videoKey}`,
            userId
        });

        if (!uploadedVideo) {
            res.status(404).json({ "error": "Video not uploaded. Re-try again" });
            return;
        }

        res.status(200).json({ "message": "Video uploaded successfully" ,
            video: {
                id: uploadedVideo._id,
                title: uploadedVideo.title,
                description: uploadedVideo.description,
                thumbnail: uploadedVideo.thumbnail,
                videoUrl: uploadedVideo.videoUrl,
                userId: uploadedVideo.userId
            }
        });
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
        return;
    }
};