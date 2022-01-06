import { Account } from "../../models/Account.js";
import { Comment } from "../../models/Comment.js";
import { Film } from "../../models/Film.js";

export const getCounts = async (req, res) => {
  try {
    const countFilm = await Film.find({}).count();
    const countAccount = await Account.find({}).count();
    const countComment = await Comment.find({}).count();
    const countVote = await Comment.find({ is_reply: 0 }).count();
    res.status(200).json({ countFilm, countAccount, countComment, countVote });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
