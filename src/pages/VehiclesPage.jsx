import { useState, useEffect } from 'react';
import VehicleModal from '../components/VehicleModal';
import { fetchVehicles, deleteVehicle } from '../services/vehicleService';

function VehiclesPage() {
    const [vehicles, setVehicles] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleCreate = async (formData) => {
      try {
          await createVehicle(formData);
          const data = await fetchVehicles();
          setVehicles(data);
          closeModal();
      } catch (error) {
          console.error('Failed to create vehicle:', error);
          alert('An error occurred while creating the vehicle.');
      }
  };
  
  const handleUpdate = async (formData) => {
      try {
          await updateVehicle(currentVehicle.id, formData);
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
                            <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                            <p className="text-gray-600">{vehicle.type}</p>
                            <p className="text-sm">
                                <span className="font-medium">License Plate:</span> {vehicle.licensePlate}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Driver:</span> {vehicle.driver}
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
        </div>
    );
}

export default VehiclesPage;