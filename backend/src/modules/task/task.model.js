import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});

const employeeSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
});

const sectionSchema = new mongoose.Schema(
  {
    mainSite: { type: String, required: true },
    subSite: { type: String, required: true },
    employees: [employeeSchema],
    tasks: [taskSchema],
    remainingWork: [taskSchema],
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;