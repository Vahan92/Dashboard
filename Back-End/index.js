// const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const ticket_booking = require('./routes/ticket_booking');
const cors = require('cors');

// if (!config.get('PrivateKey')) {
//     console.error('FATAL ERROR: PrivateKey is not defined.');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost/dashboard')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/ticket_booking', ticket_booking);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));