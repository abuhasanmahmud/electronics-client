import Axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../sharied/Loading/Loading";
import Navbar from "../../sharied/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelResetPassword = async () => {
    setLoading(true);
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await Axios.post(
      "http://localhost:4000/api/v1/password/forget",
      { email: email },
      config
    );
    if (res.data.success) {
      setLoading(false);
      toast.success(res.data.message);
    }
    //     console.log("res", res.data);
    navigate("/");
  };
  return (
    <>
      <Navbar></Navbar>

      <div className="form-control w-1/2 mx-auto">
        <label className="label">
          <span className="label-text">Your Email</span>
        </label>
        <label className="input-group input-group-vertical">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="info@site.com"
            className="input input-bordered"
          />
        </label>
        <button disabled={loading} onClick={handelResetPassword} className="btn btn-sm mt-3">
          reset your password
        </button>
        {loading ? <Loading></Loading> : <p></p>}
      </div>
    </>
  );
};

export default ForgetPassword;
