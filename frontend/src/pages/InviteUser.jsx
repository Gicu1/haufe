import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InviteUsers = () => {
    const { partyId } = useParams(); // Get the party ID from the URL
    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsersWithInvitationStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`http://localhost:6969/api/parties/${partyId}/invite/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUsers(response.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                // setLoading(false);
            }
        };

        fetchUsersWithInvitationStatus();
    }, [partyId]);

    const handleInvite = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.post(`http://localhost:6969/api/parties/${partyId}/invite`,
                { userId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

            // Update invitation status for the invited user
            setUsers(users.map(user => user._id === userId ? { ...user, invited: true, status: 'pending' } : user).filter);
        } catch (error) {
            console.error('Error inviting user:', error);
        }
    };

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div>
            <h1>Invite Users to the Party</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <span>{user.username}</span>
                        {user.invited ? (
                            <span> - {user.status}</span>
                        ) : (
                            <button onClick={() => handleInvite(user._id)}>Invite</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InviteUsers;
