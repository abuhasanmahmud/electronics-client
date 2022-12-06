import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [allUsers, setAllUser] = useState([]);
  // console.log("all user", allUsers);
  const user = JSON.parse(localStorage.getItem("auth"));
  // console.log("allorder", allOrder);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/admin/users",
          {
            token: user?.token,
          },
          config
        );
        // console.log("data", data);

        setAllUser(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrders();
  }, [user?.token]);

  //update order status
  const updetUserRole = async (id) => {
    console.log("updetUserRole id", id);
    try {
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = axios.put(`http://localhost:4000/api/v1/admin/order/${id}`, {
        token: user?.token,
        status: "Delivered",
        config,
      });

      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  //delete user
  //update order status
  const deleteUser = async (id) => {
    console.log("deleteUser id", id);
    try {
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = axios.put(`http://localhost:4000/api/v1/admin/order/${id}`, {
        token: user?.token,
        status: "Delivered",
        config,
      });

      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="mx-3 my-5">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>id</th>
                <th>email</th>
                <th>Role</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={user._id}>
                  <th>
                    {" "}
                    <img className="mx-auto h-25 rounded-full w-30" src={user?.avatar.url} alt="" />{" "}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="">{user.role}</td>
                  <td>
                    {user?.role === "admin" ? (
                      <div className="flex  justify-center">
                        <button disabled className="btn btn-sm btn-outline">
                          <span className="text-red-600 ">admin</span>
                        </button>
                        <button disabled className="btn btn-ghost btn-sm ml-2  ">
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="flex  justify-center">
                        <button
                          onClick={() => updetUserRole(user._id)}
                          className="btn btn-sm btn-warning "
                        >
                          updet
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="btn btn-ghost btn-sm ml-2  "
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
