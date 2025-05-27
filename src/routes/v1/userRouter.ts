import { Router } from "express";
import { updateUser } from "../../controllers/user/updateUser";
import { authMiddleware } from "../../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.put("/", authMiddleware, updateUser);