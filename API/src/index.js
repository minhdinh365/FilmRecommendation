import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Account from "../router/Account.js";
import Comment from "../router/Comment.js";
import Films from "../router/Films.js";
import FilmsManager from "../router/admin/FilmsManager.js";
import UsersManager from "../router/admin/UsersManager.js";
import bodyParser from "body-parser";
import Search from "../router/Search.js";
import handlebars from "express-handlebars";
import methodOverride from "method-override";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method"));

app.use("/", Account);
app.use("/", Comment);
app.use("/", Films);
app.use("/", Search);

const URI = process.env.DATABASE_URL;
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      times: function (n, block) {
        var accum = "";
        for (var i = 0; i < n; ++i) {
          block.data.index = i + 1;
          block.data.first = i === 0;
          block.data.last = i === n - 1;
          accum += block.fn(this);
        }
        return accum;
      },
    },
  })
);
const __dirname = path.resolve();
app.set("view engine", "hbs");
app.set("views", __dirname + "\\src\\resources\\views");

app.use("/", FilmsManager);
app.use("/", UsersManager);
// app.get("/admin", function (req, res) {
//   res.render("home/index");
// });
