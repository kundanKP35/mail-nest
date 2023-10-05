import React, { useEffect, useState } from 'react';
import { useGetProfileQuery } from '../slice/usersApiSlice';

const UserDetails = () => {
    const { data, error, isLoading } = useGetProfileQuery();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [appEmail, setAppEmail] = useState('');
    const [emailAppPassword, setEmailAppPassword] = useState('');

    console.log(data);

    useEffect(() => {
        if (data) {
            const { name, email, appEmail, emailAppPassword } = data;
            setName(name);
            setEmail(email);
            setAppEmail(appEmail);
            setEmailAppPassword(emailAppPassword);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching user details.</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>App Email: {appEmail}</p>
            <p>Email App Password: {emailAppPassword}</p>
        </div>
    );
};

export default UserDetails;
