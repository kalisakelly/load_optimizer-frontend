import { useEffect, useState } from 'react';

const DeliveredList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the token from localStorage (assuming the token is saved after login)
  const token = localStorage.getItem('token');

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImRyaXZlciIsImlhdCI6MTc0MzIwMzkzMywiZXhwIjoxNzQzMjA3NTMzfQ.1qyWqXgBRUWjUSk4OzMxOxC-tVskQcuaKLFAhLFjSTw"

  // Fetch packaging assigned to the driver using the driver's ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/vehicle/packaging/driver/{driverId}', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header for authentication
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Handle product delivery (verify the delivery)
  const handleDeliver = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/product-package/${id}/deliver`, {
        method: 'PATCH',
        
      });

      if (!response.ok) {
        throw new Error('Failed to deliver product');
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, delivered: true } : product
        )
      );

      console.log(`Product ${id} delivered successfully`);
    } catch (error) {
      console.error('Error verifying product:', error);
      alert('Failed to verify product. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Product Verification</h1>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deliver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.item ? product.item.item_name : 'No item'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.item ? product.item.category : 'No category'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.item.destination || 'No destination'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.item.delivered
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.item.delivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {!product.item.delivered && (
                    <button
                      onClick={() => handleDeliver(product.item.id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Products Message */}
      {products.length === 0 && (
        <div className="text-center text-gray-600 mt-8">No products found.</div>
      )}
    </div>
  );
};

export default DeliveredList;
