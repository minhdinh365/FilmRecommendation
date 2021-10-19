import {Film} from "../models/Film.js";
import escapeStringRegexp from "escape-string-regexp";

export const searchFilms = async (req, res, next) => {
        try {
          let id = parseInt(req.query.content) || 0;
          const $regex = escapeStringRegexp(req.query.content);
          let ListFilms = await Film.find({
            $or: [{ id: id }, { title: { $regex: req.query.content } }],
          })
            .limit(20)
          res.status(200).json({
            page: 1,
            results: ListFilms,
            total: ListFilms.length,
          })
        } catch (err) {
            return(res.status(500).json(err))
        }
   
  };