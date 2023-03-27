import express from "express";
import mongoose from "mongoose";
import { loginValidator, registerValidator } from "./validator/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controller/userController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://pma:12345@cluster0.drvaldg.mongodb.net/chat?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);

app.get("/auth/info", checkAuth, UserController.getUserInfo);

app.listen(2300, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
