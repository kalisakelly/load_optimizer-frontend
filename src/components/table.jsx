import  { useState, useEffect } from 'react';
import axios from 'axios';

const Table = ({ type }) => {
  const [data, setData] = useState([]); // Stores the fetched data
  const [searchTerm, setSearchTerm] = useState(''); // For filtering data
  const [loading, setLoading] = useState(true); // Loading state

  // Define API endpoints based on the type (vehicle or stock)
  const endpoints = {
    vehicle: {
      findAll: '/vehicle',
      findOne: '/vehicle/',
      update: '/vehicle/',
      delete: '/vehicle/',
    },
    stock: {
      findAll: '/stock',
      findOne: '/stock/',
      update: '/stock/',
      delete: '/stock/',
    },
  };

  const apiEndpoints = endpoints[type];

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000${apiEndpoints.findAll}`, {
          withCredentials: true,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [apiEndpoints]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`http://localhost:3000${apiEndpoints.delete}${id}`, {
        withCredentials: true,
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response?.data || error.message);
    }
  };

  // Handle Update
  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000${apiEndpoints.findOne}${id}`, {
        withCredentials: true,
      });
      const updatedData = prompt('Enter updated details (JSON)', JSON.stringify(response.data));
      if (!updatedData) return;

      const parsedData = JSON.parse(updatedData);
      await axios.patch(`http://localhost:3000${apiEndpoints.update}${id}`, parsedData, {
        withCredentials: true,
      });

      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...parsedData } : item))
      );
    } catch (error) {
      console.error('Error updating item:', error.response?.data || error.message);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder={`Search ${type}s...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key} className="p-2 border">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {Object.values(item).map((value, index) => (
                    <td key={index} className="p-2 border">
                      {value}
                    </td>
                  ))}
                  <td className="p-2 border">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="mr-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0] || {}).length + 1} className="p-2 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;