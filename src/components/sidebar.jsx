import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Box,
  MonitorPlay,
  Scale,
  Car,
  FileStack,
  Home,
  FileText,
  Bell,
  User,
  LogOut,
  Cuboid as Cube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const menuItemsByRole = {
  admin: [
    { icon: LayoutGrid, label: "Overview", href: "/home" },
    { icon: Box, label: "Load Progression", href: "/vehicles" },
    { icon: Home, label: "Dynamic Load Planning", href: "/product-list" },
    { icon: MonitorPlay, label: "Add Orders", href: "/client-order" },
    { icon: Car, label: "Fleet Management", href: "/vehicle-loading" },
    { icon: FileStack, label: "Load Constraints", href: "/load-stock" },
    { icon: FileText, label: "History & Reports", href: "/reports" },
    { icon: FileText, label: "Verify Products", href: "/product-verification" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: User, label: "Admin Board", href: "/user-management" },
  ],
  logistics: [
    { icon: LayoutGrid, label: "Overview", href: "/home" },
    { icon: Home, label: "Dynamic Load Planning", href: "/product-list" },
    { icon: Scale, label: "Weight Distribution", href: "/vehicles-page" },
    { icon: Car, label: "Vehicle Compatibility Checks", href: "/vehicle-loading" },
    { icon: FileText, label: "Verify Products", href: "/product-verification" },
    { icon: Home, label: "Stock Details", href: "/stock" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: FileText, label: "History & Reports", href: "/reports" },
  ],
  driver: [
    { icon: Scale, label: "Weight Distribution", href: "/vehicles-page" },
    { icon: FileStack, label: "Deliveries", href: "/delivered-list" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: FileText, label: "History & Reports", href: "/reports" },
  ],
  user: [
    { icon: MonitorPlay, label: "Add Your Order", href: "/client-order" },
    { icon: Home, label: "Dynamic Load Planning", href: "/product-list" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: FileText, label: "History & Reports", href: "/reports" },
  ],
  guest: [{ icon: LayoutGrid, label: "Login", href: "/login" }],
};

const Sidebar = () => {
  const [userRole, setUserRole] = useState("guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedRole = localStorage.getItem("userRole");

    setIsAuthenticated(!!token);
    setUserRole(storedRole || "guest");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        axios
          .get(`http://localhost:3000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUser(response.data);
            setUserRole(response.data.role || "guest"); // Ensure role is updated from server
          })
          .catch((error) => console.error("Error fetching user details:", error));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const menuItems = menuItemsByRole[userRole] || menuItemsByRole.guest;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole("guest");
    setUser(null);
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r shadow-lg">
      {/* Header */}
      <div className="p-6 border-b flex items-center gap-2 text-xl font-semibold">
        <Cube className="h-6 w-6 text-blue-600" />
        <span>Load Planning</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:text-white hover:bg-blue-600 transition-all"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isAuthenticated && (
        <div className="p-6 mt-auto border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-gray-700">{user?.name || "Unknown User"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
