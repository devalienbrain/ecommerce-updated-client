import { Link } from "react-router-dom";
import { useUser } from "../../provider/UserContext";
import {
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaTags,
  FaChartBar,
  FaStore,
  FaPlusSquare,
  FaWarehouse,
  FaHistory,
  FaStar,
} from "react-icons/fa";

const DashboardSidebar = () => {
  const { user } = useUser();

  return (
    <div className="h-full bg-white pl-6 py-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard</h2>
      <ul className="space-y-4">
        {/* Common Links */}
        <li>
          <Link
            to="/dashboard/profile"
            className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
        </li>
        {user?.role !== "admin" && (
          <li>
            <Link
              to="/dashboard/orders"
              className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
            >
              <FaBoxOpen className="mr-2" />
              Orders
            </Link>
          </li>
        )}

        {user?.role === "admin" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Admin Links
            </h3>
            <li>
              <Link
                to="/dashboard/manage-users"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaUsers className="mr-2" /> Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-categories"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaTags className="mr-2" /> Manage Categories
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/monitor-transactions"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaChartBar className="mr-2" /> Monitor Transactions
              </Link>
            </li>
          </>
        )}

        {user?.role === "vendor" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Vendor Links
            </h3>
            <li>
              <Link
                to="/dashboard/my-shop"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaStore className="mr-2" /> My Shop
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-product"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaPlusSquare className="mr-2" /> Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-inventory"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaWarehouse className="mr-2" /> Manage Inventory
              </Link>
            </li>
          </>
        )}

        {user?.role === "user" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              User Links
            </h3>
            <li>
              <Link
                to="/dashboard/cart"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaShoppingCart className="mr-2" /> My Cart
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/recent-products"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaHistory className="mr-2" /> Recently Viewed
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reviews"
                className="flex items-center text-gray-600 hover:text-blue-500 hover:underline"
              >
                <FaStar className="mr-2" /> My Reviews
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
