const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hospital Management API Running");
});

app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM doctor", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patient", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

app.post("/patients", (req, res) => {
  const { patient_name, age, gender, phone } = req.body;
  db.query("INSERT INTO patient (patient_name, age, gender, phone) VALUES (?, ?, ?, ?)", [patient_name, age, gender, phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.json({ message: "Patient added", id: results.insertId });
  });
});

app.get("/appointments", (req, res) => {
  db.query("SELECT * FROM appointment", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

app.post("/appointments", (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;
  db.query("INSERT INTO appointment (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)", [patient_id, doctor_id, appointment_date], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.json({ message: "Appointment added", id: results.insertId });
  });
});

app.get("/bills", (req, res) => {
  db.query("SELECT * FROM bill", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

app.post("/bills", (req, res) => {
  const { patient_id, amount, bill_date } = req.body;
  db.query("INSERT INTO bill (patient_id, amount, bill_date) VALUES (?, ?, ?)", [patient_id, amount, bill_date], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.json({ message: "Bill added", id: results.insertId });
  });
});

app.listen(5000, () => {  console.log("Server running on port 5000");
});