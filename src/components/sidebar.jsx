import {
  LayoutGrid,
  Box,
  MonitorPlay,
  Grid3X3,
  Scale,
  Car,
  FileStack,
  Home,
  FileText,
  Bell,
  LogOut,
  CuboidIcon as Cube,
} from "lucide-react";

// Define menu items for different roles
const adminMenuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
  { icon: Box, label: "Load contraints", href: "/vehicles" },
  { icon: Grid3X3, label: "Items Management", href: "/item-management" },
  { icon: Car, label: "Vehicle Loading", href: "/VehicleLoading" },
  { icon: Home, label: "Dynamic Load Planning", href: "/product-list" },
  { icon: FileStack, label: "Load Constraints", href: "/load-stock" },
  { icon: FileText, label: "History and Report", href: "/reports" },
  { icon: FileText, label: "Verify products", href: "/product-verification" },
  { icon: Bell, label: "Notification", href: "/Notifications" },
  { icon: MonitorPlay, label: "Add your order", href: "/client-order" },
  { icon: Scale, label: "Weight Distribution", href: "/VehiclesPage " },
  
];

const logisticsMenuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
  { icon: Home, label: "Dynamic Load Planning", href: "/product-list" },
  { icon: Scale, label: "Weight Distribution", href: "/VehiclesPage " },
  { icon: Car, label: "Vehicle Compatibility Checks", href: "/VehicleLoading" },
  { icon: FileStack, label: "Load Constraints", href: "/load-stock" },
  { icon: Home, label: "Stocks Details", href: "/stock" },
  { icon: Bell, label: "Notification", href: "/Notifications" },
];

const driverMenuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
  { icon: Scale, label: "Weight Distribution", href: "/VehiclesPage " },
  { icon: FileStack, label: "Load Constraints", href: "#" },
  { icon: Bell, label: "Notification", href: "/Notifications" },
];

const UserMenuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
  { icon: MonitorPlay, label: "Add your order", href: "/client-order" },
  { icon: Bell, label: "Notification", href: "/Notifications" },
];



const nonAuthMenuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
];

const Sidebar = () => {
  // Retrieve user role and token from localStorage
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!localStorage.getItem("userToken");

  // Function to determine which menu items to display based on role
  const getMenuItems = () => {
    if (isAuthenticated) {
      if (userRole === "admin") return adminMenuItems;
      if (userRole === "logistics") return logisticsMenuItems;
      if (userRole === "driver") return driverMenuItems;
      if (userRole === "user") return UserMenuItems;

    }
    return nonAuthMenuItems; // Fallback for non-authenticated users
  };

  const menuItems = getMenuItems();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    window.location.href = "/"; // Redirect to login or home page
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Cube className="h-6 w-6" />
          <span>load planning and optimization system</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-md hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isAuthenticated && (
        <div className="p-6 mt-auto border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">I</div>
              <span className="text-gray-600">Ishimwe</span>
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