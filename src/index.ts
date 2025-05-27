import express from "express";
import { router } from "./routes/v1";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// v1 routes
app.use("/api/v1", router);

app.get("/", (_, res) => {
    res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    await mongoose.connect(process.env.DB_URI || "");
    console.log("Connected to Database");
});