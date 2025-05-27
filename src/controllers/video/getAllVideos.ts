import { Request, Response } from "express";

export const getAllVideos = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from getAllVideos" });
};