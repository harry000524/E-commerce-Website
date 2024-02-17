import React, { useState } from "react";
import "./AddressPage.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { submitAddress } from "../../redux/addressSlice";
import {  useNavigate } from "react-router-dom";

function AddressPage() {
    const [addressData, setAddressData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleState = (e) => {
        setAddressData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(addressData).some((v) => v === "");
        const idFilled = Object.values(addressData).length < 4;

        if (idFilled || isEmpty) {
            toast.error("Complete all Fields", {
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

        dispatch(submitAddress(addressData));
        navigate("/checkout")
    };
    return (
        <div className="address-container">
            <div className="address-wrapper">
                <h2 className="address-titel">Information's</h2>
                <form onSubmit={handleSubmit}>
                    <p className="jpang">Jose Panganiban, Camarines Norte Only</p>
                    <input
                        onChange={handleState}
                        type="text"
                        name="barangay"
                        placeholder="Barangay..."
                    />
                    <input
                        onChange={handleState}
                        type="number"
                        name="purok"
                        placeholder="Purok..."
                    />
                    <input
                        onChange={handleState}
                        type="email"
                        name="email"
                        placeholder="Email..."
                    />
                    <input
                        onChange={handleState}
                        type="tel"
                        name="phone number"
                        placeholder="Phone Number..."
                    />
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddressPage;
