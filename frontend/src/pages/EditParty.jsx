import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditParty.css';

const EditParty = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [invitedUsers, setInvitedUsers] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartyDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(`http://localhost:6969/api/parties/getbyid/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const party = response.data;
                setName(party.name);
                setDate(new Date(party.date).toISOString().split('T')[0]);
                setLocation(party.location);
                setBudget(party.budget);
                setInvitedUsers(party.invitedUsers.join(', '));
            } catch (error) {
                console.error('Error fetching party details:', error);
            }
        };

        fetchPartyDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const invitedUsersArray = invitedUsers.split(',').map((id) => id.trim());

        try {
            await axios.put(`http://localhost:6969/api/parties/editParty/${id}`, {
                name,
                date,
                location,
                budget: parseFloat(budget),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            navigate('/'); // Redirect to the Dashboard after editing
        } catch (error) {
            console.error('Error updating party:', error);
        }
    };

    return (
        <div className="edit-party-container">
            <h1>Edit Party</h1>
            <form className="edit-party-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name} // Pre-fill
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditParty;