import { Router } from "express";
import {
  createNewsletter,
  getNewsletters,
  getNewsletter,
  subscribeNewsletter,
  unsubscribeNewsletter,
  createArticle,
  getArticles,
  getArticle,
} from "../controllers/newsletter";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

router.post("/", isLoggedIn, createNewsletter);
router.get("/", getNewsletters);
router.get("/:newsletterId", getNewsletter);
router.post("/:newsletterId/subscribe", subscribeNewsletter);
router.post("/:newsletterId/unsubscribe", unsubscribeNewsletter);
router.post("/:newsletterId/article", isLoggedIn, createArticle);
router.get("/:newsletterId/articles", getArticles);
router.get("/:newsletterId/article/:articleId", getArticle);

export default router;
