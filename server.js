import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import mongoose from "mongoose";



import dotenv from "dotenv";
dotenv.config();


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_secret_key"; // ⚠️ Replace with env var in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Path to users.json
const usersFile = path.join(__dirname, "users.json");

// Helper functions for user storage
const readUsers = () => {
  try {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users.json:", err);
  }
};

// ✅ SIGNUP Route
app.post("/api/signup", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = readUsers();
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword, role };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: "Signup successful" });
});

// ✅ LOGIN Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Both fields required" });

  const users = readUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, message: "Login successful", role: user.role });
});

// ✅ Admin Dashboard page
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ✅ User page
app.get("/userpage.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "userpage.html"));
});

// ✅ Default route (Home)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Export app for Vercel
export default app;

// ✅ For local run
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
}


mongoose.connect("mongodb+srv://pathakmahak64_db_user:KG9x5xSyqXs5WPfr@cluster0.lr4dizd.mongodb.net/kmrl?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
