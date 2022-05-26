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
import {
  getComments,
  createEvaluate,
  get2000Comments,
} from "../Controllers/Comment.js";
import AuthMiddleWare from "../Midlewares/AuthMiddleware.js";

const router = express.Router();

router.route("/user").post(createAccount);
router.route("/changepassforget").post(changePasswordForget);
router.route("/forgetpassword").post(forgetPass);
router.route("/account").post(getAccount);
router.route("/comment").get(getComments);
router.route("/createEvaluate").get(createEvaluate);
router.route("/2000Comments").get(get2000Comments); 
router.use(AuthMiddleWare);
router.route("/account").get(showAccount);
router.route("/isLogin/infor/:token").post(loginInfor);
router.route("/changepass").post(Changepass);


export default router;
