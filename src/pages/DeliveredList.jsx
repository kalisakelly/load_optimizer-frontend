import { useEffect, useState } from 'react';

const DeliveredList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('userToken'); // Use 'userToken' for consistency
  const driverId = localStorage.getItem('userId'); // Fetch driver ID from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      if (!driverId) {
        setError('Driver ID not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/vehicle/packaging/driver/${driverId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, driverId]);

  const handleDeliver = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/product-package/${id}/deliver`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.item_name || 'No item'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category || 'No category'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.destination || 'No destination'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.delivered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.delivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {!product.delivered && (
                    <button
                      onClick={() => handleDeliver(product.id)}
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

      {products.length === 0 && <div className="text-center text-gray-600 mt-8">No products found.</div>}
    </div>
  );
};

export default DeliveredList;
