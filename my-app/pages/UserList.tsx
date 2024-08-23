import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const Users = () => {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session) return;

            try {
                
                const token = session.user.token; 

                const response = await axios.get('http://localhost:3001/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsers(response.data.data);
            } catch (err) {
                setError('Error loading users');
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.role === 'admin') {
            fetchUsers();
        } else {
            setLoading(false);
            setError("You don't have permission to visit this page.");
        }
    }, [session]);

    if (status === 'loading' || loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>All Users</h3>
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
