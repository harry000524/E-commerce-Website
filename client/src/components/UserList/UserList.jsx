import React from "react";
import UserProductCard from "../UserProductCard/UserProductCard";
import './UserList.css'

function UserList({ products }) {
    return (
        <div className="user-container">
            <div className="user-wrapper">
                {products?.length > 0 && (
                    <h1 className="titlee">All products</h1>
                )}

                <div className="product-container-list-items-awan">
                    {products?.length === 0 ? (
                        <h1 className="noproductmsg">No products Yet!</h1>
                    ) : (
                        products?.map((product) => (
                            <UserProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserList;
