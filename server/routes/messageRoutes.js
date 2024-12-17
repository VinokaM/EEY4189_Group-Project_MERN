const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { User } = require('../models/userData');


// Get a list of all doctors
router.get('/api/doctors', async (req, res) => {
    try {
      // Assuming that the role for doctors is stored as 'doctor'
      const doctors = await User.find({ role: 'doctor' }).select('firstName lastName');
      res.json(doctors);
    } catch (error) {
      res.status(500).send('Error retrieving doctors');
    }
  });

  router.post('/api/patients', async (req, res) => {
    const { ids } = req.body;
  
    // Ensure the 'ids' field is provided and is an array
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing IDs' });
    }
  
    try {
      // Fetch patients whose IDs are in the 'ids' array
      const patients = await User.find({ _id: { $in: ids } });
  
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Failed to fetch patient details' });
    }
  });

// Create a new conversation between a patient and a doctor
router.post('/conversations', async (req, res) => {
  const { patientId, doctorId } = req.body;

  try {
    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [patientId, doctorId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        participants: [patientId, doctorId],
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating conversation', error });
  }
});

// Send a message
router.post('/messages', async (req, res) => {
    const { conversationId, senderId, content } = req.body;
  
    try {
      const message = new Message({
        conversationId,
        sender: senderId,
        content,
      });
      await message.save();
  
      // Update the last message and last updated timestamp in the conversation
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: content,
        lastUpdated: Date.now(),
      });
  
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: 'Error sending message', error });
    }
  });

  // Get messages for a conversation
router.get('/conversations/:conversationId/messages', async (req, res) => {
    const { conversationId } = req.params;
  
    try {
      const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving messages', error });
    }
  });

router.get("/conversations/doctorId/:doctorId", async (req, res) => {
    const { doctorId } = req.params;

  if (!doctorId) {
    return res.status(400).json({ error: "Doctor ID is required" });
  }

  try {
    // Find all conversations involving the specified doctor
    const conversations = await Conversation.find({ participants: doctorId })
      .sort({ lastUpdated: -1 }); // Sort by the last update

    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
  });

module.exports = router;
