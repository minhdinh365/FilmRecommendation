import { Login, logout } from "../../Controllers/admin/Login.js";
import express from "express";

const router = express.Router();

router.route("/admin/login").post(Login);
router.route("/admin/logout").get(logout);

export default router;
