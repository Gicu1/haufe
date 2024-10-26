import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/InviteUsers.css';

const InviteUsers = () => {
    const { partyId } = useParams();
    const [users, setUsers] = useState([]);

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
            } catch (error) {
                console.error('Error fetching users:', error);

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

            setUsers(users.map(user => user._id === userId ? { ...user, invited: true, status: 'pending' } : user));
        } catch (error) {
            console.error('Error inviting user:', error);
        }
    };


    return (
        <div className="invite-users-container">
            <h1>Invite Users to the Party</h1>
            <ul className="invite-users-list">
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