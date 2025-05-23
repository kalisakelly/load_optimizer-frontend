import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    item_name: '',
    destination: '',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState('guest');

  // Decode token and get role & userId
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (!storedToken) return;

    try {
      const decoded = jwtDecode(storedToken);
      setUserId(decoded.id);
      setUserRole(decoded.role || 'guest');
      setToken(storedToken);
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  // Fetch products based on role
  useEffect(() => {
    if (!token || !userRole) return;

    const fetchProducts = async () => {
      try {
        const url =
          userRole === 'user'
            ? `http://localhost:3000/product-package/mypackages/${userId}`
            : 'http://localhost:3000/product-package';

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token, userId, userRole]);

  // Handle search input
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };

  // Filter logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesName = product.item_name
        ?.toLowerCase()
        .includes(searchQuery.item_name.toLowerCase());
      const matchesDestination = product.destination
        ?.toLowerCase()
        .includes(searchQuery.destination.toLowerCase());
      return matchesName && matchesDestination;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Product List</h1>

      {/* Search Bar */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          name="item_name"
          placeholder="Search by item name"
          value={searchQuery.item_name}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="destination"
          placeholder="Search by destination"
          value={searchQuery.destination}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">{product.id}</h2>
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">{product.item_name}</h2>
            <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="text-gray-700 mb-2"><strong>Details:</strong> {product.details}</p>
            <p className="text-gray-700 mb-2"><strong>Destination:</strong> {product.destination}</p>

            {/* Status Indicators */}
            <div className="flex space-x-4 mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.verified ? 'Verified' : 'Not Verified'}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.completed ? 'Completed' : 'In Progress'}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.delivered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.delivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          No products found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default ProductList;
