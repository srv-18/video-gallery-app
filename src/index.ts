import express from "express";
import { router } from "./routes/v1";
import mongoose from "mongoose";
import env from "./env/variables";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// v1 routes
app.use("/api/v1", router);

app.get("/", (_, res) => {
    res.json({ message: "Hello World" });
});

app.listen(env.PORT || 3000, async () => {
    console.log(`Server is running on port ${env.PORT || 3000}`);
    await mongoose.connect(env.DB_URL || "").catch((error) => {
        console.log("Error while connecting to database", error);
    });
    console.log("Connected to Database");
});