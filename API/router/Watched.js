import express from "express";
import { getWatched, postWatched, countTimeWatched } from "../Controllers/Watched.js";
import AuthMiddleWare from "../Midlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleWare);
router.route("/watched").get(getWatched).post(postWatched).put(countTimeWatched);

export default router;
