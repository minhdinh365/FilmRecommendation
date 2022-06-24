import express from "express";
import {
  getAccounts,
  deleteAccount,
  searchAccount,
  addAccount,
  postAccount,
  restoreAccount
} from "../../Controllers/admin/Users.js";

const router = express.Router();

router.route("/home/users/addAccount").get(addAccount).post(postAccount);
router.route("/home/users/:page").get(getAccounts);
router.route("/home/users/search/:page").get(searchAccount);
router.route("/home/users/delete/:username").delete(deleteAccount);
router.route("/home/users/put/:username").put(restoreAccount);
export default router;
