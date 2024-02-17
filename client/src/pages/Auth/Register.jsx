import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (confirmPass !== password) {
                toast.error("Password do not match", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            const res = await fetch("https://d-and-j-diner.onrender.com/auth/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username, email, password }),
            });
            if (res.status === 404 || res.status === 500) {
                toast.error("Invalid inputs, Try again", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            const data = await res.json();
            dispatch(register(data));
            toast.success("Account Successfully Registered", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => {
                    window.location.href = "/login";
                },
            });
        } catch (error) {
            toast.error("Something went Wrong!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.error(error);
            return;
        }
    };

    return (
        <div className="login-container">
            <Link to="/" className="back-to-home">
                🡠 HOME
            </Link>
            <div className="wrapper">
                <h2 className="title">Register as User</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            autoComplete="off"
                            onChange={(e) =>
                                setUsername((prev) => e.target.value)
                            }
                        />
                    </label>
                    <label htmlFor="email">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            autoComplete="none"
                            onChange={(e) => setEmail((prev) => e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            onChange={(e) =>
                                setPassword((prev) => e.target.value)
                            }
                        />
                    </label>
                    <label htmlFor="confirmPass">
                        <input
                            type="password"
                            id="confirmPass"
                            placeholder="Confirm password"
                            onChange={(e) =>
                                setConfirmPass((prev) => e.target.value)
                            }
                        />
                    </label>
                    <button className="submit-btn">Register</button>
                    <div className="other-links">
                    <Link to="/login">
                        Already have an account? <p>Login now !</p>
                    </Link>
                    <Link to="/admin/register">
                        Register as Admin<p>Here!</p>
                    </Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Register;
