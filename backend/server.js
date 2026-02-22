const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "joshua",
  database: "studentdb",
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.post("/students", (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  const { name, course, year_level } = req.body;

  db.query(
    "INSERT INTO students (name, course, year_level) VALUES (?, ?, ?)",
    [name, course, year_level],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Student added");
    }
  );
});

app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, course, year_level } = req.body;

  db.query(
    "UPDATE students SET name=?, course=?, year_level=? WHERE id=?",
    [name, course, year_level, id],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Student updated");
    }
  );
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
    if (err) return res.json(err);
    res.json("Student deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});