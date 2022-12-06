import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotalQuantity = cartItems?.reduce((a, b) => a + b.cartQuantity, 0);
  const cartTotalPrice = cartItems?.reduce((a, b) => a + b.price * b.cartQuantity, 0);
  // console.log("carttotelquantity", cartTotalQuantity, cartTotalPrice);

  //handel cart

  return (
    <div className="card-body">
      <span className="font-bold text-lg">Total item: {cartTotalQuantity}</span>
      <span className="text-info">Subtotal: {cartTotalPrice}</span>
      <div className="card-actions">
        <Link to="/viewcart">
          <button className="btn btn-primary btn-block">View cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
