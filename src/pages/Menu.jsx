import { useState } from "react";
import { menu } from "../constant/menu";

const Menu = () => {
  const [category, setCategory] = useState("FOOD");

  const filterdCategory = menu.filter(
    (item) => item.category.toLocaleUpperCase() === category
  );
  const filterdItems = filterdCategory[0];

  const categories = ["FOOD", "DRINKS", "DESSERTS"];

  return (
    <div className="">
      {/* Tabs buttons */}
      <div className="flex items-center border w-fit mt-5 ml-5">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 text-2xl tracking-wide py-4 border-collapse cursor-pointer border transition-colors ${
              category === item ? "bg-black text-white" : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#111] min-h-screen">
        {filterdItems?.items?.map((item, index) => (
          <div
            key={index}
            className="border border-[#333] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a] text-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="text-gray-400 text-sm mt-2">{item.description}</p>
              <div className="mt-3 text-lg font-bold text-white">
                ${item.price}
              </div>

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
        ))}
      </div>
    </div>
  );
};

export default Menu;
