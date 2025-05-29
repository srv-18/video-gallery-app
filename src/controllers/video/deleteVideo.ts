import { Request, Response } from "express";
import { Video } from "../../db";
import { deleteFromS3Storage } from "../../services/s3-service";

export const deleteVideo = async (req: Request, res: Response) => {
    const videoId = req.params.id;
    const userId = req.userId;

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    try {
        const deletedVideo = await Video.findOneAndDelete({
            _id: videoId,
            userId: userId
        });
        if (!deletedVideo) {
            res.status(404).json({ "error": "Video not found or you don't have permission to delete it" });
            return;
        }

        // Delete video from S3
        try {
            await deleteFromS3Storage(deletedVideo.thumbnail!);
            await deleteFromS3Storage(deletedVideo.videoUrl!);
        } catch (error) {
            console.error("Error deleting files from S3:", error);
        }

        res.status(200).json({ "message": "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
        return;
    }
};