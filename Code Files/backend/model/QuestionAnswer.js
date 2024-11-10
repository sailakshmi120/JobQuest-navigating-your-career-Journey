import mongoose from "mongoose";

const answerSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  internId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "intern",
  },
  answers: [
    {
      questionId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
      submittedAnswer: {
        type: String,
        required: true,
      },
      marksAwarded: {
        type: Number,
        default: null,
      },
    },
  ],
  totalMarks: {
    type: Number,
    default: null,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

let model = mongoose.model("answer", answerSubmissionSchema);

module.exports = model;
