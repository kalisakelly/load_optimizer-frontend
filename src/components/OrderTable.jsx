import { useEffect, useState } from 'react';

export default function OrderTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/product-package'); // Replace this with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Assuming data is an array of orders
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-medium">Client Name</th>
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Goods</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Delivery Address</th>
            <th className="px-4 py-3 font-medium">Delivery Date</th>
            <th className="px-4 py-3 font-medium">Special Requirements</th>
            <th className="px-4 py-3 font-medium">Verified</th>
            <th className="px-4 py-3 font-medium">Completed</th>
            <th className="px-4 py-3 font-medium">Delivered</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{order.owner ? order.owner.name : 'null'}</td>
              <td className="px-4 py-3">{order.id}</td>
              <td className="px-4 py-3">{order.category}</td>
              <td className="px-4 py-3">{order.item_name}</td>
              <td className="px-4 py-3">{order.quantity}</td>
              <td className="px-4 py-3">{order.destination}</td>
              <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">{order.details}</td>
              
              {/* Verified Status */}
              <td className="px-4 py-3">
                {order.verified ? (
                  <span className="text-green-500 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </td>

              {/* Completed Status */}
              <td className="px-4 py-3">
                {order.completed ? (
                  <span className="text-green-500 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </td>

              {/* Delivered Status */}
              <td className="px-4 py-3">
                {order.delivered ? (
                  <span className="text-green-500 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
