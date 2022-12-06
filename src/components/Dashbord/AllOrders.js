import axios from "axios";
import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [allOrder, setAllOrders] = useState([]);
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
          "http://localhost:4000/api/v1/admin/orders",
          {
            token: user?.token,
          },
          config
        );
        // console.log("data", data);

        setAllOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrders();
  }, [user?.token]);

  //update order status
  const updetOrderStatus = async (id) => {
    // console.log("updated id", id);
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
                <th>status</th>
                <th>Price</th>
                <th>Payment now</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.map((order, index) => (
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
                      <button onClick={() => updetOrderStatus(order._id)} className="btn btn-sm">
                        Updet order
                      </button>
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
  );
};

export default AllOrders;
