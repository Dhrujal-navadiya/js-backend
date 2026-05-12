import { Router } from "express";
import {
  videoCreate,
  getAllVideos,
  getVideoById,
  updateVideoDetails,
  deleteVideo,
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

router.route("/").get(getAllVideos);
router
  .route("/:videoId")
  .get(getVideoById)
  .patch(verifyJWT, upload.single("thumbnail"), updateVideoDetails)
  .delete(verifyJWT, deleteVideo);

export default router;
