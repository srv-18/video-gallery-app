import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../env/variables";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization!;
    if (!token) {
        res
        .status(401)
        .json({ message: "No authentication token, access denied" });
        return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET ) as JwtPayload;
    if(!decoded.id) {
        res.status(401).json({ "error": "Token verification failed" });
        return;
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ "internal error": error });
    return;
  }
};