import { Comment } from "../models/Comment.js";
import { Film } from "../models/Film.js"

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ id_film: Number(req.query.id) })
      .populate("info", '-avatar');
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
  const cmt = new Comment(req.body.comment);
  cmt.save();
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