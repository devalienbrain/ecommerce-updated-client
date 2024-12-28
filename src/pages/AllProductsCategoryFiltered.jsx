import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Title from "../components/shared/Title";
import useAxios from "../hooks/useAxios";

const AllProductsCategoryFiltered = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(
    location.state?.categoryName || ""
  );
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/products?category=${categoryId}`
        );
        setProducts(response.data);

        // Only fetch category name if not provided via navigation state
        if (!categoryName) {
          const categoryResponse = await axiosInstance.get(
            `/api/categories/${categoryId}`
          );
          setCategoryName(categoryResponse.data.name);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products or category:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, categoryName]);

  if (loading) {
    return (
      <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6">
        Loading products...
      </div>
    );
  }

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <Title title={`Products in ${categoryName}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => console.log(`Add product ${product.id} to cart`)}
            onAddRecentlyViewed={() =>
              console.log(`Add product ${product.id} to recently viewed`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsCategoryFiltered;
