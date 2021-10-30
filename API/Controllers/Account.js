import { Account } from "../models/Account.js";
import { Information } from "../models/Information.js";
import jwt from "jsonwebtoken";
import passwordHash from "password-hash";
import mailgun from 'mailgun-js'

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
    let newPass = req.body.newpassword;
    let oldPass = req.body.password;
    let username_request = req.body.username;
    const filter = { username: username_request }
    const update = { password: newPass }

    let change = await Account.findOne(filter)
    if (change) {
      if (passwordHash.verify(oldPass, change.password)) {
        Account.findOneAndUpdate(filter, update, { new: true })
          .then(data => {
            res.json({ status: true, mes: 'Thay đổi mật khẩu thành công' })
          })

      }
      else res.json({ status: false, mes: 'Mật khẩu hiện tại không chính xác' })
    }
  }
  catch {
    res.json({ status: false, mes: 'Thay đổi mật khẩu thất bại' })
  }
}
export const forgetPass = async (req, res) => {
  try {
    const mg = mailgun({ apiKey: 'abc', domain: 'http://localhost:5000/' })
    let email = req.query.email;
    Account.findOne({ email: email }, (err, user) => {
      if (err || !user) {
        return res.status(4000).json({ error: 'Email này không tồn tại' })
      }
      const token = jwt.sign({ _id: user.username }, 'resetpass', { expiresIn: '10m' });
      const data = {
        from: 'bangnguyen1235@gmail.com',
        to: email,
        subject: 'Account reset password link',
        html: `
          <h2>Please click on the link to reset password</h2>
          <p>http://localhost:3000/inforuser/forgetpass</p>
        `
      };
      return user.updateOne({ resetLink: token }, (err, success) => {
        if (err) {
          return res.status(4000).json({ mes: 'link reset password was wrong!' })
        }
        else {
          mg.messages().send(data, function (err, body) {
            if (err) {
              return res.json({ error: err.message })
            }
            return res.json({ message: "Email đã được gửi, làm theo hướng dẫn!" })
          })
        }
      })
    })
  }
  catch {

  }
}