import express from "express";
import { CrawlCast } from "../Controllers/CrawlData.js";

const router = express.Router();

router.route("/crawl/cast").get(CrawlCast);

export default router;