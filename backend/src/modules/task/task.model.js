import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: String,
});

const sectionSchema = new mongoose.Schema(
  {
    mainSite: { type: String, required: true },
    subSite: { type: String, required: true },
    employees: [{ name: String }],
    tasks: [taskSchema],
    remainingWork: [taskSchema],
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section;