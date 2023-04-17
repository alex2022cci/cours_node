const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db');
const { adminAuth, userAuth } = require('./middleware/auth');

connectDB();

app.get('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.render('home'));
app.get('/register', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });  // jwt = json web token
    res.redirect('/');
});

app.get('/admin', adminAuth, (req, res) => res.render('admin'));
app.get('/basic', userAuth, (req, res) => res.render('user'));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// on affiche une erreur dans la console + KILL le serveur
process.on('unhandledRejection', (err) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});