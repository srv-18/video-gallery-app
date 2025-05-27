import { Router } from "express";
import { updateUser } from "../../controllers/user/updateUser";

export const userRouter = Router();

userRouter.put("/", updateUser);