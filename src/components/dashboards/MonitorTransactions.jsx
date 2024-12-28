import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const MonitorTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    // Fetch transaction history from the API
    axiosInstance
      .get("/api/allOrders")
      .then((response) => setTransactions(response?.data || []))
      .catch((error) =>
        console.error("Error fetching transaction history:", error)
      );
  }, []);
  console.log(transactions);
  useEffect(() => {
    // Filter transactions based on the search term
    if (searchTerm) {
      setFilteredTransactions(
        transactions.filter(
          (transaction) =>
            transaction.user?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            transaction.product?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            transaction.status?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, transactions]);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        Monitor Transactions
      </h1>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by user, product, or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <hr className="mb-7" />
      {filteredTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.map((transaction, index) => (
                <tr key={transaction?.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {transaction?.userId || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    ${transaction.totalPrice?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-6 py-3 text-sm font-medium ${
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : transaction.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {transaction?.id || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default MonitorTransactions;
