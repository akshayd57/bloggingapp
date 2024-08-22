
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost: React.FC = () => {
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
            <button type="submit">Create Post</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default CreatePost;
