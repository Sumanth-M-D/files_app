import express from "express";
import fileController from "../controllers/fileController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.protect);
router.post("/", fileController.createFile);

router
  .route("/:id")
  .patch(fileController.updateFile) // NOT yet implemented
  .delete(fileController.deleteFile); // Not yet implemented

export default router;
