import mongoose from "mongoose";

const SubSiteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    paragraphs: [{
        employee: { type: String, required: true },
        tasks: [{ type: String }],
        remainingWork: [{ type: String }]
    }],
    deadlines: [{
        date: { type: Date, required: true },
        report: { type: String }
    }]
});

const siteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subsites: [SubSiteSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Site = mongoose.model("Site", siteSchema);

export default Site;