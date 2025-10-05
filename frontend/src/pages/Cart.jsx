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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>
                {item.name} (x{item.qty})
              </span>
              <span>${item.price * item.qty}</span>
              <button
                className="ml-4 text-red-500"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <hr className="my-4" />
          <p className="font-bold">Total: ${total.toFixed(2)}</p>

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
