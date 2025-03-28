/* eslint-disable react/prop-types */
import {  FiTruck } from 'react-icons/fi';

export default function VehicleCard({ vehicle, onEdit, onDelete, onLoadItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 g-3">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{vehicle.name}</h3>
        <p className="text-gray-600">{vehicle.description}</p>
        <p className="text-sm">
          <span className="font-medium">Capacity:</span> {vehicle.capacity}
        </p>
      </div>
      <div className=" flex justify-center space-x-4 ">
        {/* <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2"
        >
          <FiEdit /> Edit
        </button> */}
        {/* <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
        >
          <FiTrash2 /> Delete
        </button> */}
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
