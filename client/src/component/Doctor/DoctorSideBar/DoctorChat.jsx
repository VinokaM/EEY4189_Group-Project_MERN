import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css"; 

const DoctorChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [patientNames, setPatientNames] = useState({}); // Cache for patient names

  const doctorId = localStorage.getItem("userId");

  // Fetch conversations for the doctor
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/doctorId/${doctorId}`);
        console.log("Conversations fetched:", response.data); // Debugging line
        setConversations(response.data);

        // Fetch patient names for the conversations
        const patientIds = response.data.map((conv) => conv.participants.find(participant => participant !== doctorId));
        fetchPatientNames(patientIds);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };
    fetchConversations();
  }, [doctorId]);

  // Fetch patient names based on their IDs
  const fetchPatientNames = async (patientIds) => {
    const uniqueIds = [...new Set(patientIds)]; // Remove duplicates
    const missingIds = uniqueIds.filter(id => !patientNames[id]); // Check for IDs not already cached

    if (missingIds.length > 0) {
      try {
        // Assume you have an endpoint to get multiple patients by their IDs
        const response = await axios.post("http://localhost:8080/api/patients", { ids: missingIds });
        const names = response.data.reduce((acc, patient) => {
          acc[patient._id] = `${patient.firstName} ${patient.lastName}`;
          return acc;
        }, {});
        
        setPatientNames((prev) => ({ ...prev, ...names }));
      } catch (error) {
        console.error("Failed to fetch patient names:", error);
      }
    }
  };

  // Fetch messages for a selected conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/conversations/${conversationId}/messages`);
      setMessages(response.data);
      setSelectedConversation(conversationId);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!messageContent || !selectedConversation) return;

    try {
      const response = await axios.post("http://localhost:8080/messages", {
        conversationId: selectedConversation,
        senderId: doctorId,
        content: messageContent,
      });
      setMessages([...messages, response.data]);
      setMessageContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Get the patient's name by ID from the local cache
  const getPatientName = (patientId) => {
    return patientNames[patientId] || "Unknown Patient";
  };

  return (
    <div className="chat-container">
      <div className="conversation-list">
        <h2>Conversations</h2>
        <ul>
          {conversations.map((conv) => {
            const patientId = conv.participants.find(participant => participant !== doctorId);
            return (
              <li
                key={conv._id}
                onClick={() => fetchMessages(conv._id)}
                className={selectedConversation === conv._id ? "selected" : "unselected"}
              >
                Patient: {getPatientName(patientId)} 
                <br />
                <p className="lastmsg"> {conv.lastMessage || "No messages yet"}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="chat-window">
        <h2>Chat</h2>
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === doctorId ? "sent" : "received"}`}>
              <p>{msg.content}</p>
              <span className="msgtime">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={messageContent}
          className="msgbox"
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message"
        />
        <button className="msgbtn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DoctorChat;
