import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import Register from "./Register";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
      navigate("/product")
    } catch (error) {
      setMessage("Server connection failed. Check backend.");
    }
  };

  return (
    <div className="login-container">
      <div className=" log card shadow p-4 mx-auto" style={{ maxWidth: "420px" }}>
        <img src="/assets/bg.jpg" alt="" />
        <h2 className="text-center text-white mb-4">Welcome Back!</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-white">Email
                <span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password
                <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div> <p className="form-footer-text text-white">
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p></div>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default Login;