import React, { useState, useEffect } from 'react'

export default function User() {
    const token = import.meta.env.VITE_JWT_TOKEN;
    console.log(token)
    const API_URL = import.meta.env.VITE_API_URL;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Unauthorized or fetch failed');
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setUsers(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading users...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className='w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8'>
            <h1 className='text-blue-600 font-bold text-4xl'>My App</h1>

            <div>
                <h2 className='font-bold text-2xl'>Users from API:</h2>
                {users.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <strong>{user.name}</strong> - {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}