import { Account } from "../../models/Account.js";
import { Information } from "../../models/Information.js";
import passwordHash from "password-hash";

export const admin = async (req, res, next) => {
  res.render("login/index");
};

export const Login = async (req, res, next) => {
  const loginFail =
    "<div class='alert alert-danger' role='alert'>Login information is incorrect. Please check again</div>";

  try {
    const VerifyUsername = await Account.findOne({
      $or: [{ username: req.body.account }, { email: req.body.account }],
    });

    if (VerifyUsername !== null) {
      if (passwordHash.verify(req.body.password, VerifyUsername.password)) {
        global.info = await Information.findOne({
          username: VerifyUsername.username,
        });
        info = info.toObject();
        res.status(200).redirect("/dashboard");
      } else {
        res.render("login/index", { loginFail });
      }
    } else {
      res.render("login/index", { loginFail });
    }
  } catch (err) {
    res.render("login/index", { loginFail });
  }
};

export const logout = async (req, res, next) => {
  info = undefined;
  res.redirect("/admin/login");
};