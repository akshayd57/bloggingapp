
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    image_url: string;
}

const GetAllPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/posts/all');
                setPosts(response.data.data);
            } catch (error) {
                setMessage('Error retrieving posts');
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
            {message && <p>{message}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Category: {post.category}</p>
                        {post.image_url && <img src={post.image_url} alt={post.title} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetAllPosts;
