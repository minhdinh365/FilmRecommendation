import express from "express";
import { postComment, getComments, createEvaluate, get2000Comments, getCommentsByUsername } from "../controllers/Comment.js";

const router = express.Router();

router.route("/comment").post(postComment).get(getComments);
router.route('/createEvaluate').get(createEvaluate)
router.route("/2000Comments").get(get2000Comments);
router.route("/evaluate/:username").get(getCommentsByUsername);


export default router;