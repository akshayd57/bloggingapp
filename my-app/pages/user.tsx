
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error loading users');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>All Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.username} - {user.email}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Users;
