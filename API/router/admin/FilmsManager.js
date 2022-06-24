import express from "express";
import {
  getFilms,
  addFilms,
  PostFilms,
  getEditFilm,
  putFilm,
  deleteFilm,
  searchFilms,
  restoreFilm
} from "../../Controllers/admin/Films.js";

const router = express.Router();

router.route("/home/films/search/:page").get(searchFilms);
router.route("/home/films").get(getFilms);
router.route("/home/addFilm").get(addFilms).post(PostFilms);
router.route("/home/:id/editFilm/").get(getEditFilm).put(putFilm);
router.route("/home/delete/:id").delete(deleteFilm);
router.route("/home/put/:id").put(restoreFilm);
export default router;
