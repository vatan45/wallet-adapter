import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('https://walletadapter-backend.vercel.app/api/campaign/list');
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, []);

    const stopCampaign = async (id) => {
        try {
            await axios.put(`https://walletadapter-backend.vercel.app/api/campaign/list/${id}`);
            // Update the UI by removing or updating the stopped campaign
            setCampaigns((prevCampaigns) =>
                prevCampaigns.map((campaign) =>
                    campaign._id === id ? { ...campaign, status: 'stopped' } : campaign
                )
            );
        } catch (error) {
            console.error('Error stopping campaign:', error);
        }
    };

    return (
        <div className="bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
            <h3 className="text-3xl font-bold text-violet-600 mb-4 text-center">Campaign List</h3>
            <div className="space-y-4">
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <div key={campaign._id} className="p-4 bg-white rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-violet-600">{campaign.name}</h4>
                            <p className="text-gray-700">{campaign.description}</p>
                            <p className="text-gray-500">Criteria: {campaign.criteria}</p>
                            <p className="text-gray-500">Reward: {campaign.reward} SOL</p>
                            <p className="text-gray-500">Creator: {campaign.creator}</p>
                            <p className={`text-gray-500 ${campaign.status === 'stopped' ? 'text-red-500' : ''}`}>
                                Status: {campaign.status || 'active'}
                            </p>
                            {campaign.status !== 'stopped' && (
                                <button
                                    onClick={() => stopCampaign(campaign._id)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Stop Campaign
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No campaigns found.</p>
                )}
            </div>
        </div >
    );
};

export default CampaignList;
