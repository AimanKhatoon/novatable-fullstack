const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "nova",
  password: process.env.DB_PASSWORD || "novapassword",
  database: process.env.DB_NAME || "novatable",
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected", service: "novatable-api" });
  } catch (error) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.get("/api/menu", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, description, category, price, badge FROM menu_items ORDER BY id"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Unable to load menu." });
  }
});

app.get("/api/reservations", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, guest_name, email, reservation_date, reservation_time, guests, note, created_at FROM reservations ORDER BY reservation_date, reservation_time"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Unable to load reservations." });
  }
});

app.post("/api/reservations", async (req, res) => {
  const { name, email, date, time, guests, note } = req.body;

  if (!name || !email || !date || !time || !guests) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  if (Number(guests) < 1 || Number(guests) > 20) {
    return res.status(400).json({ error: "Guests must be between 1 and 20." });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO reservations
       (guest_name, email, reservation_date, reservation_time, guests, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, date, time, Number(guests), note || null]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Reservation request received."
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to save reservation." });
  }
});

app.listen(PORT, () => {
  console.log(`NOVA TABLE API running on port ${PORT}`);
});
