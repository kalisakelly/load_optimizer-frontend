/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

function PackagingsPage() {
  const [packagings, setPackagings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [productPackages, setProductPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackaging, setCurrentPackaging] = useState(null);
  const [newPackaging, setNewPackaging] = useState({
    vehicleId: '',
    itemId: '',
    quantity: '',
  });

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagingsResponse, vehiclesResponse, packagesResponse] = await Promise.all([
          fetch('http://localhost:3000/packaging/findall'),
          fetch('http://localhost:3000/vehicle'),
          fetch('http://localhost:3000/product-package') // Adjust endpoint as needed
        ]);

        if (!packagingsResponse.ok || !vehiclesResponse.ok || !packagesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [packagingsData, vehiclesData, packagesData] = await Promise.all([
          packagingsResponse.json(),
          vehiclesResponse.json(),
          packagesResponse.json()
        ]);

        setPackagings(packagingsData);
        setVehicles(vehiclesData);
        setProductPackages(packagesData);
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
    setNewPackaging(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const packagingToSubmit = {
        ...newPackaging,
        vehicleId: parseInt(newPackaging.vehicleId),
        itemId: parseInt(newPackaging.itemId),
        quantity: parseFloat(newPackaging.quantity),
      };

      const response = await fetch('http://localhost:3000/packaging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packagingToSubmit),
      });

      if (!response.ok) throw new Error('Failed to create packaging');

      const newPackagingData = await response.json();
      setPackagings(prev => [...prev, newPackagingData]);
      setIsModalOpen(false);
      setNewPackaging({ vehicleId: '', itemId: '', quantity: '' });
      alert('Packaging created successfully!');
    } catch (error) {
      console.error('Error creating packaging:', error);
      alert('Failed to create packaging');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this packaging?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/packaging/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete packaging');

      setPackagings(packagings.filter(p => p.id !== id));
      alert('Packaging deleted successfully!');
    } catch (error) {
      console.error('Error deleting packaging:', error);
      alert('Failed to delete packaging');
    }
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
        <h1 className="text-2xl font-bold">Packaging Management</h1>
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus /> Add New Packaging
        </button> */}
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Product Package</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">Updated At</th>
              {/* <th className="px-4 py-3 font-medium">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packagings.map((packaging) => (
              <tr key={packaging.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{packaging.id}</td>
                <td className="px-4 py-3">
                  {packaging.vehicle?.name || 'No vehicle'}
                </td>
                <td className="px-4 py-3">
                  {packaging.item?.id || 'No package'}
                </td>
                <td className="px-4 py-3">{packaging.quantity}</td>
                <td className="px-4 py-3">
                  {new Date(packaging.createdate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(packaging.updatedate).toLocaleDateString()}
                </td>
                {/* <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentPackaging(packaging);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(packaging.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Packaging Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {currentPackaging ? 'Edit Packaging' : 'Create New Packaging'}
            </h2>
            <form onSubmit={currentPackaging ? handleUpdate : handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Vehicle</label>
                <select
                  name="vehicleId"
                  value={currentPackaging?.vehicle?.id || newPackaging.vehicleId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select vehicle</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Product Package</label>
                <select
                  name="itemId"
                  value={currentPackaging?.item?.id || newPackaging.itemId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select product package</option>
                  {productPackages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={currentPackaging?.quantity || newPackaging.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentPackaging(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {currentPackaging ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackagingsPage;