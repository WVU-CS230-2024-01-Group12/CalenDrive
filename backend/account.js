import { OAuth2Client } from 'google-auth-library';
import oAuthKeys from './oauth2.keys.json' assert { type: "json" };
import session from 'express-session';

const account = {};

const oAuthClient = new OAuth2Client(
    oAuthKeys.web.client_id,
    oAuthKeys.web.client_secret,
    oAuthKeys.web.redirect_uris[0]
);

const authorizeUrl = oAuthClient.generateAuthUrl({
    access_type: "online",
    scope: "https://www.googleapis.com/auth/userinfo.profile"
});

// Middleware that fails any request requiring being logged in if the session is not logged in
function requireLogin(req, res, next) {
    if (!req.session.oAuthTokens)
        res.json({ result: "Not logged in" });
    else
        next();
}

account.setup = function(app) {
    app.use(session({
        // Randomly generated, meant to be kept private
        secret: "qLQfLG5LLtH9ZyxV#Lp#bufdM",
        
        resave: false,
        saveUninitialized: true,
        cookie: { domain: "localhost" }
    }));

    // Visiting /authenticate_url will redirect you to google's OAuth2 page
    app.get("/authenticate_url", (req, res) => {
        res.redirect(authorizeUrl);
    });

    // The browser gives us the user's authorization code here
    app.post("/oauth2callback/:code", (req, res, next) => {
        const code = req.params.code;

        oAuthClient.getToken(code).then(async r => {
            // Save their OAuth2 tokens to their session
            req.session.oAuthTokens = r.tokens;

            req.session.save(err => {
                if (err)
                    next(err);

                res.json({ result: "Success" });
            });
        }).catch(reason => {
            // An error occurred while getting the tokens
            // Tell the browser
            res.json({ result: "Failed to authorize" });

            console.log("Error authorizing:");
            console.log(reason);
        });
    });

    // Logs out the associated session
    app.get("/logout", (req, res, next) => {
        delete req.session.oAuthTokens;
        req.session.save(err => {
            if (err)
                next(err);

            res.json("Success");
        });
    });

    // Returns information about the account associated with the session
    // Currently just contains "name"
    app.get("/account_info", requireLogin, (req, res) => {
        oAuthClient.setCredentials(req.session.oAuthTokens);

        const url = "https://people.googleapis.com/v1/people/me?personFields=names";
        oAuthClient.request({url}).then(async peopleRes => {
            res.json({ result: "Success", name: peopleRes.data.names[0].displayName});
        }).catch(reason => {
            res.json({ result: "Failed" });

            console.log("Error getting account info:");
            console.log(reason);
        })
    });
};

export default account;