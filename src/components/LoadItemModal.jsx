/* eslint-disable react/prop-types */
// LoadItemModal.js

function LoadItemModal({ isOpen, onClose, onSubmit, productPackages }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Load Item to Vehicle
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">
              Select Item
            </label>
            <select
              id="itemId"
              name="itemId"
              required
              className="block w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select an item</option>
              {productPackages.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.id}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              step="0.01"
              required
              className="block w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div> */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Load Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoadItemModal;
