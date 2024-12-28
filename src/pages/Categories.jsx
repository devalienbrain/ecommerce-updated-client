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
        const response = await axiosInstance.get(
          "/api/categories"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/products/${categoryId}`, { state: { categoryName } });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <div>
        <Title title="Categories" />
      </div>
      <div className="py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories?.length > 0 ? (
            categories?.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="p-4 border rounded shadow-md cursor-pointer hover:bg-blue-100"
              >
                {category.name}
              </div>
            ))
          ) : (
            <div className="text-red-600">No categories found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
