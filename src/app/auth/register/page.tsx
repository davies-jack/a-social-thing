'use client';

import React, { useState } from 'react'

type Props = {}

export default function RegisterPage({}: Props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, username, password, confirmPassword);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
            body: JSON.stringify({ email, username, password, confirmPassword }),
        });

        if (response.ok) {
            console.log('Registration successful');
        } else {
                console.error('Registration failed');
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button type="submit">Register</button>
            </form>
        </div>
    )
}