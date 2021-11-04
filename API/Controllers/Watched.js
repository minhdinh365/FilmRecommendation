import { Watchedes } from "../models/Watched.js";


export const getWatched = async (req, res) => {
  try {
    const films = await Watchedes.find({ username: req.query.id })
      .populate('infoFilm')
    if (films.length > 0) {
      res.json({
        films: films
      })
    }
    else {
      res.json({
        films: false
      })

    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const postWatched = async (req, res) => {
  try {
    const film = req.body
    const finds = await Watchedes.find({ id: film.id })
    if (finds.length > 0) {
      res.json('Phim nay xem roi')
    }
    else {
      let phim = new Watchedes({
        id: film.id,
        username: film.username,
        watched: film.watched
      })
      phim.save()
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

