import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Logo from "../../assets/logo.jpg";
import Create from "../../components/create/Create";
import Users from "../../components/Users/Users";
import Orders from "../../components/Orders/Orders";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Admin() {
    const [create, setCreate] = useState(true);
    const [users, setUsers] = useState(false);
    const [orders, setOrders] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);

    const handleCreateModal = () => {
        setCreate(true);
        setUsers(false);
        setOrders(false);
    };

    const handleShowUsers = () => {
        setUsers(true);
        setCreate(false);
        setOrders(false);
    };

    const handleShowOrders = () => {
        setOrders(true);
        setUsers(false);
        setCreate(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    if (role !== "admin") {
        return (
            <div
                className="not-authorized"
                style={{ height: "100vh", width: "100vw" }}
            >
                <h1>Not Authorized, Please Login as Admin</h1>
            </div>
        );
    }
    return (
        <div className="admin-container">
            <div className="left-navbar">
                <div className="left-navbar-wrapper">
                    <div className="left-navbar-logo">
                        <img src={Logo} alt="logo" />
                        <hr />
                    </div>

                    <div className="navigation">
                        <div
                            className="products"
                            onClick={handleCreateModal}
                            tabIndex="0"
                        >
                            <p>Products</p>
                        </div>
                        <div
                            className="orders"
                            onClick={handleShowOrders}
                            tabIndex="0"
                        >
                            <p>Orders</p>
                        </div>
                        <div
                            className="users"
                            onClick={handleShowUsers}
                            tabIndex="0"
                        >
                            <p>Users</p>
                        </div>
                    </div>
                    <div className="admin-logout">
                        <button className="btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="admin-content">
                {create && <Create />}
                {users && <Users />}
                {orders && <Orders />}
            </div>
        </div>
    );
}

export default Admin;
