import express from "express";
import { getInfo, updateInfo } from "../controllers/Information.js";

const router = express.Router();

router.route("/infor").get(getInfo).post(updateInfo);

export default router;
