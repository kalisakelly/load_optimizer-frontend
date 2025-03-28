import { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi'; 
import VehicleModal from '../components/VehicleModal';
import LoadItemModal from '../components/LoadItemModal'; 
import {
  fetchVehicles,
  deleteVehicle,
  createVehicle,
  updateVehicle,
  loadItemToVehicle,
} from '../services/vehicleService';
import { fetchProductPackages } from '../services/productService'; // Import the product service
import VehicleCard from '../components/VehicleCard'; 

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [productPackages, setProductPackages] = useState([]); // State to store product packages
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadItemModalOpen, setIsLoadItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehicleData, productData] = await Promise.all([
          fetchVehicles(),
          fetchProductPackages(), // Fetch product packages
        ]);
        setVehicles(vehicleData);
        setProductPackages(productData); // Set the product packages
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load vehicles or product packages. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
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
      capacity: parseFloat(formData.get('capacity')),
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
      capacity: parseFloat(formData.get('capacity')),
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
      quantity: parseFloat(formData.get('quantity')),
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
      <h1 className="text-3xl font-bold mb-6">Vehicle Management</h1>
      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <FiPlusCircle /> Add Vehicle
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
          <p className="ml-4">Loading vehicles...</p>
        </div>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={() => openModal(vehicle)}
              onDelete={() => handleDelete(vehicle.id)}
              onLoadItem={() => openLoadItemModal(vehicle)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500">No vehicles available.</p>
        </div>
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
        productPackages={productPackages} // Pass the product packages to LoadItemModal
      />
    </div>
  );
}

export default VehiclesPage;
