import { getCounts } from "../../Controllers/admin/Dashboard.js";
import express from "express";

const router = express.Router();

router.route("/home/dashboard").get(getCounts);

export default router;
