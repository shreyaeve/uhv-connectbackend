import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  volunteersNeeded: Number,
  status: { type: String, default: "Active" }
}, { timestamps: true });

export default model("Project", ProjectSchema);
