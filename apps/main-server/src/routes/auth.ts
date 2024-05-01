// Author auth routes:
import { Router } from "express";
import {
  loginController,
  signupController,
  logoutController,
  isLoggedInController,
} from "../controllers/auth";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);
// router.post("/forgot-password");
// router.patch("/reset-password");
router.get("/logout", logoutController);
router.get("/is-logged-in", isLoggedIn, isLoggedInController);

export default router;
