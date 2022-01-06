import { Film } from "../../models/Film.js";
import escapeStringRegexp from "escape-string-regexp";

export const getFilms = async (req, res) => {
  try {
    let countListFilm = await Film.find().count();
    let ListFilms = await Film.find(
      {},
      {
        id: 1,
        title: 1,
        vote_average: 1,
        release_date: 1,
        budget: 1,
        poster_path: 1,
      }
    ).populate("cmt");
    res.status(200).json({ ListFilms, countListFilm });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const postFilms = async (req, res) => {
  try {
    const checkID = await Film.findOne({ id: req.body.id });
    if (checkID.length != 0) {
      res.status(205).json({ message: "Id phim đã tồn tại" });
    }
    const film = new Film(req.body);
    film.save();
    res.status(201).json({ message: "Thêm phim mới thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const putFilm = async (req, res) => {
  try {
    Film.updateOne({ id: Number(req.params.id) }, req.body).catch((error) => {
      res.status(205).json({ message: error.message });
    });
    let film = await Film.findOne({ id: Number(req.params.id) });
    res.status(200).json({ film });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    Film.deleteOne({ id: Number(req.params.id) }).catch((err) => {
      res.status(500).json({ message: err.message });
    });
    res.status(200).json({ message: "xóa phim thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchFilms = async (req, res) => {
  try {
    let searchContent = req.query.content;
    let id = parseInt(searchContent) || 0;
    const $regex = escapeStringRegexp(searchContent);
    let countFind = await (
      await Film.find({
        $or: [{ id: id }, { title: { $regex: searchContent } }],
      })
    ).length;
    let ListFilms = await Film.find({
      $or: [{ id: id }, { title: { $regex: searchContent } }],
    })
      .populate("cmt")
      .limit(20)
      .skip((req.params.page - 1) * 20);

    res.status(200).json({
      listFilm: ListFilms,
      countFind: countFind,
      content: searchContent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
