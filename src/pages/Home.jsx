import  { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Table from '../components/table';


// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    width: '400px',
  },
};

const Home = () => {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  const openStockModal = () => setIsStockModalOpen(true);
  const closeStockModal = () => setIsStockModalOpen(false);

  const openVehicleModal = () => setIsVehicleModalOpen(true);
  const closeVehicleModal = () => setIsVehicleModalOpen(false);

  // Handle stock creation
  const handleCreateStock = async (values) => {
    try {
      await axios.post('http://localhost:3000/stock', values, { withCredentials: true });
      alert('Stock created successfully!');
      closeStockModal();
    } catch (error) {
      console.error('Error creating stock:', error.response?.data || error.message);
      alert('Failed to create stock.');
    }
  };

  // Handle vehicle creation
  const handleCreateVehicle = async (values) => {
    try {
      await axios.post('http://localhost:3000/vehicle', values, { withCredentials: true });
      alert('Vehicle created successfully!');
      closeVehicleModal();
    } catch (error) {
      console.error('Error creating vehicle:', error.response?.data || error.message);
      alert('Failed to create vehicle.');
    }
  };

  return (
    <>
      {/* Buttons to open modals */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={openStockModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Stock
        </button>
        <button
          onClick={openVehicleModal}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Create Vehicle
        </button>
      </div>
      <div>
      <h1>Vehicles</h1>
      <Table type="vehicle" />

      <h1>Stocks</h1>
      <Table type="item" />
    </div>

      {/* Table and Form components */}
      {/* <Form /> */}

      {/* Stock Creation Modal */}
      <Modal isOpen={isStockModalOpen} onRequestClose={closeStockModal} style={customStyles}>
        <h2>Create New Stock</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              name: e.target.name.value,
              details: e.target.details.value,
              capacity: parseInt(e.target.capacity.value),
            };
            handleCreateStock(formData);
          }}
        >
          <div className="mb-4">
            <label>Name:</label>
            <input type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label>Details:</label>
            <input type="text" name="details" required />
          </div>
          <div className="mb-4">
            <label>Capacity:</label>
            <input type="number" name="capacity" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Create Stock
          </button>
          <button type="button" onClick={closeStockModal} className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
            Cancel
          </button>
        </form>
      </Modal>

      {/* Vehicle Creation Modal */}
      <Modal isOpen={isVehicleModalOpen} onRequestClose={closeVehicleModal} style={customStyles}>
        <h2>Create New Vehicle</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              name: e.target.name.value,
              description: e.target.description.value,
              capacity: parseInt(e.target.capacity.value),
            };
            handleCreateVehicle(formData);
          }}
        >
          <div className="mb-4">
            <label>Name:</label>
            <input type="text" name="name" required />
          </div>
          <div className="mb-4">
            <label>Description:</label>
            <input type="text" name="description" required />
          </div>
          <div className="mb-4">
            <label>Capacity:</label>
            <input type="number" name="capacity" required />
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Create Vehicle
          </button>
          <button type="button" onClick={closeVehicleModal} className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
            Cancel
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Home;