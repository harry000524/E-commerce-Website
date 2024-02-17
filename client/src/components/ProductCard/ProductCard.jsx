import React from "react";
import axios from "axios";
import "./ProductCard.css";
import { toast } from "react-toastify";

function ProductCard({ product }) {
    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `https://d-and-j-diner.onrender.com/product/${product._id}`
            );
            console.log(res.data.msg);
            toast.success("Product Deleted", {
                position: "top-center",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => {
                    window.location.reload();
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="product-container">
            <div className="wrapper">
                <img
                    src={`https://d-and-j-diner.onrender.com/images/${product.img}`}
                    className="product-image"
                    alt="products"
                />
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <span className="product-price">
                        <span>₱</span>
                        {Number(product.price).toFixed(2)}
                    </span>
                    <button className="delete-btn" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
