import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(carts.length);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold ">
              LOGO
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              //

              to={"/"}
            >
              Home
            </NavLink>

            {/*Badge*/}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/cart"}
            >
              Cart
              {carts.length > 0 && (
                <span className="adsolute top-0 bg-red-500 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>
{
  user 
  ? <div className="flex items-center gap-4">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md"
            >
              <img
                className="w-8 h-8"
                src="https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
              />
              <ChevronDown />
            </button>
            {isOpen && (
              <div className="absolute mt-2 top-16 bg-white shadow-md">
                <Link
                  to={"/user/history"}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  History
                </Link>
                <button
                  onClick={() => logout()}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
  : <div className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/register"}
            >
              Register
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
}
          

          
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
