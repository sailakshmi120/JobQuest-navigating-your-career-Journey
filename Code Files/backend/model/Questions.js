import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    internId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "intern",
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

let model = mongoose.model("question", questionSchema);

module.exports = model;
