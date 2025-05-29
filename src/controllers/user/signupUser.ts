import { Request, Response } from "express";
import { User } from "../../db";
import bcrypt from "bcrypt";

export const signupUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if(!email || !password || !name) {
        res.status(401).json({ "error": "Invalid Input" });
        return;
    }
    
    try {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            res.status(409).json({ error: "Email already registered" });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await User.create({ email, password: hashedPassword, name });

        res.status(201).json( newUser);
        return;
    } catch (error) {
        res.status(500).json({ "internal error": error });
        return;
    }
};