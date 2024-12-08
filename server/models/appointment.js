const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "profileManagement", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "profileManagement", required: true },
  appointmentDate: { type: Date, required: true },
  symptoms: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;