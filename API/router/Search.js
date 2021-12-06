import express from "express";
import { searchFilms } from "../Controllers/Search.js";

const router = express.Router();

router.route("/search").get(searchFilms);

export default router;
