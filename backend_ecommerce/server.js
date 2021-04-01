const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
//
app.use('/api', authRoutes);
const port = process.env.PORT || 5001;
app.listen(port, (req, res) => {
	console.log('server started');
});
