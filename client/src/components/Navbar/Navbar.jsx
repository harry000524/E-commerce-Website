import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toggleShowCart } from "../../redux/cartSlice";
import Cart from "../cart/Cart";

function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showCart, products} = useSelector((state) => state.cart)
  // const {user} = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleToggleCart = () => {
    dispatch(toggleShowCart())
  }

  if (!token) {
    return (
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="navbar-links">
            <div className="navbar-link">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="navbar-links">
          <div className="navbar-cart" onClick={handleToggleCart}>
            <span className="cart-number">{products?.length || 0}</span>
            <AiOutlineShoppingCart />
          </div>
          <div className="navbar-products">
            <Link to="/products">Products</Link>
          </div>
          <div className="logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
        {showCart && <Cart/>}
      </div>
    </div>
  );
}

export default Navbar;

