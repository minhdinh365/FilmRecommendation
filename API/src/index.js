import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Account from "../router/Account.js";
import Comment from "../router/Comment.js";
import Films from "../router/Films.js";
import Watched from "../router/Watched.js";
import Recommendation from "../router/Recommendation.js";
import Information from "../router/Information.js";
import FilmsManager from "../router/admin/FilmsManager.js";
import UsersManager from "../router/admin/UsersManager.js";
import LoginPage from "../router/admin/Login.js";
import bodyParser from "body-parser";
import Search from "../router/Search.js";
import handlebars from "express-handlebars";
import methodOverride from "method-override";
import path from "path";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method"));

app.use("/", Watched);
app.use("/", Account);
app.use("/", Comment);
app.use("/", Films);
app.use("/", Search);
app.use("/", Information);
app.use("/", Recommendation);

const URI = process.env.DATABASE_URL;
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");

    var server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: "https://chom-phim.netlify.app/",
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      socket.on("add-new-cmt", (comment) => {
        io.emit("get-new-cmt", comment);
      });

      socket.on("update-cmt", (comments) => {
        var comment = comments.cmt;
        var id_film = comments.id_film;
        io.emit("get-update-cmt", { comment, id_film });
      });

      socket.on("disconnect", () => {});
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main",
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

//handlebars
const __dirname = path.resolve();
app.set("view engine", "hbs");
app.set("views", __dirname + "/src/resources/views");

app.use("/", FilmsManager);
app.use("/", UsersManager);
app.use("/", LoginPage);
