import { Box, Clock, Leaf } from "lucide-react"

const testimonials = [
  {
    name: "Peter Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Pier Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Paul Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Rachel Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Leon Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Green Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Grey Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Bus Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
  {
    name: "Samson Tracker",
    image: "/sticker.jpg?height=50&width=50",
    text: "A unique outdoor destination feature huge, colourful street murals and sculptures by renowned artists from around the world...",
  },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Box className="h-8 w-8" />
          <span className="ml-2 text-xl">load planning and optimization system</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Streamlined Shipment and
          <br />
          Delivery Solutions
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          At Load Optimise, we specialise in providing efficient and cost-effective shipment and delivery services
          tailored to meet your business needs.
        </p>
       <a href="/login"> <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium">Get Started</button> </a>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Box className="h-6 w-6 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Reliable Deliveries</h3>
            <p className="text-gray-600 text-sm">
              We understand that timely and secure shipments are crucial for your business success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Clock className="h-6 w-6 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Cost Savings</h3>
            <p className="text-gray-600 text-sm">
              At Load Optimise, we are committed to cost efficiency in your shipping operations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Leaf className="h-6 w-6 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Eco-Friendly Solutions</h3>
            <p className="text-gray-600 text-sm">
              We are committed to protecting our planet while delivering exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-gray-600 text-lg text-center">
            Our mission at Load Optimise is to revolutionise the shipment and delivery industry by providing innovative,
            reliable, and cost-effective logistics solutions around the world...
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Shipment Solutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1635773054018-22c8ad8e0c8b"
              alt="Logs"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
              alt="Tomatoes"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1536593998369-f0d25ed0fb1d"
              alt="Grains"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1587486913049-53fc88980cfc"
              alt="Eggs"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">See what our customer say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <h3 className="font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Let us know how we can help you</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your name</label>
              <input type="text" className="w-full p-3 border rounded-lg" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your email</label>
              <input type="email" className="w-full p-3 border rounded-lg" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Box className="h-6 w-6 mr-2" />
            <span>Load Optimise</span>
          </div>
          <p className="text-sm text-gray-600">© 2024, All rights reserved</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

