import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Auth.css";
import API_BASE_URL from "../config";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("logged", "1");
        sessionStorage.setItem("userId", data.id);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("email", data.email);
        navigate("/");
        window.location.reload();
      } else {
        const err = await res.json();
        setError(err.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="auth-error">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
          <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

