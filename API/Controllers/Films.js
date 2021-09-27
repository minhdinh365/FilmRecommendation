import Films from "../Models/Films.js";

export const getFilms = (req, res) => {
  Films.find({ id: req.query.id }, (err, films) => {
    if (!err) {
      res.status(200).json(films[0]);
    } else res.status(400).json({ error: "Error !!!" });
  });
};
export const postFilms = (req, res) => {
  const films = new Films(req.body);
  films.save();
};
