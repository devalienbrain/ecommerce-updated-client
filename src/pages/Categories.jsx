import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/shared/Title";
import useAxios from "../hooks/useAxios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axiosInstance]);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/products/${categoryId}`, { state: { categoryName } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-lg font-semibold text-gray-600">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div id="categories" className="py-10">
      <Title title="Categories" />
      <div className="py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.length > 0 ? (
            categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="p-6 border rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out text-center group"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                  {category.name}
                </h3>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-red-600 font-medium">
              No categories found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
