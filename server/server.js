
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Create or open the database file
const db = new Database(path.join(__dirname, "college.db"));

db.pragma("foreign_keys = ON");

// Create database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    department TEXT NOT NULL,
    semester TEXT NOT NULL,
    email TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS faculty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    faculty_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    duration TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    attendance_date TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent')),
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE(student_id, subject, attendance_date)
  );

  CREATE TABLE IF NOT EXISTS marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    internal_marks INTEGER NOT NULL CHECK(internal_marks BETWEEN 0 AND 25),
    external_marks INTEGER NOT NULL CHECK(external_marks BETWEEN 0 AND 75),
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE(student_id, subject)
  );
`);

// Test endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Engineering College backend is running!",
    database: "connected",
  });
});
// Save an admission enquiry to the database
app.post("/api/admissions", (req, res) => {
  const { fullName, email, phone, course, message = "" } = req.body;

  if (
    !fullName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !course?.trim()
  ) {
    return res.status(400).json({
      message: "Please provide your name, email, phone and course.",
    });
  }

  try {
    const statement = db.prepare(`
      INSERT INTO admissions
        (full_name, email, phone, course, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      fullName.trim(),
      email.trim(),
      phone.trim(),
      course.trim(),
      typeof message === "string" ? message.trim() : ""
    );

    res.status(201).json({
      message: "Admission enquiry saved successfully!",
      applicationId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Admission database error:", error);

    res.status(500).json({
      message: "Unable to save the enquiry. Please try again.",
    });
  }
});

app.get("/api/admissions", (req, res) => {
  try {
    const applications = db.prepare(`
      SELECT
        id,
        full_name AS fullName,
        email,
        phone,
        course,
        message,
        status,
        created_at AS createdAt
      FROM admissions
      ORDER BY id DESC
    `).all();

    res.json(applications);
  } catch (error) {
    console.error("Error loading applications:", error);
    res.status(500).json({
      message: "Unable to load admission applications.",
    });
  }
});

app.patch("/api/admissions/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Under Review",
    "Approved",
    "Rejected",
  ];

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid application ID.",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid application status.",
    });
  }

  try {
    const result = db
      .prepare("UPDATE admissions SET status = ? WHERE id = ?")
      .run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json({
      message: "Application status updated successfully.",
      id,
      status,
    });
  } catch (error) {
    console.error("Status update error:", error);

    res.status(500).json({
      message: "Unable to update application status.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log("College database connected successfully.");
});
