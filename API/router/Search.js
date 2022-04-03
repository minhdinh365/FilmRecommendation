import express from "express";
import { searchFilms } from "../Controllers/Search.js";

const router = express.Router();

router.route("/search/:name").get(searchFilms);

export default router;
