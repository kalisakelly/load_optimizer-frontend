/* eslint-disable react/prop-types */
// LoadItemModal.js


function LoadItemModal({ isOpen, onClose, onSubmit, productPackages }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Load Item to Vehicle</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="itemId" className="block font-medium mb-2">
              Select Item
            </label>
            <select
              id="itemId"
              name="itemId"
              required
              className="block w-full p-2 border rounded"
            >
              <option value="">Select an item</option>
              {productPackages.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              step="0.01"
              required
              className="block w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
