import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import account from './account.js'

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'calendrive'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Setup CORS settings
app.use(cors({
    // Required for sessions to work
    // Will likely need changed on a production server
    origin: ["http://localhost:8080", "http://localhost:8800"],
    credentials: true
}));

app.use(bodyParser.json());

// Get all events
app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add new event
app.post('/events', (req, res) => {
    const values = [req.body.name, req.body.desc, req.body.address, req.body.start, req.body.end];
    const q = "INSERT INTO events (`name`, `desc`, `address`, `start`, `end`) VALUES (?)";
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Event added");
    });
    
});

// Update event
app.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const { name, description, address, start, end } = req.body;
    db.query('UPDATE events SET name=?, desc=?, address=?, start=?, end=? WHERE id=?', [name, description, address, start, end, eventId], (err, result) => {
        if (err) throw err;
        res.send('Event updated');
    });
});

// Delete event
app.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    db.query('DELETE FROM events WHERE id=?', [eventId], (err, result) => {
        if (err) throw err;
        res.send('Event deleted');
    });
});

account.setup(app);

// Start the backend HTTP server on port 8800
app.listen(8800, () => {
    console.log(`Backend server is running on port 8800`);
});