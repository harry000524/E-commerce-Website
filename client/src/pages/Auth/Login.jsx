import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "./Auth.css";
import jwt_decode from "jwt-decode";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://d-and-j-diner.onrender.com/auth/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error("Invalid email or password", {
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
            const token = data.token;
            const decoded = jwt_decode(token);
            if (!decoded.role) {
                toast.error("Token does not contain a valid role property", {
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
            const role = decoded.role;
            dispatch(login({ token, role }));
            navigate("/products");
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
                <h2 className="title">Login as User</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            autoComplete="none"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="submit-btn">Login</button>
                    <div className="other-links">
                    <Link to="/register">
                        Don't have an account? <p>Register now !</p>
                    </Link>
                    <Link to="/admin/login">
                        Login as Admin<p>Here!</p>
                    </Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
