import Information from "../Models/Informations.js";

export const getInfo = (req, res) => {
  Information.find({ username: req.query.username }, (err, information) => {
    if (!err) {
      res.status(200).json(information);
    } else res.status(400).json({ error: "Error !!!" });
  });
};
