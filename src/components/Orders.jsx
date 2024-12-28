import React, { useState, useEffect } from "react";
import { useUser } from "../provider/UserContext";
import useAxios from "../hooks/useAxios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const axiosInstance = useAxios();
  useEffect(() => {
    if (!user?.id) return; // Prevent unnecessary API calls if user ID is unavailable

    axiosInstance
      .get(`/api/orders?userId=${user?.id}`)
      .then((response) => setOrders(response?.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user?.id]);
  console.log(orders);
  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Orders
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1  gap-4">
        {orders?.length > 0 ? (
          orders?.map((order) => (
            <div key={order?.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">Order ID: {order?.id}</h3>
              <p>Total: ${order?.totalPrice?.toFixed(2)}</p>
              <p>Status: {order?.status}</p>
              <p>Items: {order?.items?.length || 0}</p>
              <p>Items: {order?.createdAt}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
