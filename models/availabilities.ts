import mongoose from "mongoose";
import Doctor from "./doctor"
import Treatment from './treatments'

const availabilitySchema = new mongoose.Schema({
    treatmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Treatment,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Doctor,
        required: true,
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    slotDuration: {
        type: Number,
        required: true,
    },
    bufferTime: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.models.Availability || mongoose.model('Availability', availabilitySchema);


