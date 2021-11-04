import express from "express";
import {
  getAccount,
  showAccount,
  loginInfor,
  createAccount,
  Changepass,
  forgetPass,
} from "../controllers/Account.js";

const router = express.Router();


router.route("/changepass").post(Changepass);

router.route("/forgetpassword").post(forgetPass);

router.route("/account").post(getAccount).get(showAccount);

router.route("/isLogin/infor/:token").post(loginInfor);

router.route("/user").post(createAccount);


export default router;
