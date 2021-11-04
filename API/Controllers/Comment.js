import { Comment } from "../models/Comment.js";
import { Film } from "../models/Film.js"

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ id_film: Number(req.query.id) })
      .populate("info");
    let total_comment = 0
    if (comments.length > 0) {
      total_comment = comments.length
    }
    res.status(200).json({
      comments: comments,
      total_comments: total_comment
    });

  } catch (err) {
    res.status(400).json({ err });
  }
};
export const postComment = async (req, res) => {
  const cmt = await new Comment(req.body.comment).populate("info");
  cmt.save().catch((result) => {
    res.json({ result });
  });
};
export const createEvaluate = async (req, res) => {
  const getFilms = await Film.find({}).limit(10)
  let cmttt = ['Bộ phim này dở tệ', 'Phim này cũng được', 'Không quá tệ', 'Hay quá trời', 'Xưa giờ chưa có phim nào hay đến vậy']
  getFilms.forEach(element => {
    let radom = parseInt(Math.floor(Math.random() * 4 + 1))
    let cmt = new Comment({
      id_film: element.id,
      evaluate: radom,
      id_info: 'minhdinh111',
      is_reply: 0,
      contents: cmttt[radom - 1]
    })
    cmt.save();
    console.log("ok");
  })
}
export const get2000Comments = async (req, res) => {
  try {
    const List = await Comment.find().limit(2000).populate("film");
    res.json({ List });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getCommentsByUsername = async (req, res) => {
  try {
    const List = await Comment.find({
      $and: [{ id_info: req.query.username }, { is_reply: 0 }],
    }).populate("film");
    if (List.length > 0) {
      res.json({ List });
    }
    else {
      res.json({ List: false });
    }

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};