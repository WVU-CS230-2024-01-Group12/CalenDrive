import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import oAuthKeys from './oauth2.keys.json' assert { type: "json" };

const app = express();

const oAuthClient = new OAuth2Client(
    oAuthKeys.web.client_id,
    oAuthKeys.web.client_secret,
    oAuthKeys.web.redirect_uris[0]
);

const authorizeUrl = oAuthClient.generateAuthUrl({
    access_type: "online",
    scope: "https://www.googleapis.com/auth/userinfo.profile"
});

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
app.use(cors());

// Visiting /authenticate_url will redirect you to google's OAuth2 page
app.get("/authenticate_url", (req, res) => {
    res.redirect(authorizeUrl);
});

// The browser gives us the user's authorization code here
app.put("/oauth2callback/:code", (req, res) => {
    const code = req.params.code;

    oAuthClient.getToken(code).then(async r => {
        console.log("Tokens acquired");

        // This is where I would put the tokens/account in the database, but that comes later
        // Instead lets get information about the account and print it to the console

        oAuthClient.setCredentials(r.tokens);

        const url = "https://people.googleapis.com/v1/people/me?personFields=names";
        const peopleRes = await oAuthClient.request({url});
        
        console.log(peopleRes.data);

        const tokenInfo = await oAuthClient.getTokenInfo(oAuthClient.credentials.access_token);
        console.log(tokenInfo);

        res.json({ result: "Success" });
    }).catch(reason => {
        // An error occurred while getting the tokens
        // Tell the browser
        res.json({ result: "Failed to authorize" });

        console.log("Error authorizing:");
        console.log(reason);
    });
});

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
        return res.json(data);
    });
    
});

// Update event
app.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const values = [req.body.name, req.body.desc, req.body.address, req.body.start, req.body.end];
    const q = "UPDATE events SET `name` =?, `desc` =?, `address` =?, `start` =?, `end` =? WHERE id=?"
    db.query(q, [...values, eventId], (err, result) => {
        if (err) return res.json(err);
        return res.json('Event updated');
    });
});

// Delete event
app.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    db.query('DELETE FROM events WHERE id=?', [eventId], (err, result) => {
        if (err) throw err;
        res.json('Event deleted');
    });
});

// Start the backend HTTP server on port 8800
app.listen(8800, () => {
    console.log(`Backend server is running on port 8800`);
});