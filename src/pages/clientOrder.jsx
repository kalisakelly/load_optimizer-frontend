import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const ClientOrder = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    quantity: '',
    details: '',
    destination: '',
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field.trim())) {
      alert('All fields are required.');
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/product-package', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 201) {
        alert('Order submitted successfully!');
        navigate('/product-list');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => setFormData({ item_name: '', category: '', quantity: '', details: '', destination: '' });
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Product Package Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['item_name', 'details', 'destination'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace('_', ' ')}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a category</option>
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
            min="1"
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientOrder;