import { getCounts } from "../../Controllers/admin/Dashboard.js";
import express from "express";

const router = express.Router();

router.route("/admin/dashboard").get(getCounts);

export default router;
