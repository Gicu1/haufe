import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [parties, setParties] = useState([]);

    const fetchParties = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:6969/api/parties', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Parties fetched:', response.data);
            setParties(response.data);
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchParties();
        }
    }, [user]);

    const handleCreateParty = () => {
        navigate('/createparty');
    };

    const handleEditParty = (partyId) => {
        navigate(`/editparty/${partyId}`);
    };

    return (
        <div>
            <h1>{user.username}'s Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <h2>Your Parties:</h2>
            <button onClick={handleCreateParty}>Create Party</button>
            <ul>
                {parties.length > 0 ? (
                    parties.map((party) => (
                        <li key={party._id}>
                            <h3>{party.name}</h3>
                            <p>Date: {new Date(party.date).toLocaleDateString('en-GB')}</p>
                            <p>Location: {party.location}</p>
                            {party.creator === user.id && (
                                <button onClick={() => handleEditParty(party._id)}>Edit</button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>You are not a part of any parties.</p>
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
