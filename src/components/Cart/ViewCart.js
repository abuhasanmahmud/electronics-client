import React from "react";
import Footer from "../../sharied/Footer/Footer";
import Navbar from "../../sharied/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../../app/feature/cartSlice";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotalQuantity = cartItems?.reduce((a, b) => a + b.cartQuantity, 0);
  const cartTotalPrice = cartItems?.reduce((a, b) => a + b.price * b.cartQuantity, 0);

  const shipping = 20;
  const tax = cartTotalPrice * 0.1;
  const grandTotal = cartTotalPrice + shipping + tax;
  return (
    <>
      <Navbar></Navbar>
      {cartItems.length > 0 ? (
        <div className="my-5">
          <p className="my-5">View cart</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Price</th>
                      <th>quantity</th>
                      <th>total</th>
                      <th>remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <th>{item._id}</th>
                        <td>{item.price}</td>
                        <td>{item.cartQuantity}</td>
                        <td>{item.price * item.cartQuantity}</td>
                        <td>
                          <button onClick={() => dispatch(removeToCart(item))} className="text-red-400">
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center shadow-lg pb-5 w-full">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <tbody>
                    <tr>
                      <th>Total Item</th>
                      <td>{cartTotalQuantity}</td>
                    </tr>
                    <tr>
                      <th>Sub Total</th>
                      <td>{cartTotalPrice}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>{shipping}</td>
                    </tr>
                    <tr>
                      <th>Tax</th>
                      <td>{tax}</td>
                    </tr>
                    <tr>
                      <th>Grand Total</th>
                      <td>{grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center">
                  <Link to="/shipping">
                    <button className="btn btn-sm  my-3">Shipping now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-10 text-red-800 font-bold">
          <p>CART IS EMPTY</p>
        </div>
      )}
      <Footer></Footer>
    </>
  );
};

export default ViewCart;
