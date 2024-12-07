
const express = require("express");
const DoctorDetails = require("../models/doctorDetails");
const router = express.Router();

// Add doctor details
router.post("/add-details", async (req, res) => {
  try {
    const { userId, specialty, education, experience } = req.body;

    // Check if doctor details already exist
    const existingDetails = await DoctorDetails.findOne({ userId });
    if (existingDetails) {
      return res.status(400).send({ message: "Details already exist." });
    }

    // Create new doctor details
    const newDetails = new DoctorDetails({ userId, specialty, education, experience });
    await newDetails.save();
    res.status(201).send({ message: "Doctor details added successfully." });
  } catch (error) {
    res.status(500).send({ message: "Failed to add doctor details." });
  }
});

// Update doctor details
router.put("/update-details/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { specialty, education, experience } = req.body;

    // Update doctor details
    const updatedDetails = await DoctorDetails.findOneAndUpdate(
      { userId },
      { specialty, education, experience },
      { new: true }
    );

    if (!updatedDetails) {
      return res.status(404).send({ message: "Doctor details not found." });
    }

    res.status(200).send({ message: "Doctor details updated successfully." });
  } catch (error) {
    res.status(500).send({ message: "Failed to update doctor details." });
  }
});

// Get doctor details by userId
router.get("/details/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const doctorDetails = await DoctorDetails.findOne({ userId });
  
      if (!doctorDetails) {
        return res.status(404).send({ message: "Doctor details not found." });
      }
  
      res.status(200).send(doctorDetails);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch doctor details." });
    }
  });

module.exports = router;
