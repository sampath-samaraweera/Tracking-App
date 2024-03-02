require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://sampathsamaraweera28:passwordpassword@cluster0.ueszsph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Use this instead of useCreateIndex
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance');
});

mongoose.connection.on('error',  (err) => {
    console.error('Error connecting to Mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.User.password}`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});
