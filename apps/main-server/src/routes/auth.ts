// Author auth routes:
import { Router } from "express";
import {
  loginController,
  signupController,
  logoutController,
} from "../controllers/auth";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);
// router.post("/forgot-password");
// router.patch("/reset-password");
router.get("/logout", logoutController);
// router.get("/is-logged-in");

export default router;
