import { Request, Response } from "express";
import { User } from "../../db";

export const updateUser = async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.userId;

    if(!name) {
        res.status(401).json({ "error": "Invalid Input" });
        return;
    }

    if(!userId) {
        res.status(401).json({ "error": "User not authenticated" });
        return;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name },
            { new: true }
        ).select(['-password']);  // Exclude password from response

        if (!updatedUser) {
            res.status(404).json({ "error": "User not found" });
            return;
        }

        res.status(200).json({ "message": "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ "internal error": error });
        return;
    }
};