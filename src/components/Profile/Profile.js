import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/feature/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // // console.log(user.user.email);
  // console.log(user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handel logout
  const handelLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* <img src="https://placeimg.com/80/80/people" /> */}
          <img src={user?.user?.avatar?.url} alt="img" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div>
          <li>
            <Link to="/userprofile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to="/dashbord">Dashbord</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <button onClick={handelLogOut}>Logout</button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Profile;
