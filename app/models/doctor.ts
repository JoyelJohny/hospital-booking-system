import mongoose, { Types } from 'mongoose';
import Treatment from './treatments'

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    treatmentId: { type: Types.ObjectId, ref: Treatment, required: true },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
