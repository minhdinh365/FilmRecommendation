import {Film} from "../models/Film.js";

export const  getFilms = async (req, res) => {
  try {
    const List = await Film.find().limit(20).skip(((req.query.page)-1)*20);
    res.json({
      page: req.query.page,
      results : List
    })
} catch (err) {
    return req.status(500).json({msg: err.message});
}
};

export const postFilms = (req, res) => {
    req.body.films.forEach((item) =>{
        const films = new Film(item)
        films.save();
    })

};
