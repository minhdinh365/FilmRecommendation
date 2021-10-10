import { Account } from "../../models/Account.js";
import { Film } from "../../models/Film.js";
import { Information } from "../../models/Information.js";
import escapeStringRegexp from "escape-string-regexp";

export const getAccounts = async (req, res, next) => {
  try {
    global.countListFilm =
      (await Film.find().count()) === undefined ? 0 : await Film.find().count();
    global.countListAccount =
      (await Account.find().count()) === undefined
        ? 0
        : await Account.find().count();
    let count = countListAccount / 20;
    let ListAccounts = await Account.find()
      .populate("info")
      .populate("cmt")
      .limit(20)
      .skip((req.params.page - 1) * 20);

    ListAccounts = ListAccounts.map((list) => list.toObject());
    let linkPage = "/home/users/";
    res.render("users/index", {
      ListAccounts,
      count,
      linkPage,
      countListAccount,
      countListFilm,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await Account.deleteOne({ username: req.params.username }).catch(
      (error) => {
        console.log(error);
      }
    );
    res.redirect("back");
  } catch (err) {
    next(err);
  }
};

export const searchAccount = async (req, res, next) => {
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
      .skip((req.params.page - 1) * 20);
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
    console.log(ListAccounts);
    res.render("users/index", {
      ListAccounts,
      count,
      linkPage,
      search,
      parentPage,
      countListAccount,
      Result,
      countListFilm,
    });
  } catch (err) {
    next(err);
  }
};
