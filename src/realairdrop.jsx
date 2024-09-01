// Airdrop.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Realairdrop = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleAirdrop = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/airdrop', { recipient: walletAddress });
            setMessage(`Airdrop successful! `);
        } catch (error) {
            setMessage('Airdrop failed. Please check your wallet address and try again.');
        }
    };

    return (
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
            <h3 className="text-3xl font-bold text-violet-200 mb-4 text-center">Request Airdrop</h3>
            <input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={handleAirdrop}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Request Airdrop
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Realairdrop;
