import { useState } from 'react';

const ClientOrder = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    quantity: 0,
    details: '',
    destination: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.item_name || !formData.category || !formData.quantity || !formData.details || !formData.destination) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      // Send a POST request to the API
      const response = await fetch('http://localhost:3000/product-package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Clear the form after successful submission
      handleClear();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleClear = () => {
    setFormData({
      item_name: '',
      category: '',
      quantity: 0,
      details: '',
      destination: '',
    });
  };

  const handleSave = () => {
    // Handle save functionality (if needed)
    console.log('Form Data Saved:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Product Package Form</h1>
      <form onSubmit={handleSubmit} className="container mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg w-25">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="tangible">Tangible</option>
            <option value="intangible">Intangible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex space-x-4 justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientOrder;