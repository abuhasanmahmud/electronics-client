import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../sharied/Navbar/Navbar";
import Footer from "../../sharied/Footer/Footer";
import { useDispatch } from "react-redux";
import { loginUser } from "./../../app/feature/authSlice";

const Login = () => {
  const location = useLocation();

  // console.log("location", location?.state?.from?.pathname, location);
  let from = location.state ? location?.state?.from?.pathname : "/";
  // console.log("from", from);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    //     console.log(data.email, data.password);

    dispatch(loginUser({ data }));

    navigate(from, { replace: true });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-200 my-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                        message: "password min 5 char",
                      },
                    })}
                    type="password"
                    id="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                  <label className="label mt-3">
                    <span>
                      New user ? <Link to="/regi">Register now</Link>{" "}
                    </span>
                  </label>
                  <label className="text-red-500">
                    <Link to="/forget/password">
                      <span>Forget password</span>
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
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

export default Login;
