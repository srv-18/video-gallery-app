import { Request, Response } from "express";

export const searchVideos = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from searchVideos" });
};