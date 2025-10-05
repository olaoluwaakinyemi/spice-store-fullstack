import React from "react";

const SpiceCard = ({ spice, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={spice.imageUrl}
        alt={spice.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2">{spice.name}</h2>
      <p className="text-gray-700">${spice.price}</p>
      <p className="text-sm text-gray-600">{spice.description}</p>

      <button
        onClick={() => onAddToCart(spice)}
        className="mt-3 w-full bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SpiceCard;
