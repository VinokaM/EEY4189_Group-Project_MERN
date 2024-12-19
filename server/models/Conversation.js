const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profileManagement', // Refers to User (patient or doctor)
      required: true,
    },
  ],
  lastMessage: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
