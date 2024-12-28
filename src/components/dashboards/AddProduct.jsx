import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    categoryId: "",
    inventory: "",
    image: "",
    discount: "",
    createdBy: 1, // Replace with actual user ID
  });
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/products",
        productData
      );
      console.log("Product added successfully:", response.data);
      setProductData({
        name: "",
        price: "",
        categoryId: "",
        inventory: "",
        image: "",
        discount: "",
        createdBy: 1, // Reset to default user ID
      });
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add A New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border p-2 rounded"
            step="0.01"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inventory Count */}
        <div>
          <label className="block font-medium mb-1">Inventory Count</label>
          <input
            type="number"
            name="inventory"
            value={productData.inventory}
            onChange={handleChange}
            placeholder="Enter inventory count"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            className="w-full border p-2 rounded"
            step="0.01"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
