import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import cors from 'cors';
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

// Setup CORS settings
app.use(cors());

// Visiting /authenticate_user will redirect you to google's OAuth2 page
app.get("/authenticate_url", (req, res) => {
    res.redirect(authorizeUrl);
});

// The browser gives us the user's authorization code here
app.put("/oauth2callback/:code", (req, res) => {
    const code = req.params.code;

    oAuthClient.getToken(code).then(async r => {
        console.log("Tokens acquired");

        // This is where I would put the tokens/account in the database (IF WE HAD ONE)
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

// Start the backend HTTP server on port 3000
app.listen(3000, () => {
    console.log("Backend server started");
});