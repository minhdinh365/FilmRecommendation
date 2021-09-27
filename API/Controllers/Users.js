import User from "../Models/Users.js";
import Information from "../Models/Informations.js";

export const getUser = (req, res) => {
  User.find({}, (err, user) => {
    if (!err) {
      res.status(200).json(user);
    } else res.status(400).json({ error: "Error !!!" });
  });
};

export const postUser = (req, res) => {
  const userTemp = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  };

  const infoTemp = {
    username: req.body.username,
    avatar: req.body.avatar,
    full_name: req.body.full_name,
  };

  const info = new Information(infoTemp);
  info.save();
  const user = new User(userTemp);
  user.save();
  console.log("Da tao");
};
