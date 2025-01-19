import mongoose from "mongoose";
import Treatment from './treatments'
import Doctor from './doctor'

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientAge: {
        type: Number,
        required: true,
    },
    patientGender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    patientEmail: {
        type: String,
        required: true,
    },
    patientPhone: {
        type: String,
        required: true,
    },
    patientDOB: {
        type: String,
        required: false,
    },
    treatment: {
        name: { type: String, required: true },
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Treatment,
            required: true,
        }

    },
    doctor: {
        name: { type: String, required: true },
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Doctor,
            required: true,
        },
    },

    date: {
        type: String,
        required: true,
    },

    available: {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Doctor,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        }
    },

    additionalNotes: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Confirmed',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    cancelledAt: {
        type: Date,
        required: false,
    },
});


export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
