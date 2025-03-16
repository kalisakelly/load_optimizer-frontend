import { useState, useEffect } from 'react';
import VehicleModal from '../components/VehicleModal';
import LoadItemModal from '../components/LoadItemModal'; // New modal for loading items
import {
  fetchVehicles,
  deleteVehicle,
  createVehicle,
  updateVehicle,
  loadItemToVehicle,
} from '../services/vehicleService';

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadItemModalOpen, setIsLoadItemModalOpen] = useState(false); // State for load item modal
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        alert('Failed to load vehicles. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadVehicles();
  }, []);

  const openModal = (vehicle = null) => {
    setCurrentVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVehicle(null);
    setIsModalOpen(false);
  };

  const openLoadItemModal = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsLoadItemModalOpen(true);
  };

  const closeLoadItemModal = () => {
    setCurrentVehicle(null);
    setIsLoadItemModalOpen(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newVehicle = {
      name: formData.get('name'),
      description: formData.get('description'),
      capacity: parseFloat(formData.get('capacity')), // Ensure capacity is a number
    };

    try {
      await createVehicle(newVehicle);
      const data = await fetchVehicles();
      setVehicles(data);
      closeModal();
    } catch (error) {
      console.error('Failed to create vehicle:', error);
      alert('An error occurred while creating the vehicle.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedVehicle = {
      name: formData.get('name'),
      description: formData.get('description'),
      capacity: parseFloat(formData.get('capacity')), // Ensure capacity is a number
    };

    try {
      await updateVehicle(currentVehicle.id, updatedVehicle);
      const data = await fetchVehicles();
      setVehicles(data);
      closeModal();
    } catch (error) {
      console.error('Failed to update vehicle:', error);
      alert('An error occurred while updating the vehicle.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      const data = await fetchVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      alert('An error occurred while deleting the vehicle.');
    }
  };

  const handleLoadItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loadItemDto = {
      itemId: formData.get('itemId'),
      quantity: parseFloat(formData.get('quantity')), // Ensure quantity is a number
    };

    try {
      await loadItemToVehicle(currentVehicle.id, loadItemDto);

      alert('Item loaded successfully!');
      closeLoadItemModal();
    } catch (error) {
      console.error('Failed to load item:', error);
      alert('An error occurred while loading the item.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Management</h1>
      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Vehicle
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex">
                <label className="text-xl font-semibold">Vehicle Id:</label>
                <h3 className="text-xl font-semibold ml-2">{vehicle.id}</h3>
              </div>
              <div className="flex">
                <label className="text-xl font-semibold">Vehicle Name:</label>
                <h3 className="text-xl font-semibold ml-2">{vehicle.name}</h3>
              </div>
              <p className="text-gray-600">{vehicle.description}</p>
              <p className="text-sm">
                <span className="font-medium">Capacity:</span> {vehicle.capacity}
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => openModal(vehicle)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => openLoadItemModal(vehicle)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Load Item
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No vehicles available</p>
      )}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentVehicle ? handleUpdate : handleCreate}
        currentVehicle={currentVehicle}
      />
      <LoadItemModal
        isOpen={isLoadItemModalOpen}
        onClose={closeLoadItemModal}
        onSubmit={handleLoadItem}
      />
    </div>
  );
}

export default VehiclesPage;