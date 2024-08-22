
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    image_url: string;
}

const GetPostById: React.FC<{ postId: number }> = ({ postId }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/posts/${postId}`);
                setPost(response.data.data);
            } catch (error) {
                setMessage('Error retrieving post');
            }
        };
        fetchPost();
    }, [postId]);

    return (
        <div>
            <h1>Post Details</h1>
            {message && <p>{message}</p>}
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Category: {post.category}</p>
                    {post.image_url && <img src={post.image_url} alt={post.title} />}
                </div>
            ) : (
                <p>No post found</p>
            )}
        </div>
    );
};

export default GetPostById;
