import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.displayName || "Chats";

    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [newChatName, setNewChatName] = useState("");

    const messagesEndRef = useRef(null);

    const activeChat = chats.find(chat => chat.id === activeChatId);

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        const updatedChats = chats.map(chat =>
            chat.id === activeChatId
                ? {
                      ...chat,
                      messages: [...chat.messages, { text: inputValue, type: "sent" }],
                  }
                : chat
        );
        setChats(updatedChats);
        setInputValue("");
    };

    const handleAddChat = () => {
        if (newChatName.trim() === "") return;

        const newChat = {
            id: Date.now(),
            name: newChatName,
            avatar: newChatName.charAt(0).toUpperCase(),
            messages: [],
        };
        setChats([...chats, newChat]);
        setNewChatName("");
    };

    const handleInputChange = (e) => setInputValue(e.target.value);
    const handleKeyPress = (e) => e.key === "Enter" && handleSendMessage();
    const handleChatSelect = (id) => setActiveChatId(id);
    const handleSignOut = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        navigate("/");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeChat?.messages]);

    return (
        <div className="chat-container">
            <div className="sidebar">
                <div className="profile">
                    <h2>Chats</h2>
                </div>
                <div className="add-chat">
                    <input
                        type="text"
                        placeholder="New chat name"
                        value={newChatName}
                        onChange={(e) => setNewChatName(e.target.value)}
                    />
                    <button onClick={handleAddChat}>+</button>
                </div>
                <div className="chat-list">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`chat-item ${chat.id === activeChatId ? "active" : ""}`}
                            onClick={() => handleChatSelect(chat.id)}
                        >
                            <div className="chat-avatar">{chat.avatar}</div>
                            <div className="chat-info">
                                <h4>{chat.name}</h4>
                                <p>{chat.messages[chat.messages.length - 1]?.text || "No messages yet"}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Sign Out button at bottom left */}
                <button
                    onClick={handleSignOut}
                    className="signout-btn"
                    title="Sign Out"
                >
                    <span className="signout-emoji">🚪</span> Sign Out
                </button>
            </div>

            <div className="chat-window">
                {activeChat ? (
                    <>
                        <div className="chat-header">
                            <h3>{activeChat.name}</h3>
                        </div>
                        <div className="chat-messages">
                            {activeChat.messages.map((message, index) => (
                                <div key={index} className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <p>Select or add a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
