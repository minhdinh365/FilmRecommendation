import { Information } from "../models/Information.js";

export const getInfo = async (req, res) => {
  try {
    const info = await Information.findOne({
      username: req.query.username,
    }).populate("user");
    res.json({
      status: "success",
      account: info,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
