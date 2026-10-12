import { useState } from "react";
import { Link } from "react-router-dom";
import Login from './Login'
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Server connection failed. Check backend.");
    }
  };

  return (
    <div className="reg container mt-5">
      <div
        className="register card shadow p-4 mx-auto"
        style={{ maxWidth: "420px" }}
      >
        <h2 className="text-center text-white mb-4">Create Account</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-white">Full Name
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Create Password
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Confaim Password
                <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
          <div><p className="form-footer-text text-white">
                    Return the login <Link to="/">Login here</Link>
                  </p></div>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default Register;