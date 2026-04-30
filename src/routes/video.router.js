import { Router } from "express";
import {
  videoCreate,
  getAllVideos,
  getSingleVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoCreate
);

router.route("/").get(verifyJWT, getAllVideos);
router.route("/:videoId").get(verifyJWT, getSingleVideo);

export default router;
