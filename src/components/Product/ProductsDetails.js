import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../sharied/Footer/Footer";
import Navbar from "../../sharied/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "./../../app/feature/productDetailsSlice";
import Loading from "../../sharied/Loading/Loading";
import SingleReview from "../Review/SingleReview";
import { addToCart } from "../../app/feature/cartSlice";
import { toast } from "react-toastify";
const ProductsDetails = () => {
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  const { product, isLoading } = useSelector((state) => state.productDetails.productDetails);

  //handel add to cart
  const handelAddToCart = () => {
    // const cartItem = { ...product, quantity };
    dispatch(addToCart({ product, quantity }));
    toast.success("Successfully add to cart");
  };

  //handel quantity--increace
  const increaceQuantity = () => {
    const qty = quantity + 1;
    if (qty > product?.stock) {
      return toast.error("please order lessthen our stock");
    }
    setQuantity(qty);
  };

  //handel quantity--desincrece
  const desIncreaceQuantity = () => {
    const qty = quantity - 1;
    if (qty <= 0) {
      return toast.error("quantity not posibale less then 1");
    }
    setQuantity(qty);
  };

  return (
    <div>
      <Navbar></Navbar>
      <p className="flex my-5 justify-center font-semibold">Product details of {product?.name} </p>
      {isLoading ? <Loading></Loading> : ""}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 mx-3 i">
        <div>
          <img src={product?.images[0]?.url} alt="" />
          <p className="my-4">{product?.description}</p>
        </div>
        <div className="shadow-sm p-3 space-y-1 lg:mx-5">
          <p>{product?.name}</p>
          <p className="font-semibold">Category: {product?.category}</p>
          <p>Seller: {product?.seller}</p>
          <p>Stock: {product?.stock}</p>
          <p className="font-semibold">Price: {product?.price}</p>
          <div>
            <button onClick={desIncreaceQuantity} className="btn btn-sm">
              -
            </button>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              className="mx-1 text-center w-10"
              type="number"
              readOnly
              value={quantity}
            />
            <button onClick={increaceQuantity} className="btn btn-sm">
              +
            </button>
          </div>
          <button disabled={product?.stock < quantity} onClick={handelAddToCart} className="btn btn-sm ">
            Add to cart
          </button>
        </div>
      </div>
      <div className="product-review">
        {product?.reviews?.length < 1 ? (
          <div className="flex justify-center my-5 text-red-700 font-semibold">
            <p>No product review</p>
          </div>
        ) : (
          <div>
            <div className="number-of-review">
              <p className="my-5 flex justify-center font-semibold items-center">
                Number of review <small>({product?.numOfReviews})</small>
              </p>
              <div>
                {product?.reviews?.map((review) => (
                  <SingleReview key={review._id} review={review}></SingleReview>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProductsDetails;
