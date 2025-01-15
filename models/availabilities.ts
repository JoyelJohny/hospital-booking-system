import mongoose from "mongoose";
import Doctor from "./doctor"

const availabilitySchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['Available', 'Booked'],
        default: 'Available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.models.Availability || mongoose.model('Availability', availabilitySchema);


