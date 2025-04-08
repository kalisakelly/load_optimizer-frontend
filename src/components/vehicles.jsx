import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiRefreshCw, FiPlus } from 'react-icons/fi';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: '',
    description: '',
    capacity: '',
    driver: '',
  });
  const [isReloading, setIsReloading] = useState(null);

  // Fetch vehicles and drivers on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesResponse, driversResponse] = await Promise.all([
          fetch('http://localhost:3000/vehicle'),
          fetch('http://localhost:3000/users/by-role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: 'driver' }),
          })
        ]);

        if (!vehiclesResponse.ok || !driversResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const vehiclesData = await vehiclesResponse.json();
        const driversData = await driversResponse.json();
        
        setVehicles(vehiclesData);
        setDrivers(driversData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehicleToSubmit = {
        ...newVehicle,
        driver: parseInt(newVehicle.driver, 10),
        capacity: parseFloat(newVehicle.capacity),
      };

      const response = await fetch('http://localhost:3000/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleToSubmit),
      });

      if (!response.ok) throw new Error('Failed to create vehicle');

      const newVehicleData = await response.json();
      setVehicles((prev) => [...prev, newVehicleData]);
      setIsModalOpen(false);
      setNewVehicle({ name: '', type: '', description: '', capacity: '', driver: '' });
      alert('Vehicle created successfully!');
    } catch (error) {
      console.error('Error creating vehicle:', error);
      alert('Failed to create vehicle');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const vehicleToUpdate = {
        ...currentVehicle,
        driver: parseInt(currentVehicle.driver, 10),
        capacity: parseFloat(currentVehicle.capacity),
      };

      const response = await fetch(`http://localhost:3000/vehicle/${currentVehicle.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleToUpdate),
      });

      if (!response.ok) throw new Error('Failed to update vehicle');

      const updatedVehicle = await response.json();
      setVehicles(vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
      setIsEditModalOpen(false);
      alert('Vehicle updated successfully!');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/vehicle/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete vehicle');

      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      alert('Vehicle deleted successfully!');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  const reloadVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to reload this vehicle?')) return;
    
    setIsReloading(id);
    try {
      const response = await fetch(`http://localhost:3000/vehicle/${id}/reloadVehicle`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to reload vehicle');

      const reloadedVehicle = await response.json();
      setVehicles(vehicles.map(v => v.id === id ? reloadedVehicle : v));
      alert('Vehicle reloaded successfully!');
    } catch (error) {
      console.error('Error reloading vehicle:', error);
      alert('Failed to reload vehicle');
    } finally {
      setIsReloading(null);
    }
  };

  const openEditModal = (vehicle) => {
    setCurrentVehicle({
      ...vehicle,
      driver: vehicle.driver?.id?.toString() || '',
    });
    setIsEditModalOpen(true);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 text-center">
      {error}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus /> Add New Vehicle
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Capacity</th>
              <th className="px-4 py-3 font-medium">Available</th>
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">Updated At</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{vehicle.id}</td>
                <td className="px-4 py-3">{vehicle.name}</td>
                <td className="px-4 py-3">{vehicle.type || 'N/A'}</td>
                <td className="px-4 py-3">{vehicle.description}</td>
                <td className="px-4 py-3">{vehicle.capacity}</td>
                <td className="px-4 py-3">{vehicle.space_available || vehicle.capacity}</td>
                <td className="px-4 py-3">
                  {vehicle.driver ? vehicle.driver.name : 'No driver'}
                </td>
                <td className="px-4 py-3">{new Date(vehicle.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">{new Date(vehicle.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(vehicle)}
                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => reloadVehicle(vehicle.id)}
                      className={`p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded ${
                        isReloading === vehicle.id ? 'animate-spin' : ''
                      }`}
                      title="Reload Vehicle"
                      disabled={isReloading === vehicle.id}
                    >
                      <FiRefreshCw />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Vehicle</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Vehicle Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVehicle.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Type</label>
                <select
                  name="type"
                  value={newVehicle.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Trailer">Trailer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={newVehicle.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity (kg)</label>
                <input
                  type="number"
                  name="capacity"
                  value={newVehicle.capacity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Driver</label>
                <select
                  name="driver"
                  value={newVehicle.driver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {isEditModalOpen && currentVehicle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Vehicle Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentVehicle.name}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Type</label>
                <select
                  name="type"
                  value={currentVehicle.type}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Trailer">Trailer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={currentVehicle.description}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity (kg)</label>
                <input
                  type="number"
                  name="capacity"
                  value={currentVehicle.capacity}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Driver</label>
                <select
                  name="driver"
                  value={currentVehicle.driver}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;