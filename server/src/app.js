import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";


export default class App {
  constructor(routes) {
    this.app = express();
    this.port = process.env.PORT || 2300;
    this.initApp();
    this.initRoutes(routes);
  }

  initApp() {
    this.app.use(express.json());
    this.app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      })
    );
    this.app.use(cookieParser());
  }

  initRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }

  async start() {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("BD OK");
      this.app.listen(this.port, () =>
        console.log(`Server OK on PORT=${this.port}`)
      );
    } catch (err) {
      console.log('connect', err);
    }
  }
}
