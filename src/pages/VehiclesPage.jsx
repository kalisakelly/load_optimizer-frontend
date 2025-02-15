"use client"

import { useState } from "react"
import VehicleCard from "../components/VehicleCard"
import { Search, Filter } from "lucide-react"

const sampleVehicles = [
  {
    id: 1,
    name: "Truck A",
    type: "Heavy Duty",
    licensePlate: "HD-1234",
    driver: "John Doe",
    availableStorage: 15,
    totalStorage: 20,
  },
  {
    id: 2,
    name: "Van B",
    type: "Light Duty",
    licensePlate: "LD-5678",
    driver: "Jane Smith",
    availableStorage: 3,
    totalStorage: 5,
  },
  {
    id: 3,
    name: "Truck C",
    type: "Medium Duty",
    licensePlate: "MD-9101",
    driver: "Bob Johnson",
    availableStorage: 8,
    totalStorage: 10,
  },
  {
    id: 4,
    name: "Truck D",
    type: "Heavy Duty",
    licensePlate: "HD-1122",
    driver: "Alice Brown",
    availableStorage: 18,
    totalStorage: 20,
  },
  {
    id: 5,
    name: "Van E",
    type: "Light Duty",
    licensePlate: "LD-3344",
    driver: "Charlie Davis",
    availableStorage: 4,
    totalStorage: 5,
  },
  {
    id: 6,
    name: "Truck F",
    type: "Medium Duty",
    licensePlate: "MD-5566",
    driver: "Eva Wilson",
    availableStorage: 7,
    totalStorage: 10,
  },
]

const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")

  const filteredVehicles = sampleVehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || vehicle.type === filterType),
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Vehicles</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative w-full md:w-64">
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Heavy Duty">Heavy Duty</option>
              <option value="Medium Duty">Medium Duty</option>
              <option value="Light Duty">Light Duty</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No vehicles found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}

export default VehiclesPage

