import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import account from "./account.js";

const app = express();

const db = mysql.createConnection({
  host: "database-3.c12ew6m4ku0j.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "calendrive-1",
  database: "calendrive",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

// Setup CORS settings
app.use(
  cors({
    // Required for sessions to work
    // Will likely need changed on a production server
    origin: ["http://localhost:8080", "http://localhost:8800"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Get all events
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add new event
app.post("/events", (req, res) => {
  const values = [
    req.body.name,
    req.body.desc,
    req.body.address,
    req.body.lat,
    req.body.lon,
    req.body.start,
    req.body.end,
    req.body.poster,
    req.body.rsvp,
  ];
  const q =
    "INSERT INTO events (`name`, `desc`, `address`, `lat`, `lon`, `start`, `end`, `poster`, `rsvp`) VALUES (?)";
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Update event
app.put("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const values = [
    req.body.name,
    req.body.desc,
    req.body.address,
    req.body.lat,
    req.body.lon,
    req.body.start,
    req.body.end,
    req.body.poster,
    req.body.rsvp,
  ];
  const q =
    "UPDATE events SET `name` =?, `desc` =?, `address` =?, `lat` =?, `lon` =?, `start` =?, `end` =?, `poster` =?, `rsvp` =? WHERE id=?";
  db.query(q, [...values, eventId], (err, result) => {
    if (err) return res.json(err);
    return res.json("Event updated");
  });
});

// Delete event
app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id;
  db.query("DELETE FROM events WHERE id=?", [eventId], (err, result) => {
    if (err) throw err;
    res.json("Event deleted");
  });
});

account.setup(app);

// Start the backend HTTP server on port 8800
app.listen(8800, () => {
  console.log(`Backend server is running on port 8800`);
});
