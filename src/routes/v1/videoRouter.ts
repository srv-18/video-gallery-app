import { Router } from "express";
import { searchVideos } from "../../controllers/video/searchVideos";
import { getAllVideos } from "../../controllers/video/getAllVideos";
import { uploadVideo } from "../../controllers/video/uploadVideo";
import { updateVideo } from "../../controllers/video/updateVideo";
import { deleteVideo } from "../../controllers/video/deleteVideo";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { upload } from "../../config/multer";
import { getUploadUrl } from "../../controllers/video/getUploadUrl";
import { uploadVideoDetails } from "../../controllers/video/uploadVideoDetails";

export const videoRouter = Router();

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

videoRouter.post("/search", searchVideos);
videoRouter.get("/", getAllVideos);
videoRouter.post("/upload", authMiddleware, uploadFields, uploadVideo);
videoRouter.put("/:id", authMiddleware, updateVideo);
videoRouter.delete("/:id", authMiddleware, deleteVideo);

videoRouter.post("/url", authMiddleware, getUploadUrl);  //get the presigned url for the file
videoRouter.post("/uploads", authMiddleware, uploadVideoDetails);  //to upload the video and image from frontend