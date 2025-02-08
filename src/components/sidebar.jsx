
const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="text-2xl font-bold mb-6">Load Optimise</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="/home" className="hover:text-gray-400">Overview</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Dynamic Load Planning</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">3D Visualization & Simulation</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Space Utilisation Metrics</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Weight Distribution</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Vehicle Compatibility Checks</a>
          </li>
          <li className="mb-4">
            <a href="/load-stock" className="hover:text-gray-400">Load Constraints</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Route Planning Integration</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Client & Order Management</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">History and Report</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-400">Notification</a>
          </li>
        </ul>
      </nav>
      <div className="mt-6 text-sm text-gray-400">
        Scan for more information
      </div>
    </div>
  );
};

export default Sidebar;