/* eslint-disable react/prop-types */
import { FiTruck } from 'react-icons/fi';

export default function VehicleCard({ vehicle, onLoadItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 g-3">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{vehicle.name}</h3>
        <p className="text-gray-600">{vehicle.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <p>
            <span className="font-medium">Capacity:</span> {vehicle.capacity}
          </p>
          <p>
            <span className="font-medium">Available:</span> {vehicle.space_available}
          </p>
          <p>
            <span className="font-medium">Type:</span> {vehicle.type || 'N/A'}
          </p>
          <p>
            <span className="font-medium">Driver:</span> {vehicle.driver?.name || 'None'}
          </p>
        </div>
        {vehicle.image && (
          <div className="mt-2">
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className="w-full h-32 object-cover rounded"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onLoadItem}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
        >
          <FiTruck /> Load Item
        </button>
      </div>
    </div>
  );
}