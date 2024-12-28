import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Title from "../components/shared/Title";
import useAxios from "../hooks/useAxios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]); // New state for categories
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const axiosInstance = useAxios();
  // Fetch all products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosInstance.get("/api/products");
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data); // Initially show all products

        const categoryResponse = await axiosInstance.get("/api/categories");
        setCategories(categoryResponse.data); // Fetch categories dynamically
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = products;

    // Filter by keyword search
    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered); // Update the displayed products
  }, [searchKeyword, selectedCategory, minPrice, maxPrice, products]);

  const onAddToCart = (productId) => {
    console.log(`Added product with ID: ${productId} to the cart`);
  };

  const onAddRecentlyViewed = (productId) => {
    console.log(`Added product with ID: ${productId} to recently viewed`);
  };

  const title = "Products";
  return (
    <>
      <div id="products">
        <div>
          <Title title={title} />
        </div>

        {/* Filter and Search Section */}
        <div className="mb-4 flex flex-col items-center sm:flex-row gap-4">
          {/* Search by Keyword */}
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="p-2 border rounded"
          />

          {/* Filter by Category */}
          {/* <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select> */}
          <span>Price range:</span>
          {/* Filter by Price Range */}
          <div className="flex gap-4">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min Price"
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max Price"
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Display filtered products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddRecentlyViewed={onAddRecentlyViewed}
              />
            ))
          ) : (
            <div className="text-red-600"> No products found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
