
const TopBar = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Loading Data</div>
      <div className="flex items-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Notifications
        </button>
      </div>
    </div>
  );
};

export default TopBar;