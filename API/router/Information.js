import express from "express";
import { getInfo, updateInfo, UpgradeUser } from "../Controllers/Information.js";

const router = express.Router();

router.route("/infor").get(getInfo).post(updateInfo);
router.route('/upgrade_user').post(UpgradeUser);

export default router;
