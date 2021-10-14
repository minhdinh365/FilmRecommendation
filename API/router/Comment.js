import express from "express";
import { postComment, getComments } from "../controllers/Comment.js";

const router = express.Router();

router.route("/comment").post(postComment).get(getComments);

export default router;