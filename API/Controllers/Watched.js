import { Watchedes } from "../models/Watched.js";

export const getWatched = async (req, res) => {
  try {
    const films = await Watchedes.find({ username: req.jwtDecoded.username }).populate(
      "infoFilm",
      "-cast -keywords -crew -overview -backdrop_path -popularity -release_date -video -vote_count -revenue -video_id -tagline -run_time -budget -category -adult -original_language -original_title"
    );
    if (films.length > 0) {
      res.json({
        films: films.reverse(),
      });
    } else {
      res.json({
        films: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const postWatched = async (req, res) => {
  try {
    const film = req.body;
    const finds = await Watchedes.find({ id: film.id });
    if (finds.length > 0) {
      res.json("Phim nay xem roi");
    } else {
      let phim = new Watchedes({
        id: film.id,
        username: req.jwtDecoded.username,
        watched: film.watched,
      });
      phim.save();
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


export const countTimeWatched = async (req, res) => {
  try {
    const finds = await Watchedes.find({ id: req.body.id });

    if ((finds.length > 0 && finds.time_span < req.body.time_span) || (finds.length > 0 && finds.time_span === undefined)) {

      Watchedes.updateOne({id: req.body.id}, {time_span: req.body.time_span }, { new: true }).then(
        (data) => {
          res.status(200);
        }
      );

    } else if(finds.length === 0) {
      let phim = new Watchedes({
        id: req.body.id,
        username: req.jwtDecoded.username,
        watched: req.body.watched,
        time_span: req.body.time_span,
      });

      phim.save();

      res.status(200);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};