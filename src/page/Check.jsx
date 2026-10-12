import { useState } from "react";
function Checkout({ cart }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
console.log("check the cart",cart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("cart data:",cart);
  console.log("cart length:",cart?.length);
  setMessage("");
  if (!Array.isArray(cart)|| cart.length===0) {
    setMessage("Your cart is empty!");
    return;
  }
  try {
    const response = await fetch(
      "http://localhost:5000/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          customerName: name,
          phone,
          address,
          items: cart.map((item) => ({
            _id: item._id,
            quantity: item.quantity,
          })),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Order failed");
      return;
    }

    setMessage("Order placed successfully!");

    console.log("Saved order:", data.order);
  } catch (error) {
    setMessage("Server connection failed. Check backend.");
    console.error(error);
  }
};

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Checkout</h2>

        <p>
          <strong>Order Total:</strong> ₹{total}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              placeholder="Enter the full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Delivery Address
                <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              placeholder="Enter the current address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Place Order
          </button>
        </form>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default Checkout;