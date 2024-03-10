import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", ArticleSchema);
