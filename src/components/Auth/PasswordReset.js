import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../sharied/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
const PasswordReset = () => {
  const { resettoken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confermPassword) {
        return toast.error("your password doesnot match");
      }
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `http://localhost:4000/api/v1/password/reset/${resettoken}`,
        {
          password: data.password,
          confirmPassword: data.confermPassword,
        },
        config
      );
      if (res.data.success) {
        navigate("/login");
        toast("successfully of reset your password");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <p className="text-center font-semibold text-2xl mt-3">Set your new password </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
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
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text"> Conferm Password</span>
            </label>
            <input
              {...register("confermPassword", {
                required: "Enter your password",
                minLength: {
                  value: 5,
                  message: "password min 5 char",
                },
              })}
              type="password"
              id="confermPassword"
              placeholder="conferm password"
              className="input input-bordered"
            />
            {errors.confermPassword && (
              <p className="text-red-500 mt-2">{errors.confermPassword.message}</p>
            )}
          </div>
          <div className="form-control mt-6 w-1/2 mx-auto">
            <button className="btn btn-primary">SEND</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PasswordReset;
