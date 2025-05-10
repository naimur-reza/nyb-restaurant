import { createBrowserRouter } from "react-router-dom";
import OrderDetails from "../components/shared/OrderDetails";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import MenuItem from "../pages/MenuItem";
import MyProfile from "../pages/MyProfile";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/:id",
        element: <MenuItem />,
      },
      {
        path: "/order",
        element: <OrderDetails />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
