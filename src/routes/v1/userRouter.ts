import { Router } from "express";
import { updateUser } from "../../controllers/user/updateUser";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { getUserVideos } from "../../controllers/user/getUserVideos";

export const userRouter = Router();

userRouter.put("/", authMiddleware, updateUser);
userRouter.get("/video", authMiddleware, getUserVideos);