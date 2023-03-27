import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/', router);
app.use(errorMiddleware);


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('BD OK');
    app.listen(PORT, () => console.log(`Server OK on PORT=${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

// app.post(
//   "/auth/register",
//   registerValidator,
//   handleValidationErrors,
//   UserController.register
// );

// app.post(
//   "/auth/login",
//   loginValidator,
//   handleValidationErrors,
//   UserController.login
// );

// app.get("/auth/info", checkAuth, UserController.getUserInfo);

