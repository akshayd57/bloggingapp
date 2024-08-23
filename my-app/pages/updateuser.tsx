import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';


interface UpdateUser {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
}

const UpdateUser = () => {
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<number | ''>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>please login</div>;
    }


    const isAdmin = session.user?.role  === 'admin';

    if (!isAdmin) {
        return <div>you dont have permission to vistit this page</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/user/update/${userId}`, {
                userId,
                username,
                email,
                password,
                role,
            } as UpdateUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error updating user');
        }
    };

    return (
        <div style={{ maxWidth: '600px', paddingLeft: '400px', paddingBottom: "50px", border: '5px solid #ddd', borderRadius: '50px', marginLeft: "200px", marginTop: "50px" }}>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <h3>Username</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <h3>Email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <h3>Password</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <h3>Role</h3>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" style={{ border: "1px solid", marginLeft: "50px" }}>Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUser;
