import { Router } from "express";
import { signinUser } from "../../controllers/user/signinUser";
import { signupUser } from "../../controllers/user/signupUser";

export const authRouter = Router();

authRouter.post("/signin", signinUser);
authRouter.post("/signup", signupUser);