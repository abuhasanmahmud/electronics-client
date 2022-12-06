import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("shippinginfo", data);
    //    const shipingData = {
    //      orderItems: cartItems,
    //      shippingInfo: data,
    //      itemsPrice: "234",
    //      taxPrice: "20",
    //      totalPrice: 12345,
    //      paymentInfo: {
    //        id: "id",
    //        status: "processing",
    //      },
    //      user: user.user._id,
    //      token: user.token,
    //    };

    navigate("/dashbord");
  };
  return (
    <div>
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
  );
};

export default AddProduct;
