import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css"; 

import imageadd from '../../../assets/images/add.png';

const PatientDoctorChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [doctors, setDoctors] = useState([]); // Initialize as an empty array
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [showDoctorList, setShowDoctorList] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch list of doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors");
        console.log("API Response:", response.data); // Debugging line
        setDoctors(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]); // Fallback to an empty array if there's an error
      }
    };
    fetchDoctors();
  }, []);

  // Fetch conversations for the patient
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/doctorId/${userId}`);
        console.log("Conversations fetched:", response.data); // Debugging line
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };
    fetchConversations();
  }, [userId]);

  // Fetch messages for a selected conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/conversations/${conversationId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Start a new conversation with a doctor
  const startConversation = async (doctorId) => {
    try {
      const response = await axios.post("http://localhost:8080/conversations", { patientId: userId, doctorId });
      const newConversation = response.data;
      setConversations([...conversations, newConversation]);
      setSelectedConversation(newConversation); // Set the selected conversation
      fetchMessages(newConversation._id);
      setShowDoctorList(false);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!messageContent || !selectedConversation) return;

    try {
      const response = await axios.post("http://localhost:8080/messages", {
        conversationId: selectedConversation._id,
        senderId: userId,
        content: messageContent,
      });
      setMessages([...messages, response.data]);
      setMessageContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Get doctor's name from the list by their ID
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  return (
    <div className="pchat-container">
      <div className="listing">
      {/* Doctor List Section */}
      <div className="doctor-list">
        <div className="newmsglist">
        <h3>New conversation</h3>
        <button className="newbtn" onClick={() => setShowDoctorList(!showDoctorList)}>+</button>
        </div>
        {showDoctorList && (
          <ul>
            {Array.isArray(doctors) && doctors.map((doctor) => (
              <li key={doctor._id} onClick={() => startConversation(doctor._id)}>
                {doctor.firstName} {doctor.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Conversation List Section */}
      <div className="conversation-list">
        <h2>My Conversations</h2>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv._id}
              onClick={() => {
                setSelectedConversation(conv);
                fetchMessages(conv._id);
              }}
              className={selectedConversation && selectedConversation._id === conv._id ? "selected" : "unselected"}
            >
              Dr. {getDoctorName(conv.participants.find(participant => participant !== userId))}
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* Chat Window Section */}
      <div className="chat-window">
        <h2>Chat</h2>
        {selectedConversation ? (
          <>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === userId ? "sent" : "received"}`}>
                  <p>{msg.content}</p>
                  <span className="msgtime">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="msgbox"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type a message"
            />
            <button className="msgbtn" onClick={sendMessage}>Send</button>
          </>
        ) : (
          <p>Select a conversation or start a new one with a doctor to chat.</p>
        )}
      </div>

      <div className="imgbox">
        <div className="imgadd">
        <img src={imageadd} alt="Find your doctor" className="imgadd"/>

        </div>
      </div>

      
    </div>
  );
};

export default PatientDoctorChat;
