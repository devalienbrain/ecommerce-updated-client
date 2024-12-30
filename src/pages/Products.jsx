// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import Title from "../components/shared/Title";
// import useAxios from "../hooks/useAxios";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const axiosInstance = useAxios();

//   // Fetch products and categories
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const productResponse = await axiosInstance.get("/api/products");
//   //       console.log("Fetched Products:", productResponse?.data);
//   //       setProducts(productResponse?.data);
//   //       setFilteredProducts(productResponse?.data);

//   //       const categoryResponse = await axiosInstance.get("/api/categories");
//   //       console.log("Fetched Categories:", categoryResponse?.data);
//   //       setCategories(categoryResponse?.data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productResponse = await axiosInstance.get("/api/products");
//         console.log("Fetched Products:", productResponse?.data);
//         setProducts(productResponse?.data);
//         setFilteredProducts(productResponse?.data); // Initialize filteredProducts

//         const categoryResponse = await axiosInstance.get("/api/categories");
//         console.log("Fetched Categories:", categoryResponse?.data);
//         setCategories(categoryResponse?.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Apply filters to products
//   // useEffect(() => {
//   //   if (products?.length === 0) {
//   //     console.log("No products available to filter yet.");
//   //     setFilteredProducts([]);
//   //     return;
//   //   }

//   //   console.log("Initial Products:", products);

//   //   let filtered = [...products];

//   //   // Filter by keyword search
//   //   if (searchKeyword) {
//   //     filtered = filtered.filter((product) =>
//   //       product.name.toLowerCase().includes(searchKeyword.toLowerCase())
//   //     );
//   //     console.log("After Keyword Filter:", filtered);
//   //   }

//   //   // Filter by category
//   //   if (selectedCategory) {
//   //     filtered = filtered.filter((product) => {
//   //       if (!product.category || !product.category.name) {
//   //         console.warn(`Product missing category:`, product);
//   //         return false;
//   //       }
//   //       return product.category.name === selectedCategory;
//   //     });
//   //     console.log("After Category Filter:", filtered);
//   //   }

//   //   // Filter by price range
//   //   filtered = filtered.filter(
//   //     (product) => product.price >= minPrice && product.price <= maxPrice
//   //   );
//   //   console.log("After Price Range Filter:", filtered);

//   //   setFilteredProducts(filtered);
//   // }, []);
//   // Apply filters to products
//   useEffect(() => {
//     if (products?.length === 0) {
//       console.log("No products available to filter yet.");
//       setFilteredProducts([]);
//       return;
//     }

//     console.log("Initial Products:", products);

//     let filtered = [...products];

//     // Filter by keyword search
//     if (searchKeyword) {
//       filtered = filtered.filter((product) =>
//         product.name.toLowerCase().includes(searchKeyword.toLowerCase())
//       );
//       console.log("After Keyword Filter:", filtered);
//     }

//     // Filter by category
//     if (selectedCategory) {
//       filtered = filtered.filter((product) => {
//         if (!product.category || !product.category.name) {
//           console.warn(`Product missing category:`, product);
//           return false;
//         }
//         return product.category.name === selectedCategory;
//       });
//       console.log("After Category Filter:", filtered);
//     }

//     // Filter by price range
//     filtered = filtered.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice
//     );
//     console.log("After Price Range Filter:", filtered);

//     setFilteredProducts(filtered);
//   }, [products, searchKeyword, selectedCategory, minPrice, maxPrice]); // Add dependencies here

//   const onAddToCart = (productId) => {
//     console.log(`Added product with ID: ${productId} to the cart`);
//   };

//   const onAddRecentlyViewed = (productId) => {
//     console.log(`Added product with ID: ${productId} to recently viewed`);
//   };

//   return (
//     <div id="products" className="p-4">
//       <Title title="Products" />

//       {/* Filter Section */}
//       <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by keyword"
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//           className="p-2 border rounded w-full sm:w-auto"
//         />

//         {/* Category Filter */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="p-2 border rounded w-full sm:w-auto"
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>

//         {/* Price Filter */}
//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             placeholder="Min Price"
//             className="p-2 border rounded w-full sm:w-auto"
//           />
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             placeholder="Max Price"
//             className="p-2 border rounded w-full sm:w-auto"
//           />
//         </div>
//       </div>

//       {/* Product Display */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts?.length > 0 ? (
//           filteredProducts?.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               onAddToCart={onAddToCart}
//               onAddRecentlyViewed={onAddRecentlyViewed}
//             />
//           ))
//         ) : (
//           <div className="text-red-600">Products array is empty</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Title from "../components/shared/Title";
import useAxios from "../hooks/useAxios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const axiosInstance = useAxios();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosInstance.get("/api/products");
        console.log("Fetched Products:", productResponse?.data);
        setProducts(productResponse?.data);
        setFilteredProducts(productResponse?.data); // Initialize filteredProducts

        const categoryResponse = await axiosInstance.get("/api/categories");
        console.log("Fetched Categories:", categoryResponse?.data);
        setCategories(categoryResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Apply filters to products
  useEffect(() => {
    if (products.length === 0) {
      console.log("No products available to filter yet.");
      setFilteredProducts([]);
      return;
    }

    console.log("Applying Filters:", {
      searchKeyword,
      selectedCategory,
      minPrice,
      maxPrice,
    });

    let filtered = [...products];

    // Filter by keyword search
    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered);
  }, [products, searchKeyword, selectedCategory, minPrice, maxPrice]);

  const onAddToCart = (productId) => {
    console.log(`Added product with ID: ${productId} to the cart`);
  };

  const onAddRecentlyViewed = (productId) => {
    console.log(`Added product with ID: ${productId} to recently viewed`);
  };

  return (
    <div id="products" className="p-4">
      <Title title="Products" />

      {/* Filter Section */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min Price"
            className="p-2 border rounded w-full sm:w-auto"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max Price"
            className="p-2 border rounded w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Product Display */}
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
          <div className="text-red-600">
            No products found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
