import { Comment } from "../models/Comment.js";
import { Film } from "../models/Film.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      id_film: Number(req.query.id),
    }).populate("info");
    let total_comment = 0;
    if (comments.length > 0) {
      total_comment = comments.length;
    }
    res.status(200).json({
      comments: comments,
      total_comments: total_comment,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const postComment = async (req, res) => {
  const checkComment = await Comment.find({
    $and: [
      { id_info: req.jwtDecoded.username },
      { id_film: Number(req.body.comment.id_film) },
      { is_reply: 0 },
    ],
  });
  if (
    req.body.comment.is_reply !== 0 ||
    (checkComment.length === 0 && req.body.comment.is_reply === 0)
  ) {
    req.body.comment.id_info = req.jwtDecoded.username;
    const cmt = await new Comment(req.body.comment).populate("info");
    cmt.save().catch((result) => {
      res.status(200).json({ status: "thành công", result });
    });
  } else {
    res.status(200).json({ result: req.body.comment });
  }
};

export const putComment = async (req, res) => {
  req.body.commentPut.id_info = req.jwtDecoded.username;
  await Comment.findOneAndUpdate(
    {
      $and: [
        { id_info: req.jwtDecoded.username },
        { id_film: Number(req.body.commentPut.id_film) },
        { is_reply: 0 },
      ],
    },
    req.body.commentPut,
    { new: true }
  )
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

export const createEvaluate = async (req, res) => {
  const getFilms = await Film.find({}).limit(329).skip(1645);
  let cmttt = [
    "Bộ phim này dở tệ",
    "Phim này cũng được",
    "Không quá tệ",
    "Hay quá trời",
    "Xưa giờ chưa có phim nào hay đến vậy",
  ];
  getFilms.forEach((element) => {
    let radom = parseInt(Math.floor(Math.random() * 4 + 1));
    let cmt = new Comment({
      id_film: element.id,
      evaluate: radom,
      id_info: "minhdinh364",
      is_reply: 0,
      contents: cmttt[radom - 1],
    });
    cmt.save();
    console.log("ok");
  });
};
export const get2000Comments = async (req, res) => {
  try {
    const List = await Comment.find().limit(1974).populate({
      path: "film",
      select: "poster_path title release_date id run_time",
    });
    res.json({ List });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getCommentsByUsername = async (req, res) => {
  try {
    const List = await Comment.find({
      $and: [{ id_info:  req.query.username }, { is_reply: 0 }],
    }).populate(
      "film",
      "-cast -keywords -crew -overview -backdrop_path -popularity  -video -vote_count -revenue -video_id -tagline  -budget -category -adult -original_language -original_title"
    );
    if (List.length > 0) {
      res.json({ List });
    } else {
      res.json({ List: false });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
