
import React from "react";
// import "./UserDetails.css";

function UserDetails() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="user-details-page">
      <div className="user-details-card">
        <div className="user-avatar">👤</div>

        <h2>User Details</h2>
        <p className="user-subtitle">Your account information</p>

        <div className="user-info">
          <p><strong>Name:</strong> {user.name || "Not available"}</p>
          <p><strong>Email:</strong> {user.email || "Not available"}</p>
          <p><strong>Phone:</strong> {user.phone || "Not available"}</p>
          <p><strong>Address:</strong> {user.address || "Not available"}</p>
        </div>

        <button onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
