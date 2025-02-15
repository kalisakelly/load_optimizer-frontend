const StoreSpace = () => {
    const availableSpace = 85
    const runningOutSpace = 15
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold">Available Store Space</h2>
  
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Available store</span>
            </div>
            <span>{availableSpace}%</span>
          </div>
  
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Running out store</span>
            </div>
            <span>{runningOutSpace}%</span>
          </div>
  
          <div className="h-2 rounded-full overflow-hidden bg-gray-200">
            <div className="h-full bg-red-500" style={{ width: `${100 - availableSpace}%` }}>
              <div className="h-full bg-green-500" style={{ width: `${availableSpace}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default StoreSpace
  
  