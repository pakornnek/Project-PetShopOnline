import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex flex-col flex-1">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
