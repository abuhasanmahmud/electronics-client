import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/feature/cartSlice";
import { toast } from "react-toastify";
const ProductCard = ({ product }) => {
  const { name, price, description, numOfReviews, images } = product;
  const dispatch = useDispatch();

  //handel add to cart
  const handelAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Successfully add to cart");
  };
  return (
    <div>
      <div className="card bg-base-200 shadow-xl ">
        <figure>
          <Link to={`/product/${product._id}`}>
            <img src={images[0]?.url} alt="Shoes" />
          </Link>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name.substr(0, 19).toUpperCase()}</h2>
          <p>{description.toLowerCase().substr(0, 52)}</p>
          <p className="font-semibold">Price: tk {price}</p>
          <div>
            <span className="">{/* <Rating readonly initialRating={ratings} /> */}</span>
            <small>review({numOfReviews})</small>
          </div>
          <div></div>
          <div className="card-actions justify-end">
            <button onClick={handelAddToCart} className="btn btn-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
