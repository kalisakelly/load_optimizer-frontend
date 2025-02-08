// LandingPage.js
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Streamlined Shipment and<br />
            Delivery Solutions
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            At Load Optimise, we specialize in providing efficient and cost-effective 
            shipment and delivery services tailored to meet your business needs.
          </p>
          <Link 
            to="/signup" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Reliable Deliveries</h3>
            <p className="text-gray-600">
              We understand that timely and secure shipments are crucial for your business success.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Eco-Friendly Solutions</h3>
            <p className="text-gray-600">
              At Load Optimise, we are committed to protecting our planet while delivering exceptional service.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Cost Efficiency</h3>
            <p className="text-gray-600">
              We understand the importance of cost efficiency in your shipping and delivery operations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            Our mission at Load Optimise is to revolutionize the shipment and delivery industry by 
            providing innovative, reliable, and cost-effective logistics solutions around the world.
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Comprehensive Shipment Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add solution cards or icons here */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-2">Road Freight</h3>
              <p className="text-gray-600">Nationwide trucking solutions</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-2">Air Cargo</h3>
              <p className="text-gray-600">Express air delivery services</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-2">Sea Shipping</h3>
              <p className="text-gray-600">International maritime logistics</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold mb-2">Warehousing</h3>
              <p className="text-gray-600">Secure storage solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">See What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white text-gray-800 p-6 rounded-xl">
              <p className="mb-4">"Load Optimise transformed our supply chain operations!"</p>
              <p className="font-bold">- John Smith, CEO</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-xl">
              <p className="mb-4">"The most reliable logistics partner we've worked with."</p>
              <p className="font-bold">- Sarah Johnson, COO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2024 Load Optimise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;