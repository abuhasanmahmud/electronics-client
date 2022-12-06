import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
var sectionStyle = {
  width: "100%",
  height: "350px",
  backgroundImage: "url( https://i.ibb.co/w7XxstR/bannerbgg.png)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const Banner = () => {
  const [searchProduct, setSearchProduct] = useState("");
  // console.log(searchProduct);
  const navigate = useNavigate();
  const searchProductHandel = () => {
    navigate("/products", { state: { searchProduct } }, { replace: true });
  };
  return (
    <div style={sectionStyle}>
      <div className="grid  h-full items-center justify-center">
        <div className="text-4xl  font-bold">
          <h1 className="text-white my-6" style={{ fontSize: "50px", fontWeight: "60px" }}>
            Beautiful Moment for you
          </h1>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={(e) => setSearchProduct(e.target.value)}
              />
              <button onClick={searchProductHandel} className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Link to="/gallery">
            <button className="btn btn-sm ">Explore now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
