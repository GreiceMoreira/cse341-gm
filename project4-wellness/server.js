const express = require('express');
const connectDB = require('./config/dbconfig')
const dotenv = require('dotenv').config();
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const port = process.env.PORT || 8080;

const socialRoutes = require('./routes/social');
const spiritualRoutes = require('./routes/spiritual');
const intellectualRoutes = require('./routes/intellectual');
const physicalRoutes = require('./routes/physical');
const swaggerRoute = require('./routes/swagger');
const accountRoutes = require('./routes/accounts');

app
    .use(cors())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.json())
    .use(swaggerRoute)
    .use('/users', accountRoutes)
    .use('/social', socialRoutes)
    .use('/spiritual', spiritualRoutes)
    .use('/physical', physicalRoutes)
    .use('/intellectual', intellectualRoutes)

const User = require('./models/User');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, 
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}));

passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser((user, done)=>{
    done(null, user)
})

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged Out`)
});

app.get('/github', passport.authenticate('github'));

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session:false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.user = undefined
        res.redirect('/');
    });
});




connectDB().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log('Web Server is listening at port', port);
    });
  }
});

module.exports = app;