import { useState } from 'react';
import axios from 'axios';

function CreateCampaign() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [criteria, setCriteria] = useState('retweet');
    const [reward, setReward] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const creator = "Your wallet address"; // Get from wallet adapter

        try {
            const response = await axios.post('https://walletadapter-backend.vercel.app/api/campaign/create', {
                name,
                description,
                criteria,
                reward,
                creator,
            });
            console.log('Campaign created:', response.data);
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label>Campaign Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>
            <div>
                <label>Criteria</label>
                <select
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                    <option value="retweet">Retweet</option>
                    <option value="follow">Follow</option>
                </select>
            </div>
            <div>
                <label>Reward (SOL)</label>
                <input
                    type="number"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Create Campaign
            </button>
        </form>
    );
}

export default CreateCampaign;
