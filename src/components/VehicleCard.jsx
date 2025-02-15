/* eslint-disable react/prop-types */
import { Truck, Package } from "lucide-react"

// eslint-disable-next-line react/prop-types
const VehicleCard = ({ vehicle }) => {
  const storagePercentage = (vehicle.availableStorage / vehicle.totalStorage) * 100

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{vehicle.name}</h3>
            <p className="text-gray-600">{vehicle.type}</p>
          </div>
          <Truck className="h-8 w-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">License Plate:</span> {vehicle.licensePlate}
          </p>
          <p className="text-sm">
            <span className="font-medium">Driver:</span> {vehicle.driver}
          </p>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Available Storage</span>
              <span className="text-sm font-medium">{storagePercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${storagePercentage}%` }}></div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Package className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm">
              {vehicle.availableStorage} / {vehicle.totalStorage} m³ available
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard

