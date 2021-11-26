import express from "express";
import { getRecommendation, postRecommendation } from "../controllers/Recommendation.js";

const router = express.Router();

router.route("/recommendation/:id").get(getRecommendation)
router.route("/post_recommendation").get(postRecommendation)

export default router;
