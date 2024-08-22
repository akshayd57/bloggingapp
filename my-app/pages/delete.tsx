
import React, { useState } from 'react';
import axios from 'axios';

const DeletePost: React.FC<{ postId: number }> = ({ postId }) => {
    const [message, setMessage] = useState<string>('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/posts/${postId}`);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error deleting post');
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Post</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeletePost;
