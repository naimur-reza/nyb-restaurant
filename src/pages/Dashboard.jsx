import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardSidebar from "../components/DashboardSidebar";
import { useAppSelector } from "../hooks/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
  },
];

const mockOrders = [
  {
    id: 1,
    customer: "John Doe",
    items: 3,
    total: 45.99,
    status: "completed",
    date: "2024-03-15",
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: 2,
    total: 29.99,
    status: "pending",
    date: "2024-03-16",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    items: 4,
    total: 89.99,
    status: "processing",
    date: "2024-03-17",
  },
];

// Mock data for charts
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
];

const orderStatusData = [
  { name: "Completed", value: 400 },
  { name: "Pending", value: 300 },
  { name: "Processing", value: 200 },
];

const COLORS = [
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-info)",
];

// Reusable components
const StatCard = ({ title, value, prefix = "" }) => (
  <div className="bg-surface rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
    <p className="text-3xl font-bold text-primary">
      {prefix}
      {value}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-surface rounded-xl p-6 shadow-lg">
    <h3 className="text-lg font-semibold text-secondary mb-4">{title}</h3>
    <div className="h-[300px]">{children}</div>
  </div>
);

const TableHeader = ({ headers }) => (
  <thead className="bg-hover">
    <tr>
      {headers.map((header) => (
        <th
          key={header}
          className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "processing":
        return "bg-info/10 text-info";
      case "active":
        return "bg-success/10 text-success";
      case "inactive":
        return "bg-error/10 text-error";
      default:
        return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const ActionButton = ({ type, onClick, children }) => {
  const getButtonStyle = (type) => {
    switch (type) {
      case "primary":
        return "text-primary hover:text-primary/80";
      case "error":
        return "text-error hover:text-error/80";
      default:
        return "text-secondary hover:text-secondary/80";
    }
  };

  return (
    <button className={`${getButtonStyle(type)} mr-3`} onClick={onClick}>
      {children}
    </button>
  );
};

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Users" value={mockUsers.length} />
        <StatCard title="Total Orders" value={mockOrders.length} />
        <StatCard
          title="Revenue"
          value={mockOrders
            .reduce((sum, order) => sum + order.total, 0)
            .toFixed(2)}
          prefix="$"
        />
      </div>

      <ChartCard title="Revenue Overview">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-secondary)" />
            <YAxis stroke="var(--color-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "none",
                borderRadius: "0.5rem",
                color: "var(--color-primary)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Order Status Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="var(--color-primary)"
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="var(--color-primary)"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {orderStatusData[index].name} ({value})
                    </text>
                  );
                }}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "var(--color-primary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Orders">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="name" stroke="var(--color-secondary)" />
              <YAxis stroke="var(--color-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "var(--color-primary)",
                }}
              />
              <Bar dataKey="revenue" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-surface rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <TableHeader
            headers={["Name", "Email", "Role", "Status", "Actions"]}
          />
          <tbody className="bg-surface divide-y divide-border">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  <ActionButton type="primary">Edit</ActionButton>
                  <ActionButton type="error">Delete</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-surface rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <TableHeader
            headers={[
              "Order ID",
              "Customer",
              "Items",
              "Total",
              "Status",
              "Date",
              "Actions",
            ]}
          />
          <tbody className="bg-surface divide-y divide-border">
            {mockOrders.map((order) => (
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
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                  <ActionButton type="primary">View</ActionButton>
                  <ActionButton type="error">Cancel</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "users":
        return renderUsers();
      case "orders":
        return renderOrders();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">
          Dashboard
        </h2>
      </div>

      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {renderTabContent()}
    </div>
  );
};

export default Dashboard;
