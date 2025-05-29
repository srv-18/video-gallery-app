import { Request, Response } from "express";
import { Video } from "../../db";

interface VideoUpdateData {
    title?: string;
    description?: string;
    thumbnail?: string;
}

export const updateVideo = async (req: Request, res: Response) => {
    const { title, description, thumbnail } = req.body;
    const videoId = req.params.id;
    const userId = req.userId;

    if(!title && !description && !thumbnail) {
        res.status(401).json({ "error": "Please provide input to update" });
        return;
    }

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    try {
        const updateData: VideoUpdateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (thumbnail) updateData.thumbnail = thumbnail;

        const updatedVideo = await Video.findOneAndUpdate(
            { _id: videoId, userId: userId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedVideo) {
            res.status(404).json({ "error": "Video not found or you don't have permission to update it" });
            return;
        }

        res.status(200).json({ "message": "Video updated successfully", video: updatedVideo });
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
        return;
    }
};