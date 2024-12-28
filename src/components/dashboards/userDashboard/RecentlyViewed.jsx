import React, { useState, useEffect } from "react";
import { useUser } from "../../../provider/UserContext";
import useAxios from "../../../hooks/useAxios";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  const axiosInstance = useAxios();
  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/api/recently-viewed?userId=${userId}`)
        .then((response) => setRecentProducts(response?.data || []))
        .catch((error) =>
          console.error("Error fetching recently viewed products:", error)
        );
    }
  }, [userId]);
  console.log(recentProducts);
  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        Recently Viewed
      </h1>
      <hr className="mb-7" />
      {recentProducts?.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't viewed any products recently.
        </p>
      ) : (
        <div className="grid grid-cols-1  gap-4">
          {recentProducts?.map((product) => (
            <div
              key={product?.id}
              className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold">{product?.product?.name}</h3>
              <p>Price: ${product?.product?.price}</p>
              <p className="text-xs font-semibold">
                Viewed At: <strong>{product?.viewedAt}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
