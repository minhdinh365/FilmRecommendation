import { Film } from "../models/Film.js";
import { text } from "express";
import axios from "axios";

export const getFilms = async (req, res) => {
  try {
    if (req.query.page === null) {
      const List = await Film.find().limit(20);
      res.json({
        page: 1,
        results: List,
      });
    } else {
      const List = await Film.find()
        .limit(20)
        .skip((req.query.page - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List,
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const postFilms = async (req, res, next) => {
  try {
    req.body.films.forEach(function (obj) {
      let films = new Film(obj);
      films.save();
    });
  } catch (err) {
    return req.status(500).json({ msg: err.message });
  }
};
export const getFilmHomePage = async (req, res) => {
  try {
    if (req.query.page === undefined) {
      const List = await Film.find(
        { category: req.params.typeget },
        {
          id: 1,
          original_title: 1,
          title: 1,
          poster_path: 1,
          overview: 1,
          release_date: 1,
          vote_average: 1,
          backdrop_path: 1,
        }
      ).limit(20);
      res.json({
        page: 1,
        results: List,
      });
    } else {
      const List = await Film.find(
        { category: req.params.typeget },
        {
          id: 1,
          original_title: 1,
          title: 1,
          poster_path: 1,
          overview: 1,
          release_date: 1,
          vote_average: 1,
          backdrop_path: 1,
        }
      )
        .limit(20)
        .skip((req.query.page - 1) * 20);
      res.json({
        page: parseInt(req.query.page),
        results: List,
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findOne({ id: Number(req.params.id) });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const UpdateAPI = async (req, res) => {
  try {
    const list = await Film.find({ crew: null });
    list.forEach((element) => {
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/movie/${element.id}/keywords?api_key=a2df3d1a7611194432bbdf1fc80540f2`
      //   )
      //   .then((data) => {
      //     const filter = { id: element.id };
      //     const update = { keywords: data.data.keywords };
      //     Film.findOneAndUpdate(filter, update, { new: true }).then((data) => {
      //       console.log("done");
      //       console.log(element.id);
      //     });
      //   });
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=a2df3d1a7611194432bbdf1fc80540f2&language=en-US`
        )
        .then((data) => {
          const filter = { id: element.id };
          // const update = { cast: data.data.cast };
          // Film.findOneAndUpdate(filter, update, { new: true }).then((data) => {
          //   console.log("done");
          //   console.log(element.id);
          // });
          console.log(data.data);
          data.data.crew.forEach((index) => {
            const update2 = { crew: data.data.crew };
            if (index.job == "Director") {
              Film.findOneAndUpdate(filter, update2, { new: true }).then(
                (data) => {
                  console.log("done");
                  console.log(element.id);
                }
              );
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  } catch (err) {}
};

export const getAllFilm = async (req, res) => {
  try {
    const result = await Film.find(
      {},
      {
        genre_ids: 1,
        id: 1,
        original_title: 1,
        crew: 1,
        cast: 1,
        keywords: 1,
        title: 1,
        poster_path: 1,
      }
    );
    res.status(200).json({ result: result });
  } catch (err) {
    res.json({ err: err.message });
  }
};
