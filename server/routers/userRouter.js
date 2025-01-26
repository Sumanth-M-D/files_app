import express from "express";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

// Routes for user related operations
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.use(authController.protect); // Protect all routes that come after this middleware
router.post("/logout", authController.logout);
router
  .route("/")
  .get(userController.getLoggedInUser)
  .patch(userController.updateUser);

export default router;
