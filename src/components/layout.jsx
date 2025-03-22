import React from 'react';
import Sidebar from './sidebar';
import TopBar from './topbar';
import { Outlet } from 'react-router-dom'; // For rendering child routes

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64 bg-gray-800 text-white" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        {/* <TopBar className="bg-blue-500 text-white p-2 shadow-md" /> */}

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet /> {/* Renders child routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;