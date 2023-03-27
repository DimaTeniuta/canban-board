import express from "express";
import mongoose from "mongoose";
import { loginValidator, registerValidator } from "./validator/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/userController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server OK on PORT=${PORT}`);
});
