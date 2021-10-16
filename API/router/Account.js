import express from "express";
import {
  getAccount,
  showAccount,
  loginInfor,
  createAccount,
} from "../controllers/Account.js";

const router = express.Router();

router.route("/account").post(getAccount).get(showAccount);

router.route("/account/infor/:username").post(loginInfor);

router.route("/user").post(createAccount);

export default router;
