import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const Cart = () => {
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    condition: "",
    description: ""
  });

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE_URL}/api/cart?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, ...form })
      });
      if (res.ok) {
        alert("Cart submitted!");
        setForm({ title: "", price: "", condition: "", description: "" });
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" />
        <input name="condition" value={form.condition} onChange={handleChange} placeholder="Condition" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.title || item.description || JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
