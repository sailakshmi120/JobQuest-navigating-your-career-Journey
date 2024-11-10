import mongoose from "mongoose";

const applyintern = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  intern: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "intern",
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileno: {
    type: String,
  },
  qualification: {
    type: String,
  },
  percentage: {
    type: String,
  },
  Address: {
    type: String,
  },
  resume: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

let model = mongoose.model("applyitern", applyintern);

module.exports = model;
