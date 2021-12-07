import express from "express";
import {
  getAccount,
  showAccount,
  loginInfor,
  createAccount,
  Changepass,
  forgetPass,
  changePasswordForget,
} from "../Controllers/Account.js";

const router = express.Router();

router.route("/changepass").post(Changepass);

router.route("/forgetpassword").post(forgetPass);

router.route("/account").post(getAccount).get(showAccount);

router.route("/isLogin/infor/:token").post(loginInfor);

router.route("/user").post(createAccount);

router.route("/changepassforget").post(changePasswordForget);

export default router;
