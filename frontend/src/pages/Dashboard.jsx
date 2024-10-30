import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [parties, setParties] = useState([]);
    const [invitations, setInvitations] = useState([]);

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

    const fetchInvitations = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:6969/api/parties/invitations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setInvitations(response.data);
        } catch (error) {
            console.error('Error fetching invitations:', error);
        }
    };

    const acceptInvitation = async (invitationId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.put(`http://localhost:6969/api/parties/invitations/${invitationId}/accept`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Refresh invitations after accepting
            fetchInvitations();
            fetchParties();
        } catch (error) {
            console.error('Error accepting invitation:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchParties();
            fetchInvitations();
        }
    }, [user]);

    const handleCreateParty = () => {
        navigate('/createparty');
    };

    const handleEditParty = (partyId) => {
        navigate(`/editparty/${partyId}`);
    };

    const handleInvitations = (partyId) => {
        navigate(`/invite/${partyId}`);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>{user.username}'s Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <h2>Your Parties:</h2>
            <button className="create-party-button" onClick={handleCreateParty}>Create Party</button>
            <ul className="parties-list">
                {parties.length > 0 ? (
                    parties.map((party) => (
                        <li key={party._id}>
                            <h3>{party.name}</h3>
                            <p>Date: {new Date(party.date).toLocaleDateString('en-GB')}</p>
                            <p>Location: {party.location}</p>
                            {party.creator === user.id && (
                                <>
                                    <button onClick={() => handleEditParty(party._id)}>Edit</button>
                                    <button onClick={() => handleInvitations(party._id)}>Manage Invitations</button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>You are not a part of any parties.</p>
                )}
            </ul>

            <h2>Your Invitations:</h2>
            <ul className="invitations-list">
                {invitations.length > 0 ? (
                    invitations.map((invitation) => (
                        <li key={invitation._id}>
                            <h3>{invitation.party.name}</h3>
                            <p>Date: {new Date(invitation.party.date).toLocaleDateString('en-GB')}</p>
                            <p>Location: {invitation.party.location}</p>
                            <p>Status: {invitation.status}</p>
                            {invitation.status === 'pending' && (
                                <button onClick={() => acceptInvitation(invitation._id)}>Accept</button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>You have no invitations.</p>
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
