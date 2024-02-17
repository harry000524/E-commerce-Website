import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";

function Adminregister() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [adminSecretKey, setAdminSecretKey] = useState("");
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (confirmPass !== password) {
                toast.error("Password do not match", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            const response = await fetch(
                `https://d-and-j-diner.onrender.com/admin/validateSecretKey?secretKey=${adminSecretKey}`
            );

            if (response.status === 401) {
                toast.error("Invalid Secret Key", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const res = await fetch(
                "https://d-and-j-diner.onrender.com/auth/admin/register",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );
            if (res.status === 404 || res.status === 500) {
                toast.error("Invalid inputs, Try again", {
                    position: "top-center",
                    autoClose: 1000,
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
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => {
                    window.location.href = "/admin/login";
                },
            });
        } catch (error) {
            toast.error("Something went Wrong!", {
                position: "top-center",
                autoClose: 1000,
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
                <h2 className="title">Register as Admin</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            onChange={(e) =>
                                setUsername((prev) => e.target.value)
                            }
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="email">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            autoComplete="off"
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
                    <label htmlFor="adminSecretKey">
                        <input
                            type="password"
                            id="adminSecretKey"
                            placeholder="Enter secret key"
                            onChange={(e) => setAdminSecretKey(e.target.value)}
                        />
                    </label>
                    <button className="submit-btn">Register</button>
                    <div className="other-links">
                        <Link to="/admin/login">
                            Already have an account? <p>Login now !</p>
                        </Link>
                        <Link to="/register">
                            Register as User<p>Here!</p>
                        </Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Adminregister;
