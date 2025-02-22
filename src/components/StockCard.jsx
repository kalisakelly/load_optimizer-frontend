/* eslint-disable react/prop-types */
import { Package } from 'lucide-react';

const StockCard = ({ stock, onClick }) => {
  // Calculate available storage percentage
  const storagePercentage = ((stock.available_stock / stock.capacity) * 100).toFixed(2);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(stock.id)}
      >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{stock.name}</h3>
            <p className="text-gray-600">{stock.details}</p>
          </div>
          <Package className="h-8 w-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Managed By:</span> {stock.managed_by?.username || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-medium">Created:</span> {new Date(stock.createdate).toLocaleDateString()}
          </p>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Available Storage</span>
              <span className="text-sm font-medium">{storagePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Package className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm">
              {stock.available_stock} / {stock.capacity} m³ available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;