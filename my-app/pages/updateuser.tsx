
import { useState } from 'react';
import axios from 'axios';

interface UpdateUserRequest {
    userId: number;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: string;
}

const UpdateUser = () => {
    const [userId, setUserId] = useState<number | ''>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/user/update/${userId}`, {
                userId,
                username,
                email,
                password,
                role,
                status
            } as UpdateUserRequest);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error updating user');
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <div>
                    <label>Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>

                <button type="submit">Update</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUser;
