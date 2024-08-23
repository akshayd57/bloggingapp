import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const DeletePost: React.FC<{ postId: number }> = ({ postId }) => {
    const { data: session, status } = useSession();
    const [message, setMessage] = useState<string>('');

    const handleDelete = async () => {
        if (status === 'authenticated' && session.user.role === 'admin') {
            try {
                const response = await axios.delete(`http://localhost:3001/posts/${postId}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error deleting post');
            }
        } else {
            setMessage("You don't have permission to delete this post.");
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {status === 'authenticated' && session.user.role === 'admin' ? (
                <button onClick={handleDelete}>Delete Post</button>
            ) : (
                <p>You don't have permission to delete this post.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeletePost;
