import App from "./app.js";
import authRouter from "./auth/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = new App([authRouter]);
app.start();