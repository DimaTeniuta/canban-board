import express from "express";
import mongoose from "mongoose";
import { registerValidator } from "./validator/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controller/userController.js";

mongoose
  .connect(
    "mongodb+srv://pma:12345@cluster0.drvaldg.mongodb.net/chat?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidator, UserController.register);

app.post("/auth/login", UserController.login);

app.get("/auth/info", checkAuth, UserController.getUserInfo);

app.listen(2300, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
