import { useState } from "react";
import Button from "./Button";
import CustomInput from "./CustomInput";
// import axios from "axios";
import { guestInstance } from "../utils/axios";

function SignUp() {
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

    const handleSignUp = async () => {
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            // await axios.post('http://127.0.0.1:5000/users', {
            //     username: username,
            //     password: password
            // });

            await guestInstance.post('/users', {
                username: username,
                password: password
            })

            setSuccess('Signup successful!');
            // if success then go to login
            
            setUsername('');
            setPassword('');
            setError('');
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Signup failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <>
            <div className="mx-auto mt-24 max-w-md p-8 flex flex-col items-center gap-6 rounded-lg bg-slate-100 shadow-lg">
                <div>
                    <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="username" className="text-lg">Username</label>
                    <CustomInput hint={"username"} isPassword={false} value={username} onChange={handleUsernameChange} />

                    <label htmlFor="password" className="text-lg">Password</label>
                    <CustomInput hint={"password"} isPassword={true} value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="text-red-500 text-sm">{error}</div>
                <div className="text-green-500 text-sm">{success}</div>
                <div className="text-sm">
                    Already have an account?
                    <a className="text-blue-500 ml-1 hover:underline" href="/login">
                        Login
                    </a>
                </div>
                <div className="w-full">
                    <Button title={"Signup"} width="w-full" onClick={()=>{handleSignUp}} />
                </div>
            </div>
        </>
    );
}

export default SignUp;
