import { Router } from "express";
import {
  createNewsletter,
  subscribeNewsletter,
  unsubscribeNewsletter,
  createArticle,
} from "../controllers/newsletter";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

router.post("/", isLoggedIn, createNewsletter);
router.post("/:newsletterId/subscribe", subscribeNewsletter);
router.post("/:newsletterId/unsubscribe", unsubscribeNewsletter);
router.post("/:newsletterId/article", isLoggedIn, createArticle);

export default router;
