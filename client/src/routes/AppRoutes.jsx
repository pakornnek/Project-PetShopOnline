import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/user/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Layouts
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutUser from "../layouts/LayoutUser";

// Admin Pages
import Dashbord from "../pages/admin/Dashbord";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import EditProduct from "../pages/admin/EditProduct";
import Manage from "../pages/admin/Manage";
import ManageOrders from "../pages/admin/ManageOrders"


// User Pages
import HomeUser from "../pages/user/HomeUser";
import Payment from "../pages/user/Payment";

// Protected Routes
import ProtectRouteAdmin from "./ProtecRouteAdmin";
import ProtectRouteUser from "./ProtectRouteUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashbord /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
      { path: "orders", element: <ManageOrders/> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
