import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    customer: "John Doe",
    items: 3,
    total: 45.99,
    status: "completed",
    date: "2024-03-15",
    orderDetails: [
      { name: "Burger", quantity: 2, price: 15.99 },
      { name: "Fries", quantity: 1, price: 14.01 }
    ]
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: 2,
    total: 29.99,
    status: "pending",
    date: "2024-03-16",
    orderDetails: [
      { name: "Pizza", quantity: 1, price: 19.99 },
      { name: "Coke", quantity: 1, price: 10.00 }
    ]
  },
  {
    id: 3,
    customer: "Bob Johnson",
    items: 4,
    total: 89.99,
    status: "processing",
    date: "2024-03-17",
    orderDetails: [
      { name: "Steak", quantity: 2, price: 39.99 },
      { name: "Salad", quantity: 2, price: 10.01 }
    ]
  },
];

const Orders = () => {
  const user = useAppSelector(useCurrentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!user) {
    return null;
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    // Here you would typically make an API call to cancel the order
    toast.success(`Order #${selectedOrder.id} has been cancelled`);
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  const ViewOrderModal = () => {
    if (!showViewModal || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-surface rounded-xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-primary">Order Details</h3>
            <button
              onClick={() => setShowViewModal(false)}
              className="text-secondary hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary">Order ID</p>
                <p className="text-primary font-semibold">#{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-secondary">Customer</p>
                <p className="text-primary font-semibold">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-secondary">Date</p>
                <p className="text-primary font-semibold">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-secondary">Status</p>
                <p className="text-primary font-semibold">{selectedOrder.status}</p>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="text-lg font-semibold text-primary mb-2">Order Items</h4>
              <div className="space-y-2">
                {selectedOrder.orderDetails.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-primary">{item.name}</p>
                      <p className="text-secondary text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-primary">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-primary">Total</p>
                  <p className="text-lg font-semibold text-primary">${selectedOrder.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CancelOrderModal = () => {
    if (!showCancelModal || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-surface rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-primary">Cancel Order</h3>
            <button
              onClick={() => setShowCancelModal(false)}
              className="text-secondary hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-primary mb-6">
            Are you sure you want to cancel order #{selectedOrder.id}? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCancelModal(false)}
              className="px-4 py-2 rounded-lg border border-border hover:bg-hover text-primary"
            >
              No, Keep Order
            </button>
            <button
              onClick={confirmCancelOrder}
              className="px-4 py-2 rounded-lg bg-error text-white hover:bg-error/90"
            >
              Yes, Cancel Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">
          Orders
        </h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 font-open-sans">
          New Order
        </button>
      </div>

      <div className="bg-surface rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
            />
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary font-open-sans"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-500/70 text-white"
                          : order.status === "pending"
                          ? "bg-yellow-500/70 text-white"
                          : "bg-blue-500/70 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="    mr-3 bg-primary  text-black px-4 py-2 rounded-lg hover:bg-primary/90 font-open-sans"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleCancelOrder(order)}
                      className="text-error hover:text-error/80 bg-red-500/70 text-white px-4 py-2 rounded-lg hover:bg-red-500/90 font-open-sans"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewOrderModal />
      <CancelOrderModal />
    </div>
  );
};

export default Orders;
