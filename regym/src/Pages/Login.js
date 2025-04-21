import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Auth.css";
import API_BASE_URL from "../config";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      const users = await res.json();

      const match = users.find(
        (u) => u.username === form.username && u.password === form.password
      );

      if (match) {
        const isAdmin = form.username === "Admin" && form.password === "123";

        sessionStorage.setItem("logged", "1");
        sessionStorage.setItem("userId", match.id);
        sessionStorage.setItem("username", match.username);
        sessionStorage.setItem("email", match.email);
        sessionStorage.setItem("isAdmin", isAdmin ? "1" : "0");

        navigate(isAdmin ? "/admin" : "/dashboard");
        window.location.reload();
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <p className="auth-switch">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
