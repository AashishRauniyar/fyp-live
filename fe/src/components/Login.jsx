import { useState } from "react";
import CustomInput from "./CustomInput";
import { guestInstance } from "../utils/axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await guestInstance.post('/users', {
                username: username,
                password: password,
            });

            // Assuming your API responds with a success message or token
            if (response.data.success) {
                setSuccess('Login successful!');
                setError('');
                setUsername('');
                setPassword('');
            } else {
                setError('Invalid credentials. Please try again.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <>
            <div className="mx-auto mt-24 max-w-md p-8 flex flex-col items-center gap-6 rounded-lg bg-slate-100 shadow-lg">
                <div>
                    <h1 className="text-3xl font-semibold text-center">Login</h1>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="username" className="text-lg">Username</label>
                    <CustomInput hint={"username"} isPassword={false} value={username} onChange={handleUsernameChange} />

                    <label htmlFor="password" className="text-lg">Password</label>
                    <CustomInput hint={"password"} isPassword={true} value={password} onChange={handlePasswordChange} />
                </div>
                <div className="text-red-500 text-sm">{error}</div>
                <div className="text-green-500 text-sm">{success}</div>
                <div className="text-sm">
                    Don’t have an account?
                    <a className="text-blue-500 ml-1 hover:underline" href="/signup">
                        Signup
                    </a>
                </div>
                <div className="w-full">
                    <button 
                        className="w-full rounded-md bg-blue-500 p-4 text-white hover:bg-blue-600"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
