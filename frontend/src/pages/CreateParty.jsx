import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateParty.css';

const CreateParty = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [invitedUsers, setInvitedUsers] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Check if the date is in the past
        if (new Date(date) < new Date()) {
            alert('The date cannot be in the past.');
            return;
        }

        // Split invited users into an array of user IDs
        const invitedUsersArray = invitedUsers.split(',').map((id) => id.trim());

        try {
            const response = await axios.post('http://localhost:6969/api/parties', {
                name,
                date,
                location,
                budget: parseFloat(budget),
                invitedUsers: invitedUsersArray,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Party created:', response.data);
            navigate('/'); // Redirect to Dashboard after creating the party
        } catch (error) {
            console.error('Error creating party:', error);
        }
    };

    return (
        <div className="create-party-container">
            <h1>Create a New Party</h1>
            <form className="create-party-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Party</button>
            </form>
        </div>
    );
};

export default CreateParty;