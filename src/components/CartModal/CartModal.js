import React from "react";
import "./cartModal.css";
import burger from "../../assets/images/hamburguesa.png";
import deleteIcon from "../../assets/images/borrar.png";

const Items = [
  { id: 1, name: "Big Yola", price: 1005 },
  { id: 2, name: "Hamburguesa Mati", price: 1005 },
  { id: 3, name: "Hamburguesa Fede", price: 1005 },
  { id: 4, name: "Big Yola", price: 1005 },
  { id: 5, name: "Big Yola", price: 1005 },
];

const CartModal = () => {
  return (
    <div className="cart-modal">
      <ul className="cart-modal-content">
        {Items.map((item) => (
          <li>
            <div className="food-content">
              <div className="burger">
                <img src={burger} alt="food" />
                <div>
                  <span>{item.name}</span>
                  <p>{item.price}</p>
                </div>
              </div>
              <button className="delete-btn">
                <img
                  className="image-delete-btn"
                  src={deleteIcon}
                  alt="delete"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartModal;
