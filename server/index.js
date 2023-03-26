import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidator } from "./validator/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";

mongoose
  .connect(
    "mongodb+srv://pma:12345@cluster0.drvaldg.mongodb.net/chat?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate Email",
      });
    }
    res.status(500).json({
      message: "Failed to register",
    });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Wrong the email or the password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Wrong the email or the password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      success: true,
      user: {
        id: user._doc._id,
        email: user._doc.email,
        fullName: user._doc.fullName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register",
    });
  }
});

app.listen(2300, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
