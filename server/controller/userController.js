import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
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
        expiresIn: "2h",
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
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong the email or the password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong the email or the password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      "secret123",
      {
        expiresIn: "2h",
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
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {}
};
