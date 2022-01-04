import express from "express";
import {
  getFilms,
  postFilms,
  putFilm,
  deleteFilm,
  searchFilms,
} from "../../Controllers/admin/Films.js";

const router = express.Router();

router.route("/admin/films/search/:page").get(searchFilms);
router.route("/admin/films").get(getFilms);
router.route("/admin/addFilm").post(postFilms);
router.route("/admin/:id/editFilm/").put(putFilm);
router.route("/admin/delete/:id").delete(deleteFilm);

export default router;
