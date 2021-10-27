import { Account } from "../models/Account.js";
import { Information } from "../models/Information.js";
import jwt from "jsonwebtoken";
import passwordHash from "password-hash";

export const getAccount = async (req, res) => {
  var username_request = req.body.username;
  var password_request = req.body.password;
  Account.findOne({
    username: username_request,
  })
    .then((data) => {
      if (passwordHash.verify(password_request, data.password)) {
        console.log(data);
        var token = jwt.sign(
          {
            id: data._id,
            username: data.username,
            email: data.email,
          },
          "Account",
          { expiresIn: "1h" }
        );
        return res.json({
          status: "Susscess",
          message: "Đăng nhập thành công",
          token: token,
        });
      } else {
        return res.json({
          status: "Fail",
          message: "Tên tài khoản hoặc mật khẩu không chính xác",
        });
      }
    })
    .catch((err) => {
      res.status(300).json("Lỗi Server");
    });
};

export const showAccount = async (req, res) => {
  try {
    const accountAll = await Account.find();
    res.json({
      status: "success",
      account: accountAll,
    });
  } catch (err) {
    return req.status(500).json({ msg: err.message });
  }
};
export const loginInfor = async (req, res, next) => {
  try {
    var token = req.params.token;
    var result = jwt.verify(token, "Account");
    if (result) {
      next();
      return res.json({ _id: result });
    }
  } catch {
    return res.status(500).json({ msg: err.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const info = new Information({
      full_name: req.body.full_name,
      username: req.body.username,
      avatar: req.body.avatar,
    });

    const user = new Account({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: 1,
    });

    info
      .save()
      .then(() => {
        user.save().then(() => {
          res.status(200).json({ status: "success" });
        });
      })
      .catch((err) => {
        res.json({ status: err.message });
        console.error(err);
      });
  } catch (err) {
    res.json({ status: err.message });
  }
};

export const Changepass = async (req, res) => {
  try {
    const user = await Account.findByIdAndUpdate({ username: username })
      .then((data) => {
        if (passwordHash.verify(rea.body.passwordold, data.password)) {
          user.findByIdAndUpdate
        }
      })
  }
  catch { }


}
