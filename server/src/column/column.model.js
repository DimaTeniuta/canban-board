import { Schema, model } from "mongoose";

const ColumnSchema = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  userId: { type: String, required: true },
  boardId: { type: String, required: true },
});

export default model("Column", ColumnSchema);
