import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.join(__dirname, "users.json");
const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf8") || "[]");
};
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};
app.post("/api/signup", async (req, res) => {
  const { username, password, role } = req.body;
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
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
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
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
// ✅ User Page
app.get("/userpage.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "userpage.html"));
});


app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));