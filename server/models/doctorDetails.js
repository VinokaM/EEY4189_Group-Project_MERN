// models/doctorDetails.js
const mongoose = require("mongoose");

const doctorDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profileManagement", // Reference to the User model
    required: true,
    unique: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const DoctorDetails = mongoose.model("DoctorDetails", doctorDetailsSchema);

module.exports = DoctorDetails;
