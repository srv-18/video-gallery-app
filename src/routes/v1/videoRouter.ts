import { Router } from "express";
import { searchVideos } from "../../controllers/video/searchVideos";
import { getAllVideos } from "../../controllers/video/getAllVideos";
import { uploadVideo } from "../../controllers/video/uploadVideo";
import { updateVideo } from "../../controllers/video/updateVideo";
import { deleteVideo } from "../../controllers/video/deleteVideo";

export const videoRouter = Router();

videoRouter.post("/search", searchVideos);
videoRouter.get("/", getAllVideos);
videoRouter.post("/", uploadVideo);
videoRouter.put("/:id", updateVideo);
videoRouter.delete("/:id", deleteVideo);