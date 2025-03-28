import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/request-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        navigate("/reset-password")
        
      } else {
        setError(result.message);
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 p-5">
      <form className="bg-white p-8 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Request Password Reset</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">
          Request Reset
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default RequestPasswordReset;