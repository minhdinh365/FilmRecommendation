import { Film } from "../../models/Film.js";
import { Account } from "../../models/Account.js";
import escapeStringRegexp from "escape-string-regexp";

export const getFilms = async (req, res, next) => {
  try {
    global.countListFilm =
      (await Film.find().count()) === undefined ? 0 : await Film.find().count();
    global.countListAccount =
      (await Account.find().count()) === undefined
        ? 0
        : await Account.find().count();
    let count = countListFilm / 20;
    let temp = await Film.find()
      .populate("cmt")
      .limit(20)
      .skip((req.query.page - 1) * 20);
    let ListFilms = [];
    temp = temp.map((list) => {
      list._doc.cmt = list.cmt;
      ListFilms.push(list.toObject());
    });
    let linkPage = "/home/films?page=";
    res.render("home/index", {
      ListFilms,
      count,
      linkPage,
      countListFilm,
      countListAccount,
    });
  } catch (err) {
    next(err);
  }
};

export const addFilms = async (req, res, next) => {
  try {
    res.render("home/addFilm", { countListFilm, countListAccount });
  } catch (err) {
    next(err);
  }
};

export const PostFilms = async (req, res, next) => {
  try {
    const film = new Film(req.body);
    film.save();
    let announcement =
      "<div class='alert alert-success' role='alert'>successfully added new movie</div>";
    res.status(200).render("home/addFilm", {
      announcement,
      countListFilm,
      countListAccount,
    });
  } catch (err) {
    let announcement =
      "<div class='alert alert-danger' role='alert'>Can't add new movies. Please check again</div>";
    res.render("home/addFilm", {
      announcement,
      countListFilm,
      countListAccount,
    });
  }
};

export const getEditFilm = async (req, res, next) => {
  try {
    let film = await Film.findOne({ id: Number(req.params.id) });
    film = film.toObject();
    res.render("home/editFilm", { film, countListFilm, countListAccount });
  } catch (err) {
    next(err);
  }
};

export const putFilm = async (req, res, next) => {
  try {
    Film.updateOne({ id: Number(req.params.id) }, req.body).catch((error) => {
      console.log(error);
    });
    let film = await Film.findOne({ id: Number(req.params.id) });
    film = film.toObject();
    let announcement =
      "<div class='alert alert-success' role='alert'>A successfully updated movie</div>";
    res.status(200).render("home/editFilm", {
      film,
      announcement,
      countListFilm,
      countListAccount,
    });
  } catch (err) {
    let film = await Film.findOne({ id: Number(req.params.id) });
    film = film.toObject();
    let announcement =
      "<div class='alert alert-danger' role='alert'>Can't update movies. Please check again</div>";
    res.render("home/editFilm", {
      film,
      announcement,
      countListFilm,
      countListAccount,
    });
    next(err);
  }
};

export const deleteFilm = async (req, res, next) => {
  try {
    Film.deleteOne({ id: Number(req.params.id) }).catch((error) => {
      console.log(error);
    });
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};

export const searchFilms = async (req, res, next) => {
  try {
    let id = parseInt(req.query.content) || 0;
    const $regex = escapeStringRegexp(req.query.content);
    let countRz = await (
      await Film.find({
        $or: [{ id: id }, { title: { $regex: req.query.content } }],
      })
    ).length;
    let count = countRz / 20;
    let ListFilms = await Film.find({
      $or: [{ id: id }, { title: { $regex: req.query.content } }],
    })
      .populate("cmt")
      .limit(20)
      .skip((req.params.page - 1) * 20);
    ListFilms = ListFilms.map((list) => list.toObject());
    let linkPage = "/home/films/search/";
    let search = "?content=" + req.query.content;
    let parentPage = req.params.page;
    let Result =
      "<div class='alert alert-warning' role='alert'>" +
      countRz +
      " Results for '" +
      req.query.content +
      "'" +
      "</div>";

    res.render("home/index", {
      ListFilms,
      count,
      linkPage,
      search,
      parentPage,
      countListFilm,
      Result,
      countListAccount,
    });
  } catch (err) {
    next(err);
  }
};
