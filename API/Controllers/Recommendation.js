import { Recommendation } from "../models/Recommendation.js";
import axios from "axios";
import { Film } from "../models/Film.js";

export const getRecommendation = async (req, res) => {
  try {
    const film = await Recommendation.findOne({
      id_film: parseInt(req.params.id),
    });

    res.status(200).json(film.recommendation);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const postRecommendation = async (req, res) => {
  try {
    await axios.get("https://chom-phim-api.herokuapp.com/recommend/").then((data) => {
      let jsondata = data.data;
      jsondata.forEach((element) => {
        let red = new Recommendation(element);
        red.save();
      });

      res.status(200).json({status: "success"});
    });
    
  } catch (err) {
    return res.status(500).json(err);
  }
};
