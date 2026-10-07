/*import { useEffect, useState } from "react";

import "../styles/admin.css";

function MessagesCRUD() {
    const [messages, setMessages] = useState([]);

    useEffect(() => { getMessages().then(setMessages); }, []);

    const handleDelete = async (id) => {
        await deleteMessage(id);
        setMessages(messages.filter(m => m.id !== id));
    };

    return (
        <div className="messages-crud">
            <h1>Manage Messages</h1>
            <ul>
                {messages.map(m => (
                    <li key={m.id}>
                        {m.name} ({m.email}): {m.message}
                        <button onClick={() => handleDelete(m.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MessagesCRUD;
/*

import React, { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../services/messagesService";
import "../styles/admin.css";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        getMessages()
            .then((data) => setMessages(data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        await deleteMessage(id);
        setMessages(messages.filter((msg) => msg.id !== id));
        setSelectedMessage(null);
    };

    return (
        <div className="messages-container">
            <h1>Contact Messages</h1>
            <div className="messages-grid">

                <div className="messages-list">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-item ${
                                selectedMessage?.id === msg.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedMessage(msg)}
                        >
                            <h3>{msg.name}</h3>
                            <p>{msg.message.slice(0, 40)}...</p>
                            <span>{msg.email}</span>
                        </div>
                    ))}
                </div>


                <div className="message-details">
                    {selectedMessage ? (
                        <>
                            <h2>{selectedMessage.name}</h2>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            <p><strong>Message:</strong> {selectedMessage.message}</p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(selectedMessage.id)}
                            >
                                Delete Message
                            </button>
                        </>
                    ) : (
                        <p>Select a message to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messages;*/
import React, { useEffect, useState } from "react";
import "../styles/admin.css";


function MessagesCRUD() {
    const API_URL = "http://localhost:8080/messages";

    // --- Service functions ---
    const getMessages = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch messages");
            return await res.json();
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    const getMessageById = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) throw new Error("Failed to fetch message");
            return await res.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const deleteMessage = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        } catch (err) {
            console.error(err);
        }
    };

    // --- State ---
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // --- Load messages on mount ---
    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        const data = await getMessages();
        setMessages(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            await deleteMessage(id);
            await loadMessages();
            setSelectedMessage(null);
        }
    };

    const handleSelect = async (id) => {
        const msg = await getMessageById(id);
        setSelectedMessage(msg);
    };

    // --- Render ---
    return (
        <div className="messages-crud">
            <h2>Contact Messages</h2>
            <div className="messages-container">
                {/* Left side: list */}
                <div className="messages-list">
                    <table>
                        <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messages.map((m) => (
                            <tr key={m.id} onClick={() => handleSelect(m.id)}>
                                <td>{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.subject || "No Subject"}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(m.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {messages.length === 0 && (
                            <tr>
                                <td colSpan="4">No messages found.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Right side: details */}
                <div className="message-details">
                    {selectedMessage ? (
                        <>
                            <h3>Message Details</h3>
                            <p><strong>Name:</strong> {selectedMessage.name}</p>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                            <p><strong>Message:</strong> {selectedMessage.message}</p>
                        </>
                    ) : (
                        <p className="placeholder">Select a message to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessagesCRUD;
