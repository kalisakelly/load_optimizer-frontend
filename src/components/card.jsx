
const Card = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="w-full" src="https://via.placeholder.com/400x300" alt="Outdoor destination" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Peter Tracker</div>
        <p className="text-gray-700 text-base">
          A unique outdoor destination featuring huge, colourful street murals and sculptures by renowned artists from around the world.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#outdoor</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#art</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#sculptures</span>
      </div>
    </div>
  );
};

export default Card;