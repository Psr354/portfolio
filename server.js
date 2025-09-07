import express from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, "public")));

// Koneksi Database (pakai pool biar stabil di Railway)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API untuk simpan pesan
app.post("/api/message", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  const sql =
    "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, subject, message], (err) => {
    if (err) {
      console.error("Error saving message:", err);
      return res.status(500).json({ error: "Gagal menyimpan pesan" });
    }
    res.json({
      success: true,
      message: "Pesan berhasil dikirim, ditunggu balasannya ya!",
    });
  });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
