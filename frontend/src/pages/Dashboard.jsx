import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth.context'; // Update the import path as necessary

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext); // Assuming you have user data in context
    const [parties, setParties] = useState([]); // State to hold parties

    const fetchParties = async () => {
        const token = localStorage.getItem('token'); // Fetch the token from localStorage
        if (!token) return; // Return if no token is found

        try {
            const response = await axios.get('http://localhost:6969/api/parties', {
                headers: {
                    'Authorization': `Bearer ${token}` // Use the retrieved token
                }
            });
            console.log('Parties fetched:', response.data);
            setParties(response.data); // Assuming you have a state for parties
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    };


    useEffect(() => {
        if (user) { // Ensure user is available before fetching
            fetchParties();
        }
    }, [user]);

    return (
        <div>
            <h1>{user.username}'s Dashboard</h1> {/* Display user name */}
            <button onClick={logout}>Logout</button>
            <h2>Your Parties:</h2>
            <ul>
                {parties.length > 0 ? (
                    parties.map((party) => (
                        <li key={party._id}>
                            <h3>{party.name}</h3>
                            <p>Date: {party.date}</p>
                            <p>Location: {party.location}</p>
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
