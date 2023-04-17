const express = require('express');
const app = express();
const connectDB = require('./db');

app.get('view engine', 'ejs');

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});