import { Information } from "../models/Information.js";
import { Comment } from "../models/Comment.js";
import { Account } from "../models/Account.js";

export const getInfo = async (req, res) => {
  try {
    const info = await Information.findOne({
      username: req.jwtDecoded.username,
    }).populate("user", "-password");
    const comment = await Comment.find({ id_info: req.jwtDecoded.username });
    let tong = 0;
    let dem = 0;
    let trungbinh = 0;
    comment.forEach((element) => {
      if (element.evaluate) {
        tong = tong + element.evaluate;
        dem = dem + 1;
      }
    });
    if (tong === 0) {
      trungbinh = 0;
    } else {
      trungbinh = tong / dem;
    }
    res.json({
      status: "success",
      account: info,
      total_comment: comment.length,
      evalute: Math.floor(trungbinh),
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const updateInfo = async (req, res) => {
  try {
    const updateInfo = {
      avatar: req.body.avatar,
      full_name: req.body.full_name,
    };
    const updateAcc = {
      email: req.body.email,
    };
    const filter = { username: req.jwtDecoded.username };
    let update = await Information.find(filter);
    if (update.length != 0) {
      const search = await Account.find(updateAcc);
      if (search.length > 0) {
        return res.json({ success: false, mgs: "Email đã được sử dụng" });
      } else {
        Information.findOneAndUpdate(filter, updateInfo, { new: true }).then(
          (data) => {
            try {
              Account.findOneAndUpdate(filter, updateAcc, { new: true }).then(
                (data) => {
                  return res.json({
                    success: true,
                    mgs: "Cập nhật thông tin thành công",
                  });
                }
              );
            } catch {
              return res.json({
                success: true,
                mgs: "Cập nhật thông tin thất bại",
              });
            }
          }
        );
      }
    } else return res.json({ success: false, mgs: "Tài khoản không tồn tại" });
  } catch { }
};

export const UpgradeUser = async (req, res) => {
  try {
    const updatePackage = {
      is_upgrade: true,
      package_up: req.body.package_up,
      date_start: new Date(),
      date_end: dateWithMonthsDelay(req.body.package_up),
    };

    function dateWithMonthsDelay(package_upgrade) {
      const date = new Date()
      if (package_upgrade == 1)
        date.setDate(date.getDate() + 7)
      else if (package_upgrade == 2)
        date.setMonth(date.getMonth() + 1)
      else
        date.setFullYear(date.getFullYear() + 1)

      return date
    }
    const filter = { username: req.jwtDecoded.username, }
    await Information.findOne(filter).then(async (data) => {
      if (data) {
        await Information.findOneAndUpdate(filter, updatePackage, { new: true }).then(() => {
          return res.json({
            success: true,
            mgs: "Nâng cấp gói thành công",
          });
        })
      }
      else {
        res.json({
          success: false,
          mgs: "Thất bại",
        });
      }
    });
  }
  catch { err => console.log(err) };

  ;
} 
