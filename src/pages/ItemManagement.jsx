"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";

const ItemManagementPage = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Fetch items from the backend on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch items with JWT token
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:3000/item", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
      setItems(response.data); // Assuming the backend returns an array of items
    } catch (error) {
      console.error("Failed to fetch items:", error.response?.data || error.message);
      alert("Failed to fetch items. Please check your connection or log in again.");
    }
  };

  const openModal = (item = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  // Function to handle item creation or update with JWT token
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get("name"),
    };

    try {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      let response;
      if (currentItem) {
        // Update item
        response = await axios.patch(
          `http://localhost:3000/item/${currentItem.id}`,
          newItem,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            },
          }
        );
      } else {
        // Create item
        response = await axios.post("http://localhost:3000/item", newItem, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
      }

      // Refresh items after successful operation
      await fetchItems();
      closeModal();
    } catch (error) {
      console.error("Failed to save item:", error.response?.data || error.message);
      alert("An error occurred while saving the item.");
    }
  };

  const openDeleteConfirm = (item) => {
    setCurrentItem(item);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setCurrentItem(null);
    setIsDeleteConfirmOpen(false);
  };

  // Function to handle item deletion with JWT token
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:3000/item/${currentItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      // Refresh items after deletion
      await fetchItems();
      closeDeleteConfirm();
    } catch (error) {
      console.error("Failed to delete item:", error.response?.data || error.message);
      alert("An error occurred while deleting the item.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Item Management</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Item
          </button>
        </div>
        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => openDeleteConfirm(item)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{currentItem ? "Edit Item" : "Create New Item"}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={currentItem?.name}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {currentItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemManagementPage;