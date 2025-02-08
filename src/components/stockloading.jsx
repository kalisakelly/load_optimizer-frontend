import  { useState, useEffect } from 'react';
import axios from 'axios';

const StockDetails = () => {
  const [stocks, setStocks] = useState([]); // List of all stocks
  const [selectedStockId, setSelectedStockId] = useState(null); // Selected stock ID
  const [itemId, setItemId] = useState(''); // Item ID for adding
  const [quantity, setQuantity] = useState(''); // Quantity for adding
  const [vehicles, setVehicles] = useState([]); // List of vehicles
  const [selectedVehicleId, setSelectedVehicleId] = useState(null); // Selected vehicle ID
  const [loadItemId, setLoadItemId] = useState(''); // Item ID for loading into a vehicle
  const [loadQuantity, setLoadQuantity] = useState(''); // Quantity for loading into a vehicle

  // Fetch all stocks on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stock', {
          withCredentials: true,
        });
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error.response?.data || error.message);
      }
    };
    fetchStocks();
  }, []);

  // Fetch all vehicles on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vehicle', {
          withCredentials: true,
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error.response?.data || error.message);
      }
    };
    fetchVehicles();
  }, []);

  // Add item to selected stock
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedStockId || !itemId || !quantity) {
      alert('Please select a stock, item ID, and quantity.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/stock/${selectedStockId}/entries`, {
        itemId: parseInt(itemId),
        quantity: parseInt(quantity),
      }, {
        withCredentials: true,
      });
      alert('Item added successfully!');
      setItemId('');
      setQuantity('');
      // Refresh stocks
      const response = await axios.get('http://localhost:3000/stock', {
        withCredentials: true,
      });
      setStocks(response.data);
    } catch (error) {
      console.error('Error adding item:', error.response?.data || error.message);
      alert('Failed to add item.');
    }
  };

  // Load item into selected vehicle
  const handleLoadItem = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !loadItemId || !loadQuantity) {
      alert('Please select a vehicle, item ID, and quantity.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/packaging/load/${selectedVehicleId}`, {
        stockId: selectedStockId,
        itemId: parseInt(loadItemId),
        quantity: parseInt(loadQuantity),
      }, {
        withCredentials: true,
      });
      alert('Item loaded into vehicle successfully!');
      setLoadItemId('');
      setLoadQuantity('');
    } catch (error) {
      console.error('Error loading item into vehicle:', error.response?.data || error.message);
      alert('Failed to load item into vehicle.');
    }
  };

  // Calculate used capacity percentage for a stock
  const calculateUsedCapacityPercentage = (stock) => {
    if (!stock.available_stock || !stock.capacity) return 0;
    return ((stock.available_stock / stock.capacity) * 100).toFixed(2);
  };

  return (
    <div className="p-4">
      {/* Stocks List */}
      <h2>All Stocks</h2>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Stock Name</th>
            <th className="p-2 border">Capacity Used (%)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} className="hover:bg-gray-50">
              <td className="p-2 border">{stock.name}</td>
              <td className="p-2 border">{calculateUsedCapacityPercentage(stock)}%</td>
              <td className="p-2 border">
                <button
                  onClick={() => setSelectedStockId(stock.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Item Form */}
      {selectedStockId && (
        <form onSubmit={handleAddItem} className="mt-4">
          <h3>Add Item to Stock</h3>
          <div className="mb-2">
            <label>Item ID:</label>
            <input
              type="number"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="border p-1 ml-2"
            />
          </div>
          <div className="mb-2">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-1 ml-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add Item
          </button>
        </form>
      )}

      {/* Vehicles List */}
      <h2>Vehicles</h2>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Vehicle Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="p-2 border">{vehicle.name}</td>
              <td className="p-2 border">
                <button
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load Item Form */}
      {selectedVehicleId && selectedStockId && (
        <form onSubmit={handleLoadItem} className="mt-4">
          <h3>Load Item into Vehicle</h3>
          <div className="mb-2">
            <label>Item ID:</label>
            <input
              type="number"
              value={loadItemId}
              onChange={(e) => setLoadItemId(e.target.value)}
              className="border p-1 ml-2"
            />
          </div>
          <div className="mb-2">
            <label>Quantity:</label>
            <input
              type="number"
              value={loadQuantity}
              onChange={(e) => setLoadQuantity(e.target.value)}
              className="border p-1 ml-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Load Item
          </button>
        </form>
      )}
    </div>
  );
};

export default StockDetails;