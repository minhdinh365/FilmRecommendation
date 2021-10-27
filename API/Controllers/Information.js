import { Information } from "../models/Information.js";
import { Comment } from "../models/Comment.js";

export const getInfo = async (req, res) => {
  try {
    const info = await Information.findOne({
      username: req.query.username,
    }).populate("user");
    const comment = await Comment.find({ id_info: req.query.username })
    let tong = 0
    let dem = 0
    let trungbinh = 0
    comment.forEach(element => {
      if (element.evaluate) {
        tong = tong + element.evaluate
        dem = dem + 1
      }
    })
    if (tong === 0) {
      trungbinh = 0
    } else {
      trungbinh = tong / dem
    }
    res.json({
      status: "success",
      account: info,
      total_comment: comment.length,
      evalute: Math.floor(trungbinh),
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
