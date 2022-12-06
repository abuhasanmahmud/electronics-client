import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./../../app/feature/authSlice";
import { useNavigate } from "react-router-dom";

const Regi = () => {
  const location = useLocation();
  let from = location.state ? location?.state?.from?.pathname : "/";
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:4000/api/v1/register",
        {
          name,
          email,
          password,
        },
        config
      );

      console.log(res);
      dispatch(loginUser({ data }));
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
    console.log("FORM DATA", name, email, password);
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
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
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    className="input input-bordered"
                    {...register("name", {
                      required: "Enter your name",
                      maxLength: {
                        value: 28,
                        message: "Name max char is 28",
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 mt-2">{errors.name.message}</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Enter your password",
                      minLength: {
                        value: 5,
                        message: "password min char 5",
                      },
                    })}
                    type="password"
                    id="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && <p className="text-red-500 mt-2">Password is required.</p>}
                  <label className="label mt-3">
                    <span>
                      New user ? <Link to="/login">Login now</Link>{" "}
                    </span>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regi;
