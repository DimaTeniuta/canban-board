import { Schema, model } from "mongoose";

const ColumnSchema = new Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    tasks: {
      type: Array,
      default: [],
    },
    userId: { type: String, required: true },
    columnId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Column", ColumnSchema);
