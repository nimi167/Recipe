import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
    const BaseURL = process.env.REACT_APP_BASE_URL;

    const socket = useMemo(() => io(`${BaseURL}`), []);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [usersData, setUserData] = useState([]);
    const [chefId, setChefId] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/Login');
        }
        setSelectedUser(localStorage.getItem('chefId'))
        const fetchData = async () => {
            try {
                const response = await fetch(`${BaseURL}/Get/All/Chef/Data`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.UserData);
                } else {
                    console.error('Failed to fetch recipe data.');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
        fetchData()
    }, [navigate])
    useEffect(() => {
        const handleChatMessage = (message) => {
            setChatHistory(prevHistory => [...prevHistory, message]);
        };
        socket.on('chatMessage', handleChatMessage);
        return () => {
            socket.off('chatMessage', handleChatMessage);
        };
    }, []);


    useEffect(() => {
        setChefId(localStorage.getItem('chefId'))
        setUserId(localStorage.getItem('userId'))
        const socket = io(`${BaseURL}`, {
            query: { chefId: localStorage.getItem('chefId'), userId: localStorage.getItem('userId') },
        });

        socket.on('chatHistory', (history) => {
            setChatHistory(history);
        });

        // Emit the 'fetchChatHistory' event when the chefId changes or the page loads
        socket.emit('fetchChatHistory', { chefId: localStorage.getItem('chefId'), userId: localStorage.getItem('userId') }, (history) => {
            setChatHistory(history);
        });

        return () => {
            socket.disconnect();
        };
    }, [chefId]);

    const handleUserClick = (user) => {
        localStorage.setItem('chefId', user._id);
        setChefId(user.chefId);
        setUserId(localStorage.getItem('userId'));
        setSelectedUser(user);
    };


    const handleSendMessage = () => {
        if (message.trim() === '') return;
        const newMessage = {
            sender: userId,
            receiver: chefId,
            text: message,
        };
        socket.emit('chatMessage', newMessage);
        setMessage('');
    };
    const handleKeyPress = (e) => {
        console.log(e)
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        const handleChatHistory = (history) => {
            setChatHistory(history);
        };
        socket.on('chatHistory', handleChatHistory);
        return () => {
            socket.off('chatHistory', handleChatHistory);
        };
    }, []);

    return (
        <div className="chat-container">
            <div className="user-list rounded-end-5">
                <h2>Users</h2>
                <ul>
                    {usersData.map((user, index) => (
                        <>
                            {user._id !== userId ?
                                <li key={index} onClick={() => handleUserClick(user)}>
                                    <span className='colorWhite p-3' >{user.name}</span>
                                </li>
                                : <></>
                            }
                        </>
                    ))}
                </ul>
            </div>
            <div className="chat-section">
                {selectedUser ? (
                    <div>
                        <h2 className='text-capitalize'>Chat with {selectedUser.name}</h2>
                        <div className="chat-history py-4">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender === chefId ? 'chef' : 'user'}`}>
                                    <span className=''>
                                        <strong className=''></strong> {msg.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="message-input ">
                            <input
                                type="text"
                                className='rounded'
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className='btn bgRed px-5 p-2 colorWhite' onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    );
};
export default Chat;