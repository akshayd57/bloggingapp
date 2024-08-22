// pages/profile/[id].tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ProfileData {
    username: string;
    email: string;
    role: string;
    status: string;
}

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (id && typeof id === 'string') {
            axios.get(`http://localhost:3001/users/${id}`)
                .then(response => {
                    setProfile(response.data.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Error loading profile');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.role}</p>
                    <p>Status: {profile.status}</p>
                </div>
            ) : (
                <p>No profile found</p>
            )}
        </div>
    );
};

export default Profile;
