import React from "react";

const SpiceCard = ({ spice, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-shadow">
      <div className="relative pb-[75%] mb-3 overflow-hidden rounded bg-gray-100">
        <img
          src={spice.imageUrl}
          alt={spice.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
          {spice.name}
        </h2>

        <p className="text-xl sm:text-2xl font-bold text-orange-600">
          ${spice.price}
        </p>

        <p className="text-sm sm:text-base text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {spice.description}
        </p>

        <button
          onClick={() => onAddToCart(spice)}
          className="mt-3 w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium min-h-[44px] flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SpiceCard;
