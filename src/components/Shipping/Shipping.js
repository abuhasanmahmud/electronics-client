import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../sharied/Navbar/Navbar";
import Footer from "../../sharied/Footer/Footer";
import { saveShippingInfo } from "./../../app/feature/shippingSlice";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../app/feature/cartSlice";

const Shipping = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("shippinginfo", data);
    const shipingData = {
      orderItems: cartItems,
      shippingInfo: data,
      itemsPrice: "234",
      taxPrice: "20",
      totalPrice: 12345,
      paymentInfo: {
        id: "id",
        status: "processing",
      },
      user: user.user._id,
      token: user.token,
    };
    dispatch(saveShippingInfo(shipingData));
    // console.log("FORM DATA", data);
    dispatch(emptyCart());
    navigate("/dashbord");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-200 my-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Shipping Info</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    className="input input-bordered"
                    {...register("address", {
                      required: "Enter your address",
                      maxLength: {
                        value: 28,
                        message: "Name max char is 28",
                      },
                    })}
                  />
                  {errors.address && <p className="text-red-500 mt-2">{errors.address.message}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    className="input input-bordered"
                    {...register("city", {
                      required: "please enter city",
                    })}
                  />
                  {errors.city && <p className="text-red-500 mt-2">{errors.city.message}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">PhoneNo</span>
                  </label>
                  <input
                    {...register("phoneNo", {
                      required: "Enter your password",
                      minLength: {
                        value: 5,
                        message: "password min char 5",
                      },
                    })}
                    type="Number"
                    id="phoneNo"
                    placeholder="phoneNo"
                    className="input input-bordered"
                  />
                  {errors.phoneNo && <p className="text-red-500 mt-2">phoneNo is required.</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    {...register("country", {
                      required: "Enter your country",
                      minLength: {
                        value: 5,
                        message: "password min char 5",
                      },
                    })}
                    type="text"
                    id="country"
                    placeholder="country"
                    className="input input-bordered"
                  />
                  {errors.country && <p className="text-red-500 mt-2">country is required.</p>}
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Conferm order</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Shipping;
