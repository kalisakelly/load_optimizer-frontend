import { useState, useEffect } from 'react';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]); // State to store fetched drivers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: '',
    description: '',
    capacity: '',
    driver: '', // This will store the selected driver's ID
  });

  // Fetch vehicles on load
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:3000/vehicle');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Failed to load vehicles. Please try again later.');
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Fetch drivers on modal open
  useEffect(() => {
    if (isModalOpen) {
      const fetchDrivers = async () => {
        try {
          const response = await fetch('http://localhost:3000/users/by-role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: 'driver' }), // Request drivers by role
          });

          if (!response.ok) {
            throw new Error('Failed to fetch drivers');
          }

          const data = await response.json();
          setDrivers(data.data); // Store the fetched drivers in state
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      };

      fetchDrivers();
    }
  }, [isModalOpen]);

  // Handle form input changes for the new vehicle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for creating a new vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert driver ID to an integer before sending it to the backend
      const vehicleToSubmit = {
        ...newVehicle,
        driver: parseInt(newVehicle.driver, 10), // Convert driver ID to an integer
      };
  
      const response = await fetch('http://localhost:3000/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleToSubmit),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create vehicle');
      }
  
      const newVehicleData = await response.json();
      setVehicles((prev) => [...prev, newVehicleData]); // Update vehicle list with the new vehicle
      setIsModalOpen(false); // Close the modal after submission
      setNewVehicle({ name: '', type: '', description: '', capacity: '', driver: '' }); // Reset form
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Button to open modal */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add New
        </button>
      </div>

      {/* Table to display vehicles */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium">Vehicle ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Capacity</th>
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">Updated At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{vehicle.id}</td>
                <td className="px-4 py-3">{vehicle.name}</td>
                <td className="px-4 py-3">{vehicle.type ? vehicle.type : 'null'}</td>
                <td className="px-4 py-3">{vehicle.description}</td>
                <td className="px-4 py-3">{vehicle.capacity}</td>
                <td className="px-4 py-3">
                  {vehicle.driver ? vehicle.driver.name : 'No driver assigned'}
                </td>
                <td className="px-4 py-3">{new Date(vehicle.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">{new Date(vehicle.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for creating a new vehicle */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="lorry">Lorry</option>
                  <option value="cargo">Cargo</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={newVehicle.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity</label>
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
                <label className="block text-sm font-medium text-gray-700">Driver</label>
                <select
                  name="driver"
                  value={newVehicle.driver}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="" disabled>Select a driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Submit
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
