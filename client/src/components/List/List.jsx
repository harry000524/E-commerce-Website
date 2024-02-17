import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./List.css";

function List({ products }) {
    return (
        <div className="container">
            <div className="wrapper">
                {products?.length > 0 && (
                    <h1 className="titleee">All products</h1>
                )}

                <div className="product-container-list">
                    {products?.length === 0 ? (
                        <h1 className="noproductmsg">No products Yet!</h1>
                    ) : (
                        products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default List;
