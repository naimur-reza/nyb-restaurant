const ItemCard = (item) => {
  return (
    <div className="border border-[#333] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a] text-white">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{item.title}</h2>
        <p className="text-gray-400 text-sm mt-2">{item.description}</p>
        <div className="mt-3 text-lg font-bold text-white">${item.price}</div>

        {item.vegetarian !== undefined && (
          <div
            className={`mt-2 text-sm font-medium ${
              item.vegetarian ? "text-green-400" : "text-red-400"
            }`}
          >
            {item.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
          </div>
        )}

        {item.caffeine !== undefined && (
          <div
            className={`mt-2 text-sm font-medium ${
              item.caffeine ? "text-yellow-400" : "text-blue-400"
            }`}
          >
            {item.caffeine ? "Contains Caffeine" : "Caffeine Free"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
