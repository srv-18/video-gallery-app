import { Request, Response } from "express";
import { Video } from "../../db";
import { getPresignedUrl } from "../../services/s3-service";

export const getUploadUrl = async (req: Request, res: Response) => {
    const { fileName } = req.body;
    const userId = req.userId;

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    if(!fileName) {
        res.status(401).json({ "error": "Please provide proper input to get url" });
        return;
    }

    try {
        const { url, key } = await getPresignedUrl(fileName);

        res.status(200).json({ signedUrl: url, key });
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
        return;
    }
};