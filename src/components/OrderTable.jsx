const orders = [
    {
      clientName: "ABC Retail",
      orderId: "1001",
      goods: "Electronics",
      quantity: "200 units",
      deliveryAddress: "123 Main St, City A",
      deliveryDate: "2024-09-20",
      specialRequirements: "Handle with care, Fragile",
      orderStatus: "Ready for Dispatch",
    },
    {
      clientName: "XYZ Logistics",
      orderId: "1002",
      goods: "Industrial Machinery",
      quantity: "10 units",
      deliveryAddress: "789 Industrial Ave, City B",
      deliveryDate: "2024-09-21",
      specialRequirements: "Requires crane for unloading",
      orderStatus: "In Transit",
    },
    {
      clientName: "Global Textiles",
      orderId: "1003",
      goods: "Fabric Rolls",
      quantity: "50 rolls",
      deliveryAddress: "456 Textile Ln, City C",
      deliveryDate: "2024-09-22",
      specialRequirements: "Avoid moisture",
      orderStatus: "Awaiting Pickup",
    },
    {
      clientName: "Fresh Produce Co",
      orderId: "1004",
      goods: "Fresh Vegetables",
      quantity: "100 crates",
      deliveryAddress: "321 Market St, City D",
      deliveryDate: "2024-09-19",
      specialRequirements: "Temperature-controlled transport",
      orderStatus: "Delivered",
    },
    {
      clientName: "Alpha Furniture",
      orderId: "1005",
      goods: "Office Chairs",
      quantity: "150 chairs",
      deliveryAddress: "654 Office Rd, City E",
      deliveryDate: "2024-09-25",
      specialRequirements: "Special packaging for each chair",
      orderStatus: "Processing",
    },
  ]
  
  export default function OrderTable() {
    return (
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium">Client Name</th>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Goods</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Delivery Address</th>
              <th className="px-4 py-3 font-medium">Delivery Date</th>
              <th className="px-4 py-3 font-medium">Special Requirements</th>
              <th className="px-4 py-3 font-medium">Order Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-4 py-3">{order.clientName}</td>
                <td className="px-4 py-3">{order.orderId}</td>
                <td className="px-4 py-3">{order.goods}</td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className="px-4 py-3">{order.deliveryAddress}</td>
                <td className="px-4 py-3">{order.deliveryDate}</td>
                <td className="px-4 py-3">{order.specialRequirements}</td>
                <td className="px-4 py-3">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  