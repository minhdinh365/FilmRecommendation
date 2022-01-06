import { Account } from "../../models/Account.js";
import { Information } from "../../models/Information.js";
import escapeStringRegexp from "escape-string-regexp";
import passwordHash from "password-hash";

export const getAccounts = async (req, res) => {
  try {
    const countListAccount = await Account.find().count();

    let ListAccounts = await Account.find()
      .populate("info")
      .populate("cmt")
      .limit(20)
      .skip((Number(req.params.page) - 1) * 20);

    res.status(200).json({ ListAccounts, countListAccount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  await Account.deleteOne({ username: req.params.username }).catch((err) => {
    res.status(500).render({ message: err.message });
  });

  await Information.deleteOne({ username: req.params.username }).catch(
    (err) => {
      res.status(500).json({ message: err.message });
    }
  );
  res.status(200).json({ message: "Xóa tài khoản thành công" });
};

export const searchAccount = async (req, res, next) => {
  try {
    let findContent = req.query.content;
    const $regex = escapeStringRegexp(findContent);
    let countFind = await (
      await Account.find({
        $or: [
          { username: { $regex: findContent } },
          { email: { $regex: findContent } },
        ],
      })
    ).length;
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

    res.status(200).json({
      listAccounts: ListAccounts,
      countFind: countFind,
      content: findContent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const postAccount = (req, res) => {
  try {
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
    user
      .save()
      .then(() => {
        const info = new Information(infoTemp);
        info
          .save()
          .then(() => {
            res.status(200).json({ message: "Thêm tài khoản mới thành công" });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      })
      .catch((err) => {
        res.status(500).render({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
