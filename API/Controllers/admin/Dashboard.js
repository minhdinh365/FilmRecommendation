import { Account } from "../../models/Account.js";
import { Comment } from "../../models/Comment.js";
import { Film } from "../../models/Film.js";
import { Genre } from "../../models/Genre.js";
import { Information } from "../../models/Information.js";

export const getCounts = async (req, res) => {
  try {
    const countFilm = await Film.find({}).count();
    const countAccount = await Account.find({}).count();
    const countComment = await Comment.find({}).count();
    const countVote = await Comment.find({ is_reply: 0 }).count();
    res.status(200).json({ countFilm, countAccount, countComment, countVote });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getCharts = async (req, res, next) => {
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

        const totalUser = await Information.find({}).count();
        const today = new Date();
        const month = today.getMonth() + 1;

        const countOne = await Information.find({
          $expr: { $eq: [{ $month: "$date_start" }, month] },
          package_up: 1,
        }).count();

        const countTwo = await Information.find({
          $expr: { $eq: [{ $month: "$date_start" }, month] },
          package_up: 2,
        }).count();

        const countThree = await Information.find({
          $expr: { $eq: [{ $month: "$date_start" }, month] },
          package_up: 3,
        }).count();

        let countNone = totalUser - countOne - countTwo - countThree;

        // Genre statistics
        let temp = await Genre.find({},{name: 1});
        let genres = [];
        let valueGenres = [];

        await Promise.all(temp.map(async (genre) => {
          let value = await Film.find({"genre_ids.name": genre.name  }).count();
          valueGenres.push(value);
          genres.push(genre.name);
        }))

        // system statistics
        const countFilm = await Film.find({}).count();
        const countAccount = await Account.find({}).count();
        const countComment = await Comment.find({}).count();
        const countVote = await Comment.find({ is_reply: 0 }).count();

        res.render("dashboard/index", {
          countListAccount,
          countListFilm,
          info,
          genres,
          valueGenres,
          countOne,
          countTwo,
          countThree,
          countNone,
          countFilm,
          countAccount,
          countComment,
          countVote
        });
      } catch (err) {
        res.render("shared/error",{
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
