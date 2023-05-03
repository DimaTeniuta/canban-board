import App from "./app.js";
import authRouter from "./auth/auth.routes.js";
import dotenv from "dotenv";
import userRouter from "./user/user.routes.js";
import boardRouter from "./board/board.routes.js";
import columnRouter from "./column/column.routes.js";
import taskRouter from "./task/task.routes.js";

dotenv.config();

const app = new App([authRouter, userRouter, boardRouter, columnRouter, taskRouter]);
app.start();