import { Film } from "../models/Film.js";
import translate from "translate";
import axios from "axios";
import { text } from "express";

export const getFilms = async (req, res) => {
  try {
    if ((req.query.page) === null) {
      const List = await Film.find().limit(20);
      res.json({
        page: 1,
        results: List
      })
    }
    else {
      const List = await Film.find().limit(20).skip(((req.query.page) - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List
      })
    }

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const postFilms = async (req, res, next) => {
  try {
    req.body.films.forEach(function (obj) {
      let films = new Film(obj)
      films.save()
    });
  }
  catch (err) {
    return req.status(500).json({ msg: err.message });
  }
};
export const getFilmsPopular = async (req, res) => {
  try {
    if (req.query.page === undefined) {
      const List = await Film.find({ category: 'popular' }).limit(20)
      res.json({
        page: 1,
        results: List
      })
    }
    else {
      const List = await Film.find({ category: 'popular' }).limit(20).skip(((req.query.page) - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List
      })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const getFilmsToprated = async (req, res) => {
  try {
    if (req.query.page === undefined) {
      const List = await Film.find({ category: 'top_rated' }).limit(20)
      res.json({
        page: 1,
        results: List
      })
    }
    else {
      const List = await Film.find({ category: 'top_rated' }).limit(20).skip(((req.query.page) - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List
      })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const getFilmsUpcoming = async (req, res) => {
  if (req.query.page === undefined) {
    const List = await Film.find({ category: 'upcoming' }).limit(20)
    res.json({
      page: 1,
      results: List
    })
  }
  else {
    const List = await Film.find({ category: 'upcoming' }).limit(20).skip(((req.query.page) - 1) * 20);
    res.json({
      page: parseInt(req.query.page),
      results: List
    })
  }
  try {
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const getFilmsNowPlaying = async (req, res) => {
  try {
    if (req.query.page === undefined) {
      const List = await Film.find({ category: 'now_playing' }).limit(20);
      res.json({
        page: 1,
        results: List
      })
    }
    else {
      const List = await Film.find({ category: 'now_playing' }).limit(20).skip(((req.query.page) - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List
      })
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findOne({ id: Number(req.params.id) })
    res.status(200).json(film)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
export const test = async (req, res) => {
  try {
    const list = await Film.find({})
    list.forEach(element => {
      axios.get(`https://api.themoviedb.org/3/movie/${element.id}?api_key=a2df3d1a7611194432bbdf1fc80540f2&language=en-US`)
        .then(data => {
          const filter = { id: element.id }
          const text = tr(data.data.overview)
          const update = { overview: text }
          Film.findOneAndUpdate(filter, update, { new: true }).then(data => {
            console.log(1)
          })

        })
    })
    await Promise.all([list, text]);

  } catch (e) {
    console.log(e);
  }
}
async function tr(text) {
  let bar = await translate(text, { to: "vi" });
  return bar
}