import express from "express";
import {
  postComment,
  putComment,
} from "../Controllers/Comment.js";
import AuthMiddleWare from "../Midlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleWare);
router.route("/comment").post(postComment).put(putComment);

export default router;
