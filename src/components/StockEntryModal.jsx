/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchItems, addStockEntry } from '../services/stockService';

const StockEntryModal = ({ isOpen, onClose, onSubmit, stockId }) => {
    console.log('StockEntryModal - stockId:', stockId); // Debug stockId
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [quantity, setQuantity] = useState('');
  
    // Fetch items when the modal opens
    useEffect(() => {
      if (isOpen) {
        const loadItems = async () => {
          try {
            const data = await fetchItems();
            setItems(data);
          } catch (error) {
            console.error('Failed to fetch items:', error);
            alert('An error occurred while fetching items.');
          }
        };
        loadItems();
      }
    }, [isOpen]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submitting entry with stockId:', stockId); // Debug stockId
      console.log('Selected itemId:', selectedItemId); // Debug itemId
      console.log('Quantity:', quantity); // Debug quantity
      try {
        await onSubmit(stockId, parseInt(selectedItemId, 10), parseInt(quantity, 10));
        onClose();
      } catch (error) {
        alert('Failed to add stock entry. Please try again.');
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add Stock Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Item</label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="" disabled>Select an item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default StockEntryModal;