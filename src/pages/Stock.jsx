import { useState, useEffect } from 'react';
import StockCard from '../components/StockCard';
import StockModal from '../components/StockModal';
import StockEntryModal from '../components/StockEntryModal';
import {
  fetchStocks,
  fetchStockDetails,
  addStockEntry,
  createStock,
  updateStock,
} from '../services/stockService';

function Stock() {
  const [stocks, setStocks] = useState([]);
  const [currentStock, setCurrentStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all stocks on component mount
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        alert('Failed to load stocks. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadStocks();
  }, []);

  // Open modal for adding/editing stock
  const openModal = (item = null) => {
    setCurrentStock(item);
    setIsModalOpen(true);
  };

  // Close modal for adding/editing stock
  const closeModal = () => {
    setCurrentStock(null);
    setIsModalOpen(false);
  };

  // Open modal for adding stock entry
  const openEntryModal = (stockId) => {
    setSelectedStockId(stockId);
    setIsEntryModalOpen(true);
  };

  // Close modal for adding stock entry
  const closeEntryModal = () => {
    setSelectedStockId(null);
    setIsEntryModalOpen(false);
  };

  // Handle form submission for adding/editing stock
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get('name'),
      details: formData.get('details'),
      capacity: parseFloat(formData.get('capacity')), // Ensure capacity is a number
    };

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('Please log in to perform this action.');
        return;
      }

      if (currentStock) {
        await updateStock(currentStock.id, newItem, token);
      } else {
        await createStock(newItem, token);
      }

      // Refresh stocks after successful operation
      const data = await fetchStocks();
      setStocks(data);
      closeModal();
    } catch (error) {
      console.error('Failed to save stock:', error);
      alert('An error occurred while saving the stock.');
    }
  };

  // Handle adding a new stock entry
  const handleAddEntry = async (stockId, itemId, quantity) => {
    try {
      await addStockEntry(stockId, itemId, quantity);

      // Refresh stock details after adding entry
      const details = await fetchStockDetails(stockId);
      setStockDetails(details);
      closeEntryModal();
    } catch (error) {
      console.error('Failed to add stock entry:', error);
      alert('An error occurred while adding the stock entry.');
    }
  };

  // Handle clicking on a stock card to show details
  const handleStockClick = async (stockId) => {
    try {
      const details = await fetchStockDetails(stockId);
      setStockDetails(details);
    } catch (error) {
      console.error('Failed to fetch stock details:', error);
      alert('An error occurred while fetching stock details.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stock Details</h1>
      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Stock
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : stocks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              onClick={() => handleStockClick(stock.id)}
            />
          ))}
        </div>
      ) : (
        <p>No stocks available</p>
      )}
      {stockDetails && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Stock Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {stockDetails.stockName}</p>
            <p><span className="font-medium">Capacity:</span> {stockDetails.capacity}</p>
            <p><span className="font-medium">Available Stock:</span> {stockDetails.availableStock}</p>
          </div>
          <h3 className="text-lg font-bold mt-4">Items in Stock</h3>
          <ul className="space-y-2">
            {stockDetails.items?.map((entry, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg">
                <p><span className="font-medium">Item:</span> {entry.itemName}</p>
                <p><span className="font-medium">Quantity:</span> {entry.quantity}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => openEntryModal(stockDetails.stockId)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Entry
          </button>
        </div>
      )}
      <StockModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        currentStock={currentStock}
      />
      <StockEntryModal
        isOpen={isEntryModalOpen}
        onClose={closeEntryModal}
        onSubmit={handleAddEntry}
        stockId={selectedStockId}
      />
    </div>
  );
}

export default Stock;