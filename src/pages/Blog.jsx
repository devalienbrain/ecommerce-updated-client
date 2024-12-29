import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useAxios from "../hooks/useAxios";
import Title from "../components/shared/Title";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    details: "",
    imageUrl: "",
    author: "",
  });
  const axiosInstance = useAxios();

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/api/blog");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [axiosInstance]);

  // Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  // Create new blog
  const handleCreateBlog = async () => {
    try {
      await axiosInstance.post("/api/blog", blogData);
      setBlogData({ title: "", details: "", imageUrl: "", author: "" });
      setShowModal(false);
      const response = await axiosInstance.get("/api/blog"); // Refresh blogs
      setBlogs(response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div
      id="blog"
      className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen"
    >
      <Title title="Blog" />

      {/* Add Blog Button */}
      <div className="flex  mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2  py-2 px-4 rounded hover:bg-slate-100 text-xs border"
        >
          <AiOutlinePlusCircle size={24} />
          Add Blog
        </button>
      </div>

      {/* Blogs Display */}
      <div className="grid grid-cols-1 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex gap-4 p-4 border rounded shadow bg-white"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-1/3 h-40 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-bold">{blog.title}</h2>
                <p className="text-gray-600 mt-2">{blog.details}</p>
                <div className="text-sm text-gray-500  mt-4">
                  By: {blog.author} |{" "}
                  {new Date(blog.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-600 text-center">No blogs found</div>
        )}
      </div>

      {/* Create Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-3/4 sm:w-1/2">
            <h2 className="text-lg font-bold mb-4">Create New Blog</h2>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              name="details"
              value={blogData.details}
              onChange={handleChange}
              placeholder="Blog Details"
              rows="4"
              className="p-2 border rounded w-full mb-4"
            ></textarea>
            <input
              type="text"
              name="imageUrl"
              value={blogData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-2 border rounded w-full mb-4"
            />
            <input
              type="text"
              name="author"
              value={blogData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBlog}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
