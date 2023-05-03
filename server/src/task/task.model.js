import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  userId: { type: String, required: true },
  boardId: { type: String, required: true },
  columnId: { type: String, required: true },
});

export default model("Task", TaskSchema);
