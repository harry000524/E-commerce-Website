import React, { useState, useEffect } from "react";
import List from "../List/List";
import "./Create.css";
import { BsUpload } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Create() {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const onChangeFile = (e) => {
        setImg(e.target.files[0]);
    };

    //CREATING PRODUCT
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            let filename = null;

            if (img) {
                filename = Date.now() + img.name;
                formData.append("filename", filename);
                formData.append("img", img);

                await fetch(`https://d-and-j-diner.onrender.com/upload/img`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "POST",
                    body: formData,
                });

                // Display pop-up message and refresh the page
                toast.success("Product Created", {
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
            } else {
                toast.error("Product Not Created", {
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
                return;
            }

            // upload product
            await fetch("https://d-and-j-diner.onrender.com/product", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({
                    title,
                    img: filename,
                    price,
                }),
            });
            return;
        } catch (error) {
            toast.error("Product Not Created", {
                position: "top-center",
                autoClose: 1000,
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
            console.error(error);
        }
    };

    //GETTING THE PRODUCT
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch("https://d-and-j-diner.onrender.com/product");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                setError((prev) => error.message);
                console.log(error);
            }
        };
        fetchProduct();
    }, []);

    const handleCloseImg = () => {
        setImg((prev) => null);
    };

    return (
        <div className="create-container">
            <div className="create-wrapper">
                <h2 className="title">
                    {" "}
                    <i>Create Product</i>{" "}
                </h2>
                <form
                    onSubmit={handleCreateProduct}
                    encType="multipart/form-data"
                >
                    <div className="input-wrapper">
                        <label>Name: </label>
                        <input
                            type="text"
                            name="title"
                            className="input"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="img" className="file-label">
                            {" "}
                            <BsUpload className="icon" /> Upload Image{" "}
                        </label>
                        <input
                            type="file"
                            name="img"
                            id="img"
                            className="input"
                            placeholder="Image"
                            onChange={onChangeFile}
                        />
                        {img && (
                            <p className="image-name">
                                {img.name}{" "}
                                <span
                                    onClick={() => handleCloseImg()}
                                    className="closeIcon"
                                >
                                    x
                                </span>
                            </p>
                        )}
                        <label>Price: </label>
                        <input
                            type="price"
                            name="price"
                            className="input"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="btn-wrapper">
                        <button className="btn">Create Product</button>
                    </div>
                </form>
            </div>
            <div className="show-products">
                {!error && <List products={products ? products : []} />}
                {error && <h1>No products or server is not responding</h1>}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Create;
