import express from "express";
import { getInfo } from "../controllers/Information.js";

const router = express.Router();

router.route("/infor").get(getInfo);

export default router;
