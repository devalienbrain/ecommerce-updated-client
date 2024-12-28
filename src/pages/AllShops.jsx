import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Title from "../components/shared/Title";

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const axiosInstance = useAxios();

  // Fetch all shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axiosInstance.get("/api/shop");
        setShops(response.data);
        setFilteredShops(response.data); // Initialize filtered shops with all shops
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, [axiosInstance]);

  // Filter shops based on search keyword
  useEffect(() => {
    const filtered = shops.filter((shop) =>
      shop.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredShops(filtered);
  }, [searchKeyword, shops]);

  const title = "All Shops";

  return (
    <div
      id="all-shops"
      className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen"
    >
      <Title title={title} />

      {/* Search Section */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by shop name"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
      </div>

      {/* Display Shops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800"
            >
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {shop.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {shop.description}
              </p>
            </div>
          ))
        ) : (
          <div className="text-red-600 text-center col-span-full">
            No shops found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllShops;
