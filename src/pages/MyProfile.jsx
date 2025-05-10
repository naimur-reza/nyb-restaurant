import { useEffect, useState } from "react"
import { useAppSelector } from "../hooks/hooks"
import { useCurrentUser } from "../redux/features/auth/authSlice"

const MyProfile = () => {
  const user = useAppSelector(useCurrentUser)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const mockOrders = [
          {
            id: "ORD-001",
            date: "2023-05-15",
            items: [
              { name: "Margherita Pizza", quantity: 1, price: 12.99 },
              { name: "Garlic Bread", quantity: 1, price: 4.99 },
            ],
            total: 17.98,
            status: "completed",
          },
          {
            id: "ORD-002",
            date: "2023-06-22",
            items: [
              { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
              { name: "Caesar Salad", quantity: 1, price: 8.99 },
              { name: "Soda", quantity: 2, price: 2.99 },
            ],
            total: 29.96,
            status: "completed",
          },
          {
            id: "ORD-003",
            date: "2023-07-10",
            items: [
              { name: "Vegetarian Pizza", quantity: 1, price: 13.99 },
              { name: "Cheesy Fries", quantity: 1, price: 6.99 },
            ],
            total: 20.98,
            status: "pending",
          },
        ]

        setOrders(mockOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 font-babas-neue">
      <div className="max-w-4xl mx-auto bg-gray-900/70 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold uppercase">My Profile</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold ${
              activeTab === "profile" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`px-6 py-3 text-lg uppercase font-semibold ${
              activeTab === "orders" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
        </div>

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Full Name</h2>
                  <p className="text-xl">{user.name || "Not provided"}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Email</h2>
                  <p className="text-xl">{user.email}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Role</h2>
                  <p className="text-xl capitalize">{user.role || "customer"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Member Since</h2>
                  <p className="text-xl">{new Date(user.createdAt).toLocaleDateString() || "Not available"}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-400 uppercase">Total Orders</h2>
                  <p className="text-xl">{orders.length}</p>
                </div>
              </div>
            </div>

            {/* <div className="mt-8">
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition-colors">
                Edit Profile
              </button>
            </div> */}
          </div>
        )}

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-xl">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-700/40 p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-300">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "completed"
                              ? "bg-green-800 text-green-200"
                              : order.status === "pending"
                              ? "bg-yellow-700 text-yellow-200"
                              : "bg-red-800 text-red-200"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-gray-600">
                            <th className="pb-2">Item</th>
                            <th className="pb-2">Qty</th>
                            <th className="pb-2 text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(order.items) &&
                            order.items.map((item, index) => (
                              <tr key={index} className="border-b border-gray-700 last:border-b-0">
                                <td className="py-2">{item.name}</td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                              </tr>
                            ))}
                          <tr className="font-bold">
                            <td className="pt-2" colSpan={2}>
                              Total
                            </td>
                            <td className="pt-2 text-right">${order.total.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-700/40 p-4 flex justify-end">
                      <button className="bg-white text-black px-4 py-1 rounded text-sm hover:bg-gray-300 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
