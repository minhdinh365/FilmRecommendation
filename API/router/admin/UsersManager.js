import express from "express";
import {
  getAccounts,
  deleteAccount,
  searchAccount,
  postAccount,
} from "../../Controllers/admin/Users.js";

const router = express.Router();

router.route("/admin/users/addAccount").post(postAccount);
router.route("/admin/users/:page").get(getAccounts);
router.route("/admin/users/search/:page").get(searchAccount);
router.route("/admin/users/delete/:username").delete(deleteAccount);

export default router;
