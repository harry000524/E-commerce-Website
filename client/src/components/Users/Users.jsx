import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("https://d-and-j-diner.onrender.com/users");
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://d-and-j-diner.onrender.com/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="get-users-container">
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
