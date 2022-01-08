import { Account } from "../models/Account.js";
import { Information } from "../models/Information.js";
import jwt from "jsonwebtoken";
import passwordHash from "password-hash";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";

export const getAccount = async (req, res) => {
  var username_request = req.body.username;
  var password_request = req.body.password;
  Account.findOne({
    username: username_request,
  })
    .then((data) => {
      if (passwordHash.verify(password_request, data.password)) {
        if (data.role == 1) {
          var token = jwt.sign(
            {
              id: data._id,
              username: data.username,
              role: 1,
              email: data.email,
            },
            "f330ed74$1$eb8d3bf6b3286fc92cc44de237465ea4f209c991",
            { expiresIn: "1h" }
          );

          return res.json({
            status: "Susscess",
            message: "Đăng nhập thành công",
            token: token,
          });
        } else {
          var token = jwt.sign(
            {
              id: data._id,
              username: data.username,
              role: 0,
              email: data.email,
            },
            "f330ed74$1$eb8d3bf6b3286fc92cc44de237465ea4f209c991",
            { expiresIn: "1h" }
          );
          return res.json({
            status: "Susscess",
            message: "Đăng nhập thành công",
            token: token,
          });
        }
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
    var token = req.query.token;
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
    let uploadResponse = "";
    if (req.body.avatar != "") {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const fileStr = req.body.avatar;
      uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setups",
      });
      uploadResponse = uploadResponse.url;
    }

    const info = new Information({
      full_name: req.body.full_name,
      username: req.body.username,
      avatar: uploadResponse,
    });

    const user = new Account({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: 1,
    });

    const findAccount = await Account.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (findAccount.length == 0) {
      info.save().catch((err) => {
        return res.status(200).json({ status: err.message });
      });
      user.save().catch((err) => {
        return res.status(200).json({ status: err.message });
      });
      return res.status(200).json({ status: "success" });
    }
    return res.status(200).json({ status: "already exit!" });
  } catch (err) {
    return res.status(200).json({ status: err.message });
  }
};

export const Changepass = async (req, res) => {
  try {
    let newPass = req.body.newpassword;
    let oldPass = req.body.password;
    let username_request = req.body.username;
    const filter = { username: username_request };
    const update = { password: newPass };

    let change = await Account.findOne(filter);
    if (change) {
      if (passwordHash.verify(oldPass, change.password)) {
        Account.findOneAndUpdate(filter, update, { new: true }).then((data) => {
          res.json({ status: true, mes: "Thay đổi mật khẩu thành công" });
        });
      } else
        res.json({ status: false, mes: "Mật khẩu hiện tại không chính xác" });
    }
  } catch {
    res.json({ status: false, mes: "Thay đổi mật khẩu thất bại" });
  }
};
export const forgetPass = async (req, res) => {
  try {
    let email = req.body.email;
    const user = await Account.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email không chính xác. Vui lòng thử lại!" });
    }
    const info = await Information.findOne({ username: user.username });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const code = randomstring.generate(6);

    var mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Recover your password from Chom Phim",
      html: `
      <div classname ="container" style="display: block; padding: 0px; justtify-content: center;">
        <img src ="https://res.cloudinary.com/chom-film/image/upload/v1638844192/LOGOF_opy3d0.png" style ="width:200px; height: auto;  display: block; margin-left: auto; margin-right: auto;"/>
        <h1 style=" font-weight: 600; margin: 0px; font-family: Gill Sans Extrabold, sans-serif; ">RESET YOUR PASSWORD</h1>
        <div style="display: flex"><h2>Xin chào&nbsp;  <h2 style="color: red ">${info.full_name}&nbsp;!</h2></h2></div>
          <h3 style="color: #434242; font-weight: 500; margin: 0px; font-family: Gill Sans Extrabold, sans-serif; ">Bạn nhận được email này bởi vì chúng tôi đã nhận được yêu cầu quên mật khẩu từ bạn. Mã xác thực để lấy lại mật khẩu là:</h3>
          <h2 style="padding: 10px; background-color: black; width: max-content; font-family: Gill Sans Extrabold, sans-serif; font-weight: 700; color: yellow; display: block; marign: auto; margin-left: auto; margin-right: auto;"> ${code}</h2>
          <h3 style="color: #434242; font-weight: 500; margin: 0px; font-family: Gill Sans Extrabold, sans-serif; ">Nếu bạn không muốn đổi lại mật khẩu, bạn có thể bỏ qua email này. Cảm ơn bạn đã lựa chọn sử dụng dịch vụ của chúng tôi </h3>
          <h2 style="color: red;"> Chom Phim - Nơi trải nghiệm những bộ phim hay nhất!</h2>
    </div>
            `,
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return await res.status(400).json({
          message: "Không thể gửi email ngay bây giờ. Vui lòng thử lại sau",
        });
      } else {
        return await res.status(200).json({
          message: "Email xác nhận đã được gửi cho bạn!",
          code: passwordHash.generate(code),
          email: user.email,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      message: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
    });
  }
};

export const changePasswordForget = async (req, res) => {
  try {
    const user = await Account.findOneAndUpdate(
      { email: req.body.email },
      { password: passwordHash.generate(req.body.password) }
    )
      .then((data) => {
        res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
