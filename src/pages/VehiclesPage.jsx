import { useState, useEffect } from "react";
import VehicleModal from "../components/VehicleModal";
import LoadItemModal from "../components/LoadItemModal";
import VehicleCard from "../components/VehicleCard";
import {
  fetchVehicles,
  deleteVehicle,
  createVehicle,
  updateVehicle,
  loadItemToVehicle,
} from "../services/vehicleService";
import { fetchProductPackages } from "../services/productService";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [productPackages, setProductPackages] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadItemModalOpen, setIsLoadItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehicleData, productData] = await Promise.all([
          fetchVehicles(),
          fetchProductPackages(),
        ]);
        setVehicles(vehicleData);
        setProductPackages(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load vehicles or product packages. Please try again.");
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

  const handleCreateOrUpdate = async (e, isUpdate = false) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vehicleData = {
      name: formData.get("name"),
      description: formData.get("description"),
      capacity: parseFloat(formData.get("capacity")),
    };

    try {
      if (isUpdate) {
        await updateVehicle(currentVehicle.id, vehicleData);
      } else {
        await createVehicle(vehicleData);
      }
      setVehicles(await fetchVehicles());
      closeModal();
    } catch (error) {
      console.error("Failed to save vehicle:", error);
      alert("An error occurred while saving the vehicle.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicles(await fetchVehicles());
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      alert("An error occurred while deleting the vehicle.");
    }
  };

  const handleLoadItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loadItemDto = {
      itemId: formData.get("itemId"),
      quantity: parseFloat(formData.get("quantity")),
    };

    try {
      await loadItemToVehicle(currentVehicle.id, loadItemDto);
      alert("Item loaded successfully!");
      closeLoadItemModal();
    } catch (error) {
      console.error("Failed to load item:", error);
      alert("An error occurred while loading the item.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 ">Loading Progression</h1>
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
        onSubmit={(e) => handleCreateOrUpdate(e, !!currentVehicle)}
        currentVehicle={currentVehicle}
      />
      <LoadItemModal
        isOpen={isLoadItemModalOpen}
        onClose={closeLoadItemModal}
        onSubmit={handleLoadItem}
        productPackages={productPackages}
      />
    </div>
  );
}

export default VehiclesPage;
