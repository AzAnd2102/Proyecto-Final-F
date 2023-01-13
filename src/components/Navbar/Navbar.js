import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/usuario.png";
import search from "../../assets/images/buscar.png";
import cart from "../../assets/images/carrito-de-compras.png";
import CartModal from "../CartModal/CartModal";

const Navbar = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const handleShowCartModal = () => {
    if (showCartModal) {
      setShowCartModal(false);
    } else {
      setShowCartModal(true);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="restaurant-logo">
          <img className="image-logo" src={logo} alt="logo" />
          <span className="restaurant-name">Restaurant Rolling</span>
        </div>

        <div className="navbar-icons">
          <div className="user-logged">
            <span className="user-name">Matias</span>
            <img className="nav-icons-size" src={user} alt="user" />
          </div>

          <div className="nav-search">
            <img
              className="nav-icons-size lateral-borders"
              src={search}
              alt="search"
            />
          </div>

          <div className="nav-cart" onClick={handleShowCartModal}>
            <img className="nav-icons-size" src={cart} alt="cart" />
            {showCartModal ? <CartModal /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
