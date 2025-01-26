import express from "express";
import folderController from "../controllers/folderController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router.post("/", folderController.createFolder);

router
  .route("/:id")
  .get(folderController.getFolder)
  .patch(folderController.updateFolder)
  .delete(folderController.deleteFolder);

export default router;
