import mongoose from "mongoose";


const cancellationRequestSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientPhone: {
        type: String,
        required: true,
    },
    patientDOB: {
        type: String,
        required: true,
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    }
});

export default mongoose.models.Cancelled || mongoose.model('BookingRequest', cancellationRequestSchema);



