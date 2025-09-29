import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

// Vercel will automatically load environment variables for you.
// You'll get these from your database provider (e.g., Vercel Postgres).
// const db = createPool({ connectionString: process.env.POSTGRES_URL });

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret_key";

app.use(cors());
app.use(bodyParser.json());

// ❌ DELETED: All fs, path, __filename, and __dirname logic is gone.
// It's the cause of the crash and won't work on Vercel.

// ✅ MOVED: Your HTML files (dashboard.html, userpage.html) should be
// in a "public" folder at the root of your project. Vercel will serve
// them automatically. This is more efficient.
// app.use(express.static("public")); // This line can be removed if vercel.json is configured.

app.post("/api/signup", async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // --- DATABASE LOGIC ---
        // 1. Check if user already exists in your database
        // const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        // if (existingUser.rows.length > 0) {
        //   return res.status(400).json({ message: "User already exists" });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Insert the new user into the database
        // await db.query(
        //   'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
        //   [username, hashedPassword, role]
        // );

        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // --- DATABASE LOGIC ---
        // 1. Find the user in the database
        // const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        // const user = result.rows[0];
        // if (!user) return res.status(400).json({ message: "Invalid username" });

        // For demonstration, let's assume you fetched a user object.
        // In a real app, the following lines would use the 'user' from the DB.
        const user = { id: 1, username: 'testuser', password: 'hashed_password_from_db', role: 'user'}; // Mock user

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, message: "Login successful", role: user.role });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// ❌ DELETED: The app.get routes for HTML files are removed.
// Vercel serves files from the "public" directory automatically.

// ❌ DELETED: app.listen() is not needed for Vercel.
// Vercel handles the server lifecycle.

// ✅ ADDED: Export the Express app for Vercel to use.
export default app;
