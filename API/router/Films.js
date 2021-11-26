import express from "express";
import {
  getFilmById,
  postFilms,
  getFilms,
  getFilmHomePage,
  UpdateAPI,
  getAllFilm,
} from "../controllers/Films.js";


const router = express.Router();

router.route("/films").post(postFilms).get(getFilms);
router.route("/films/:typeget").get(getFilmHomePage);
router.route("/film/:id").get(getFilmById);

router.route("/update").get(UpdateAPI);
router.route("/getallfilm").get(getAllFilm);

export default router;

