import { Router } from "express";
import { videoRouter } from "./videoRouter";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/video", videoRouter);
router.use("/user", userRouter);
