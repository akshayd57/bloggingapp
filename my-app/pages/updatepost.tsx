import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const UpdatePost: React.FC<{ postId: number }> = ({ postId }) => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
    
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/update/posts/${postId}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setCategory(post.category);
    
            } catch (error) {
                setMessage('Error fetching post details');
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            if (status === 'authenticated' && session.user.role === 'admin') {
                const response = await axios.put(`http://localhost:3000/posts/update/${postId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage(response.data.message);
            } else {
                setMessage("You don't have permission to update this post.");
            }
        } catch (error) {
            setMessage('Error updating post');
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {status === 'authenticated' && session.user.role === 'admin' ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => e.target.files && setImage(e.target.files[0])}
                    />
                    <button type="submit">Update Post</button>
                    {message && <p>{message}</p>}
                </form>
            ) : (
                <p>You don't have permission to update this post.</p>
            )}
        </div>
    );
};

export default UpdatePost;
