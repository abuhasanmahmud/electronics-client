import React, { useEffect, useState } from "react";
import Footer from "../../sharied/Footer/Footer";
import Navbar from "./../../sharied/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  // const [items, setItems] = useState([]);
  //   console.log("auth is", items?.user?.name);

  const [err, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, token } = useSelector((state) => state.auth.user);

  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("auth"));
    // if (items) {
    //   setItems(items);
    // }
  }, []);
  //   console.log("user name", user.name);
  //handel eidt btn
  const onSubmit = async (data) => {
    // const edata = { token, data };
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/me/update/${user?._id}`, {
        token,
        data,
      });
      // console.log("updet user", res.data.user);

      //       setUpdateUser(res.data.user);
      localStorage.setItem("auth", JSON.stringify(res.data));
      //       window.location.reload();
      //       dispatch(loginUser({ user: res.data.user }));
    } catch (error) {
      setError(true);
    }
    // const auth2 = { ...items, user: updateUser };
    //     console.log("authis", auth2, updateUser);
    //     console.log("updated user", updateUser);

    if (!err) {
      navigate("/dashbord", { replace: true });
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <p className="text-center font-semibold mt-5">Edit your profile now</p>
      <div className="flex justify-center my-5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("name", {
                    required: "Enter your password",
                    minLength: {
                      value: 5,
                      message: "password min 5 char",
                    },
                  })}
                  type="text"
                  id="name"
                  defaultValue={user?.name}
                  className="input input-bordered"
                />
                {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
              </div>
              <div className="form-control">
                <input
                  type="email"
                  id="email"
                  defaultValue={user?.email}
                  className="input input-bordered"
                  {...register("email", {
                    required: "please enter email",
                    pattern: {
                      value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/i,
                      message: "please enter a valid email",
                    },
                  })}
                />
                {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">updet profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EditProfile;
