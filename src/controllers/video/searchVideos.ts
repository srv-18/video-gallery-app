import { Request, Response } from "express";
import { Video } from "../../db";

export const searchVideos = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if(!title && !description) {
        res.status(401).json({ "error": "Please provide input for search" });
        return;
    }
    
    try {
        if(title) {
            const searchByTitle = await Video.find({ title:{$regex: title, $options: "i"} });
            if (searchByTitle.length === 0) {
                res.status(404).json({ "error": "No videos found" });
                return;
            }
    
            res.status(200).json({ searchByTitle });
        } else {
            const searchVByDescription = await Video.find({ description:{$regex: description, $options: "i"} });
            if (searchVByDescription.length === 0) {
                res.status(404).json({ "error": "No videos found" });
                return;
            }
    
            res.status(200).json({ searchVByDescription });
        }
    } catch (error) {
        res.status(500).json({ "internal error": error });
        return;
    }
};