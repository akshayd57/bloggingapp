import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreatePost: React.FC = () => {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/users/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error creating post');
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'authenticated' && session.user.role !== 'admin') {
        return <p>You do not have permission to create posts.</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Title</h3>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <br />
                <h3>content</h3>
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />
                <br />
                <h3>Caategory</h3>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                />
                <br />
                <h3>FileUplaod</h3>
            <input
                type="file"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                />
                <br />
                <br />
                <button type="submit">Create Post</button>
                <br />
            {message && <p>{message}</p>}
            </form>
            </div>
    );
};

export default CreatePost;
