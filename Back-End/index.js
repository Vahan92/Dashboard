// const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const register = require('./routes/register');
const getUsers = require('./routes/getUsers');
const getUser = require('./routes/getUser');
const getOverviewReports = require('./routes/getOverviewReports');
const getUserReports = require('./routes/getUserReports');
const deleteUser = require('./routes/deleteUser');
const updateUser = require('./routes/updateUser');
const updateReport = require('./routes/updateReport');
const updateStatus = require('./routes/updateStatus');
const addReport = require('./routes/addReport');
const deleteReport = require('./routes/deleteReport');
const deleteMany = require('./routes/deleteMany');
const deleteSelectedReports = require('./routes/deleteSelectedReports');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const cors = require('cors');
const socket = require('socket.io');

// if (!config.get('PrivateKey')) {
//     console.error('FATAL ERROR: PrivateKey is not defined.');
//     process.exit(1);
// }

// mongoose.connect('mongodb://localhost/dashboard')
//     .then(() => console.log('Now connected to MongoDB!'))
//     .catch(err => console.error('Something went wrong', err));

mongoose.connect('mongodb+srv://vahan:iamvahan@vehicles-6jzyi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

app.use(cors());
app.use(express.json());
app.use('/api/register', register);
app.use('/api/getUsers', getUsers);
app.use('/api/getOverviewReports', getOverviewReports);
app.use('/api/getUser', getUser);
app.use('/api/getUserReports', getUserReports);
app.use('/api/deleteReport', deleteReport);
app.use('/api/deleteMany', deleteMany);
app.use('/api/deleteUser', deleteUser);
app.use('/api/updateUser', updateUser);
app.use('/api/updateReport', updateReport);
app.use('/api/updateStatus', updateStatus);
app.use('/api/deleteSelectedReports', deleteSelectedReports);
app.use('/api/auth', auth);
app.use('/api/addReport', addReport);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

server = app.listen(4001, function () {
  console.log('server is running on port 4001')
});

io = socket(server);

io.on('connection', (socket) => {
  console.log(`socket.id`, socket.id);
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
});

