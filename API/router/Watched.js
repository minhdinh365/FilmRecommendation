import express from "express";
import {
    getWatched, postWatched
} from "../controllers/Watched.js";

const router = express.Router();


router.route("/watched").get(getWatched).post(postWatched);


export default router;
