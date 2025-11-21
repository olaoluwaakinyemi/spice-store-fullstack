import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!user) {
      const confirmLogin = window.confirm(
        "You need to be logged in to checkout. Login or register now?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-4"
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
            <p className="text-gray-600 text-lg sm:text-xl mb-4">
              Your cart is empty
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors min-h-[44px]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.qty}
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-2">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors min-h-[44px] flex items-center justify-center space-x-2"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium text-base sm:text-lg min-h-[44px] flex items-center justify-center space-x-2"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Proceed to Checkout</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full mt-3 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
