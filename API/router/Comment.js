import express from "express";
import {
  postComment,
  getComments,
  createEvaluate,
  get2000Comments,
  getCommentsByUsername,
  putComment,
} from "../controllers/Comment.js";

const router = express.Router();

router.route("/comment").post(postComment).get(getComments).put(putComment);
router.route("/createEvaluate").get(createEvaluate);
router.route("/2000Comments").get(get2000Comments);
router.route("/evaluate").get(getCommentsByUsername);

export default router;
