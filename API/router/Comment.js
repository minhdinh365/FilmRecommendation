import express from "express";
import { postComment, getComments, createEvaluate } from "../controllers/Comment.js";

const router = express.Router();

router.route("/comment").post(postComment).get(getComments);
router.route('/createEvaluate').get(createEvaluate)

export default router;