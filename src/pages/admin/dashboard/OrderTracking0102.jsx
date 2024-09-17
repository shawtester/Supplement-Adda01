import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig"; // Adjust your path if needed

const AdminOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from Firestore
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(fireDB, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      console.log(`Order ${orderId} status updated to ${newStatus}`);
      getOrderData(); // Re-fetch orders after status update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : (
        <div className="max-w-5xl w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Order Management</h2>
          {orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order, orderIndex) => (
                <div key={orderIndex} className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Order ID: {order.id}</h3>
                  <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>

                  {/* Dropdown to select new status */}
                  <div className="mt-4">
                    <label htmlFor={`status-${order.id}`} className="block text-sm font-medium text-gray-700">Update Status:</label>
                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  {/* Show current order details */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700">Order Details:</h3>
                    {order.cartItems && order.cartItems.length > 0 ? (
                      <ul className="space-y-4 mt-4">
                        {order.cartItems.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center space-x-4">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <p className="text-gray-800 font-semibold">{item.title}</p>
                              <p className="text-gray-600">Quantity: {item.quantity}</p>
                              <p className="text-gray-600">Price: ${item.price}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No items in this order.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersDashboard;
