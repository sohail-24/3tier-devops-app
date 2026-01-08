// ===============================
// IMPORTS
// ===============================
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const sequelize = require("./db");
const User = require("./models/User");

// ===============================
// APP SETUP
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey"; // later move to env variable

// ===============================
// SIGNUP API
// ===============================
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    await User.create({ username, password });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

// ===============================
// LOGIN API (DB BASED)
// ===============================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// ===============================
// AUTH MIDDLEWARE
// ===============================
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ===============================
// HEALTH CHECK (PROTECTED)
// ===============================
app.get("/api/health", auth, (req, res) => {
  res.json({ message: "Backend is running fine" });
});

// ===============================
// SERVER CONFIG
// ===============================
const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0";

// ===============================
// DB INIT + SERVER START
// ===============================
sequelize.sync()
  .then(() => console.log("DB synced"))
  .catch(err => console.error("Sync error:", err));


app.listen(PORT, HOST, () => {
  console.log(`✅ Backend running on http://${HOST}:${PORT}`);
});

