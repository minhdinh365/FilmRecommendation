import { Account } from "../../models/Account.js";
import { Film } from "../../models/Film.js";
import { Information } from "../../models/Information.js";
import escapeStringRegexp from "escape-string-regexp";
import passwordHash from "password-hash";

export const getAccounts = async (req, res, next) => {
  try {
    if (info !== undefined) {
      try {
        global.countListFilm =
          (await Film.find().count()) === undefined
            ? 0
            : await Film.find().count();
        global.countListAccount =
          (await Account.find().count()) === undefined
            ? 0
            : await Account.find().count();
        let count = countListAccount / 20;
        let ListAccounts = await Account.find()
          .populate("info")
          .populate("cmt")
          .limit(20)
          .skip((Number(req.params.page) - 1) * 20);

        ListAccounts = ListAccounts.map((list) => list.toObject());
        let linkPage = "/home/users/";
        res.status(200).render("users/index", {
          ListAccounts,
          count,
          linkPage,
          countListAccount,
          countListFilm,
          info,
        });
      } catch (err) {
        const message = err.message;
        res.status(500).render("shared/error", {
          message,
          countListAccount,
          countListFilm,
          info,
        });
      }
    } else {
      const loginFail =
        "<div class='alert alert-danger' role='alert'>Please login to continue</div>";
      res.render("login/index", { loginFail });
    }
  } catch (err) {
    res.redirect("/admin/login");
  }
};

export const deleteAccount = async (req, res, next) => {
  await Account.updateOne({ username: req.params.username }, {isBlocked: true}).catch((error) => {
    const message = err.message;
    res.status(500).render("shared/error", {
      message,
      countListAccount,
      countListFilm,
      info,
    });
  });

  res.redirect("back");
};

export const restoreAccount = async (req, res, next) => {
  await Account.updateOne({ username: req.params.username }, {isBlocked: false}).catch((error) => {
    const message = err.message;
    res.status(500).render("shared/error", {
      message,
      countListAccount,
      countListFilm,
      info,
    });
  });

  res.redirect("back");
};

export const searchAccount = async (req, res, next) => {
  try {
    if (info !== undefined) {
      try {
        let findContent = req.query.content;
        const $regex = escapeStringRegexp(findContent);
        let countRz = await (
          await Account.find({
            $or: [
              { username: { $regex: findContent } },
              { email: { $regex: findContent } },
            ],
          })
        ).length;
        let count = countRz / 20;
        let ListAccounts = await Account.find({
          $or: [
            { username: { $regex: findContent } },
            { email: { $regex: findContent } },
          ],
        })
          .populate("info")
          .populate("cmt")
          .limit(20)
          .skip((Number(req.params.page) - 1) * 20);
        ListAccounts = ListAccounts.map((list) => list.toObject());
        let linkPage = "/home/films/search/";
        let search = "?content=" + findContent;
        let parentPage = req.params.page;
        let Result =
          "<div class='alert alert-warning' role='alert'>" +
          countRz +
          " Results for '" +
          findContent +
          "'" +
          "</div>";
        res.status(200).render("users/index", {
          ListAccounts,
          count,
          linkPage,
          search,
          parentPage,
          countListAccount,
          Result,
          countListFilm,
          info,
        });
      } catch (err) {
        const message = err.message;
        res.status(500).render("shared/error", {
          message,
          countListAccount,
          countListFilm,
          info,
        });
      }
    } else {
      const loginFail =
        "<div class='alert alert-danger' role='alert'>Please login to continue</div>";
      res.render("login/index", { loginFail });
    }
  } catch (err) {
    res.redirect("/admin/login");
  }
};

export const addAccount = (req, res, next) => {
  try {
    if (info !== undefined) {
      res.render("users/addUser", { countListFilm, countListAccount, info });
    } else {
      const loginFail =
        "<div class='alert alert-danger' role='alert'>Please login to continue</div>";
      res.render("login/index", { loginFail });
    }
  } catch (err) {
    res.redirect("/admin/login");
  }
};

export const postAccount = (req, res, next) => {
  try {

    if (req.body.password == req.body.re_password) {
      const userTemp = {
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        email: req.body.email,
        role: req.body.role,
      };

      const infoTemp = {
        username: req.body.username,
        avatar: req.body.avatar,
        full_name: req.body.full_name,
      };

      const user = new Account(userTemp);
      user.save().then(() => {
        const info = new Information(infoTemp);
        info.save().then(() => {
          let announcement =
            "<div class='alert alert-success' role='alert'>successfully added new account</div>";
          res.status(200).render("users/addUser", {
            announcement,
            countListFilm,
            countListAccount,
            info,
          });
        }).catch((err) => {
          const message = err.message;
          res.status(500).render("shared/error", {
            message,
            countListAccount,
            countListFilm,
            info,
          });
        });
      }).catch((err) => {
        let announcement =
          "<div class='alert alert-danger' role='alert'>Username or email already exists</div>";
        res.status(200).render("users/addUser", {
          announcement,
          countListFilm,
          countListAccount,
          info,
        });
      });
    }
    else {
      let announcement =
        "<div class='alert alert-danger' role='alert'>Password and re-password do not match</div>";
      res.status(200).render("users/addUser", {
        announcement,
        countListFilm,
        countListAccount,
        info,
      });
    }

  } catch (err) {
    const message = err.message;
    res.status(500).render("shared/error", {
      message,
      countListAccount,
      countListFilm,
      info,
    });
  }
};