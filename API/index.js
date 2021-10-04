import { API_USER, API_ROLE, DATABASE_NAME } from "./Public/const.js";
import User from "./Models/Users.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getUser, postUser } from "./Controllers/Users.js";
import { getInfo } from "./Controllers/Informations.js";
import { getFilms, postFilms } from "./Controllers/Films.js";
import { getComments, postComment } from "./Controllers/Comments.js";
const app = express();
const port = 3030;

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

try {
  mongoose.connect(
    "mongodb+srv://Users:" + API_USER + "/" + DATABASE_NAME + "?" + API_ROLE,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("OK");
} catch (error) {
  console.log("Connect failure: " + error.message);
}

app.get("/users", (req, res) => {
  getUser(req, res);
});

app.post("/users", (req, res) => {
  postUser(req, res);
});

app.get("/information", (req, res) => {
  getInfo(req, res);
});

app.get("/films", (req, res) => {
  getFilms(req, res);
});

app.post("/films", (req, res) => {
  postFilms(req, res);
});

app
  .get("/comments", (req, res) => {
    getComments(req, res);
  })
  .post("/comments", (req, res) => {
    postComment(req, res);
  });
app.listen(port);
