import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut,
} from "lucide-react";

const menuItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "manage", label: "Manage", icon: UserCog },
  { to: "category", label: "Category", icon: SquareChartGantt },
  { to: "product", label: "Product", icon: ShoppingBasket },
  { to: "orders", label: "Orders", icon: ListOrdered },
];

const SidebarAdmin = () => {
  return (
    <div className="bg-gray-900 w-64 text-gray-100 flex flex-col h-screen shadow-lg">
      <div className="h-24 flex items-center justify-center text-2xl font-extrabold text-white tracking-wide border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {({ isActive }) =>
              isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-md" />
              )
            }
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-700">
        <NavLink
          to="/logout"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
