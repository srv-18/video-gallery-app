import { Request, Response } from "express";
import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../env/variables";

export const signinUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(401).json({ "error": "Invalid Input" });
        return;
    }
    
    try {
        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({"error": "User not found"});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password!);
        if(!isMatch){
            res.status(401).json({"error": "Invalid credentials"});
            return;
        }

        const jwtToken = jwt.sign({ id: user._id }, env.JWT_SECRET );

        res.cookie("jwt", jwtToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
            maxAge: 14*24*3600000  // 2 weeks
        });
        res.status(200).json({
            "message": "successfully signin",
            "user": {
                id: user._id,
                name: user.name,
                email: user.email,
                userVideos: user.userVideos
            },
            "token": jwtToken
        });
        return;
    } catch (error) {
        res.status(500).json({"error": error});
        return;
    }
};