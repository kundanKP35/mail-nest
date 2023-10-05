import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slice/loginSlice';
import { useUpdateProfileMutation } from "../slice/usersApiSlice";
import UserDetails from "../components/userDetails";

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [appEmail, setAppEmail] = useState('');
    const [emailAppPassword, setEmailAppPassword] = useState('');

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.login);

    const [updateProfileApi, {error}] = useUpdateProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.name, userInfo.email]);

    const submitHandler = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        } else {
            try {
                const response = await updateProfileApi({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                    appEmail,
                    emailAppPassword
                }).unwrap();
                dispatch(setCredentials({...response}));
                toast.success('Profile Updated Successfully');
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    };

    return (
        <div className="flex m-auto md:mt-6 font-poppins">
            <div className="w-1/2 font-poppins">
            <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="appEmail" className="block text-gray-700">App Email</label>
                    <input
                        type="email"
                        id="appEmail"
                        value={appEmail}
                        onChange={(e) => setAppEmail(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="emailAppPassword" className="block text-gray-700">App Email Password</label>
                    <input
                        type="password"
                        id="emailAppPassword"
                        value={emailAppPassword}
                        onChange={(e) => setEmailAppPassword(e.target.value)}
                        className="w-full border px-3 py-2 mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-4  bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-all"
                >
                    Update
                </button>
            </form>
            </div>
            <div>   
                <UserDetails />
            </div>
        </div>
    )
}

export default Profile;