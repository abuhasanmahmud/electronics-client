import React, { useEffect, useState } from "react";
import Footer from "../../sharied/Footer/Footer";
import Navbar from "./../../sharied/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { orderItems } from "./../../app/feature/orderSlice";
import { Link, Outlet } from "react-router-dom";

const UserDashbord = () => {
  // const { user, token } = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({});
  const { orderItem } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    setUser(user?.user);
    // console.log("user", user);
    const data = {
      token: user?.token,
      id: user?.user._id,
    };
    dispatch(orderItems(data));
  }, [dispatch]);
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="bg-base-200">
        <h1 className="py-4 text-center font-bold text-2xl">Dashbord ({user?.role})</h1>
        <div className="divider"></div>
        <div className="grid grid-cols-4 py-5 ">
          <div className="my-5">
            <img className="mx-auto h-24 rounded-full" src={user?.avatar?.url} alt="" />
            <p className="text-center">{user?.name}</p>
            <p className="text-center">{user?.email}</p>
            <div className="flex justify-center">
              <Link to="/editprofile">
                <button className="btn btn-sm mt-3 ">Edit profile</button>
              </Link>
            </div>
          </div>

          <div className="col-span-3">
            {user?.role === "user" ? (
              //user dashbord
              <div>
                <p className="text-center mb-5 font-semibold">My order</p>
                <div>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <th>id</th>
                          <th>status</th>
                          <th>Price</th>
                          <th>Payment now</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItem?.orders?.map((order, index) => (
                          <tr key={order._id}>
                            <th>{index + 1}</th>
                            <td>{order._id}</td>
                            <td>
                              {order.orderStatus === "Processing" ? (
                                <p>{order.orderStatus}</p>
                              ) : (
                                <p className="text-green-400">{order.orderStatus}</p>
                              )}
                            </td>
                            <td>{order.itemsPrice}</td>
                            <td>
                              {order.orderStatus === "Processing" ? (
                                <button className="btn btn-sm">payment now</button>
                              ) : (
                                <button disabled className="btn btn-sm">
                                  paied
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              //admin dashbord
              <div>
                <div>
                  <div className="flex justify-center">
                    <ul className="menu menu-horizontal bg-base-300 rounded-box font-semibold">
                      <li>
                        <Link to="/dashbord">All order</Link>
                      </li>
                      <li>
                        <Link to="/dashbord/allusers">All user</Link>
                      </li>
                      <li>
                        <Link to="/dashbord/allproduct">All product</Link>
                      </li>
                      <li>
                        <Link to="/dashbord/addproduct">Add product</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default UserDashbord;
