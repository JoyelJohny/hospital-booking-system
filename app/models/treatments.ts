import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Treatment || mongoose.model('Treatment', treatmentSchema);