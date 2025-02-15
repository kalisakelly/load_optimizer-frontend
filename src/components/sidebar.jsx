import {
  LayoutGrid,
  Box,
  MonitorPlay,
  Grid3X3,
  Scale,
  Car,
  FileStack,
  Route,
  Users2,
  FileText,
  Bell,
  LogOut,
  QrCode,
  CuboidIcon as Cube,
} from "lucide-react"

const menuItems = [
  { icon: LayoutGrid, label: "Overview", href: "/home" },
  { icon: Box, label: "Dynamic Load Planning", href: "/vehicles" },
  { icon: MonitorPlay, label: "3D Visualization & Simulation", href: "#" },
  { icon: Grid3X3, label: "Items Management", href: "/item-management" },
  { icon: Scale, label: "Weight Distribution", href: "#" },
  { icon: Car, label: "Vehicle Compatibility Checks", href: "/VehicleLoading" },
  { icon: FileStack, label: "Load Constraints", href: "/load-stock" },
  // { icon: Route, label: "Route Planning Integration", href: "#" },
  { icon: Users2, label: "Client & Order Management", href: "#" },
  { icon: FileText, label: "History and Report", href: "/reports" },
  { icon: Bell, label: "Notification", href: "/Notifications" },
]

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Cube className="h-6 w-6" />
          <span>Load Optimise</span>
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
      <div className="p-6 mt-auto border-t">
        <div className="space-y-4">
          {/* <div className="text-sm text-gray-600">Scan for more information</div> */}
          {/* <div className="flex justify-between items-center">
            <QrCode className="h-6 w-6 text-gray-400" />
            <span className="text-blue-600">LoadOptimize</span>
          </div> */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">I</div>
              <span className="text-gray-600">Ishimwe</span>
            </div>
            <LogOut className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

