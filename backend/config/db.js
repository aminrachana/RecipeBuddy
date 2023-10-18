const mongoose = require('mongoose');
const { DB_URL } = process.env;

mongoose.connect(DB_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})