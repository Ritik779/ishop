import React from "react";
import { FaTshirt, FaLaptop, FaMobileAlt, FaChair, FaGamepad } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="bg-gray-100 p-4">
      {/* Banner Section */}
      <div className="relative bg-blue-500 text-white rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src="https://via.placeholder.com/1200x400"
          alt="Banner"
          className="w-full h-60 object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to MyShop</h1>
          <p className="text-lg mb-4">Discover the best products at unbeatable prices!</p>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-md shadow hover:bg-yellow-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <CategoryCard icon={<FaTshirt />} label="Clothing" />
          <CategoryCard icon={<FaLaptop />} label="Electronics" />
          <CategoryCard icon={<FaMobileAlt />} label="Mobiles" />
          <CategoryCard icon={<FaChair />} label="Furniture" />
          <CategoryCard icon={<FaGamepad />} label="Gaming" />
        </div>
      </div>

      {/* Product Listing Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductCard
              key={index}
              image="https://via.placeholder.com/200"
              name={`Product ${index + 1}`}
              price={`$${(index + 1) * 20}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center bg-white shadow-md p-4 rounded-md hover:shadow-lg">
    <div className="text-4xl text-blue-500 mb-2">{icon}</div>
    <h3 className="text-lg font-medium text-gray-700">{label}</h3>
  </div>
);

const ProductCard = ({ image, name, price }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg">
    <img src={image} alt={name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
      <p className="text-blue-500 font-semibold mb-2">{price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-400">
        Add to Cart
      </button>
    </div>
  </div>
);

export {CategoryCard,ProductCard}

export default HomePage;
