import { Recommendation } from "../models/Recommendation.js";
import axios from "axios";
import { Film } from "../models/Film.js";

export const getRecommendation = async (req, res) => {
    try {
        const rec = await Recommendation.findOne({ id_film: req.params.id })
        let valueFind = []
        rec.recommendation.map(item => {
            valueFind.push(item)
        })
        let film = await Film.find({ id: { $in: valueFind } }, {
            id: 1,
            original_title: 1,
            title: 1,
            poster_path: 1,
        })
        res.status(200).json(film)
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const postRecommendation = async (req, res) => {
    try {
        axios.get('http://localhost:4000/recommand/')
            .then(data => {
                let jsondata = data.data
                jsondata.forEach(element => {
                    let red = new Recommendation(element)
                    red.save()
                });
            })
    } catch (err) {
        return res.status(500).json(err);
    }
};