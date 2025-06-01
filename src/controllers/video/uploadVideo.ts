import { Request, Response } from "express";
import { Video } from "../../db";
import { uploadToS3Storage } from "../../services/s3-service";

export const uploadVideo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const files = req.files as {
        image?: Express.Multer.File[];
        video?: Express.Multer.File[];
    };
    const imageFile = files.image?.[0];
    const videoFile = files.video?.[0];
    const userId = req.userId;

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    if(!title || !description || !files) {
        res.status(401).json({ "error": "Please provide proper input to upload" });
        return;
    }

    if (!videoFile || !imageFile) {
        res.status(400).json({ "error": "Video and image files are required" });
        return;
    }

    try {
        const [uploadedVideoS3Url, uploadedImageS3Url] = await Promise.all([
            uploadToS3Storage(videoFile),
            uploadToS3Storage(imageFile)
        ]);

        const uploadedVideo = await Video.create({
            title,
            description,
            thumbnail: uploadedImageS3Url,
            videoUrl: uploadedVideoS3Url,
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