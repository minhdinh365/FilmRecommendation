import { getCounts, getCharts } from "../../Controllers/admin/Dashboard.js";
import express from "express";

const router = express.Router();

router.route("/home/dashboard").get(getCounts);
router.route("/dashboard").get(getCharts);
export default router;
