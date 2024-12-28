import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import useAxios from "../../hooks/useAxios";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState("");
  const axiosInstance = useAxios();
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert("Category name cannot be empty");
    try {
      const response = await axiosInstance.post("/api/categories", {
        name: newCategory,
      });
      setCategories((prev) => [...prev, response.data]);
      setNewCategory(""); // Reset input field
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosInstance.delete(`/api/categories/${categoryId}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Edit a category
  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditingName(category.name);
  };

  // Save edited category
  const handleSaveEdit = async () => {
    if (!editingName.trim()) return alert("Category name cannot be empty");
    try {
      await axiosInstance.patch(`/api/categories/${editingCategory}`, {
        name: editingName,
      });
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory ? { ...cat, name: editingName } : cat
        )
      );
      setEditingCategory(null); // Exit edit mode
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      {/* Add Category Section */}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category name"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {editingCategory === category.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="border p-2 flex justify-center space-x-4">
                {editingCategory === category.id ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditCategory(category)}
                      title="Edit Category"
                      className="text-blue-500 text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      title="Delete Category"
                      className="text-red-500 text-sm"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
