import Check from '../page/Check'
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/product" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="card p-3 mb-3"
            >
              <div className="d-flex justify-content-between align-items-center gap-3">
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-1">Price: ₹{item.price}</p>
                  <p className="mb-0">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h4>Total: ₹{total}</h4>
        <Link to="/check" className="btn btn-success mt-2">
  Proceed to Checkout
</Link>
        </>
      )}
    </div>
  );
}

export default Cart;