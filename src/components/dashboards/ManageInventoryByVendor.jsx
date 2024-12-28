import React, { useState, useEffect } from "react";
import { useUser } from "../../provider/UserContext";
import useAxios from "../../hooks/useAxios";

const ManageInventoryByVendor = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const { user } = useUser();
  const userId = user?.id;
  const axiosInstance = useAxios();
  // Fetch products by vendor/userId
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/products/${userId}`
        );
        console.log("API Response:", response); // Debug API response
        if (Array.isArray(response?.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected array but got:", response?.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Handle fetch error
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProducts();
    } else {
      console.error("User ID is missing, cannot fetch products.");
      setLoading(false);
    }
  }, [userId]);

  // Handle input changes for product updates
  const handleChange = (e, productId) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [name]: value,
      },
    }));
  };

  // Handle product update API call
  const handleUpdate = async (productId) => {
    try {
      const response = await axiosInstance.put(
        `/api/products/${productId}`,
        updatedProduct[productId]
      );
      console.log("Product updated successfully:", response?.data);
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, ...response?.data } : product
      );
      setProducts(updatedProducts);

      // Clear updated product state for this product
      setUpdatedProduct((prevState) => {
        const { [productId]: _, ...rest } = prevState;
        return rest;
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Your Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products?.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product?.id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{product?.name}</h3>
              <p>Category: {product?.Category?.name || "Uncategorized"}</p>
              <p>Price: ${product?.price}</p>
              <p>Inventory: {product?.inventory}</p>

              {/* Form to update product details */}
              <div>
                <label className="block font-medium">Update Inventory:</label>
                <input
                  type="number"
                  name="inventory"
                  value={
                    updatedProduct[product.id]?.inventory || product.inventory
                  }
                  onChange={(e) => handleChange(e, product.id)}
                  className="w-full border p-2 rounded"
                  placeholder="New Inventory"
                />
                <label className="block font-medium">Update Price:</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProduct[product.id]?.price || product.price}
                  onChange={(e) => handleChange(e, product.id)}
                  className="w-full border p-2 rounded"
                  placeholder="New Price"
                />
                <label className="block font-medium">
                  Update Discount (%):
                </label>
                <input
                  type="number"
                  name="discount"
                  value={
                    updatedProduct[product.id]?.discount ||
                    product.discount ||
                    0
                  }
                  onChange={(e) => handleChange(e, product.id)}
                  className="w-full border p-2 rounded"
                  placeholder="Discount"
                />
              </div>

              {/* Update button */}
              <button
                onClick={() => handleUpdate(product.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Product
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ManageInventoryByVendor;
