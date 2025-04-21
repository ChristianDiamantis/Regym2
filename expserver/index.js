const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ======= ROUTES =======

// Root route
app.get("/", (req, res) => {
  res.send("ReGym backend is live!");
});

// ---- USERS ----
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- LISTINGS ----
app.get("/api/listings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM listings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/listings", async (req, res) => {
  const { title, description, price, condition, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO listings (title, description, price, condition, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, price, condition, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- FAVORITES ----
app.get("/api/favorites", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM favorites");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- RATINGS ----
app.get("/api/ratings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ratings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- FLAGGED LISTINGS ----
app.get("/api/flagged", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM flagged_listings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- ADMIN ROUTES ----
app.get("/api/admin/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
