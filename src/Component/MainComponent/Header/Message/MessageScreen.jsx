import React, { useState } from "react";
import { useTheme } from "../../../../ThemeContext";
import "./Message.css";

const MessageScreen = () => {
  const { isSidebarVisible, getcolor } = useTheme();

  // List of friends with additional details (name, profile pic, last message, and time)
  const friends = [
    {
      name: "John Doe",
      lastMessage: "Hey! How's it going?",
      time: "10:30 AM",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Example male picture
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Jane Smith",
      lastMessage: "See you later.",
      time: "09:45 AM",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg", // Example female picture
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Michael Johnson",
      lastMessage: "Got the documents!",
      time: "Yesterday",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Emily Brown",
      lastMessage: "Let's catch up soon!",
      time: "Wednesday",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Chris Davis",
      lastMessage: "Thanks for the help.",
      time: "Monday",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Jessica Wilson",
      lastMessage: "I'll send it over.",
      time: "Sunday",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "David Martinez",
      lastMessage: "Great work!",
      time: "Saturday",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Sophia Lee",
      lastMessage: "How about next week?",
      time: "Friday",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Daniel Moore",
      lastMessage: "I'm on my way.",
      time: "Thursday",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
    {
      name: "Emma Taylor",
      lastMessage: "Talk to you later!",
      time: "Last week",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
      messages: [
        { text: "Got the documents!", sender: "friend" },
        { text: "Thanks for sending them over.", sender: "me" },
        { text: "I'll review them and get back to you.", sender: "friend" },
      ],
    },
  ];

  // State to store the selected friend's details
  const [selectedFriend, setSelectedFriend] = useState(null);

  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
    position: "relative",
    top: "50%",
    left: isSidebarVisible ? "50%" : "50%",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "1000px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };

  const friendListStyle = {
    overflowY: "auto",
    maxHeight: "70vh",
    borderRight: "1px solid white",
    color: "white",
    padding: "10px",
  };

  const friendStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid white",
    cursor: "pointer",
  };

  const profilePicStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
    marginLeft: "10px",
  };

  const messageInfoStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const messageTopStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const nameStyle = {
    fontWeight: "bold",
    color: "white",
  };

  const timeStyle = {
    color: "grey",
    fontSize: "12px",
  };

  const lastMessageStyle = {
    color: "lightgrey",
    fontSize: "13px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "200px",
    textAlign: "left",
  };

  const chatStyle = {
    color: "white",
    padding: "20px",
    maxHeight: "70vh",
    overflowY: "auto",
  };

  const messageBubbleStyle = {
    padding: "10px",
    backgroundColor: "#333",
    borderRadius: "10px",
    margin: "5px 0",
    textAlign: "left",
    color: "#ddd",
    width: "fit-content",
    maxWidth: "80%",
  };
  const senderStyle = {
    backgroundColor: "#2e7d32",
    color: "#fff",
    alignSelf: "flex-end",
  };

  const receiverStyle = {
    backgroundColor: "#333",
    color: "#ddd",
    alignSelf: "flex-start",
  };
  return (
    <div style={contentStyle}>
      <div style={{ height: "70vh", width: "100%", border: "1px solid white" }}>
        <div className="row">
          {/* Friend List */}
          <div
            className="col-3 custom-scrollbar-message"
            style={friendListStyle}
          >
            {friends.map((friend, index) => (
              <div
                key={index}
                style={friendStyle}
                onClick={() => setSelectedFriend(friend)}
              >
                <img
                  src={friend.profilePic}
                  alt="Profile"
                  style={profilePicStyle}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "bold", color: "white" }}>
                      {friend.name}
                    </span>
                    <span style={{ color: "grey", fontSize: "12px" }}>
                      {friend.time}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "13px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {friend.lastMessage}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="col-9">
            {selectedFriend ? (
              <div style={chatStyle}>
                <h3>{selectedFriend.name}</h3>
                <div className="messageContainer">
                  {selectedFriend.messages.length > 0 ? (
                    selectedFriend.messages.map((msg, index) => (
                      <div
                        key={index}
                        style={{
                          ...messageBubbleStyle,
                          ...(msg.sender === "me"
                            ? senderStyle
                            : receiverStyle),
                        }}
                      >
                        {msg.text}
                      </div>
                    ))
                  ) : (
                    <p>No messages to show.</p>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ color: "white", padding: "20px" }}>
                Select a friend to start chatting!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
