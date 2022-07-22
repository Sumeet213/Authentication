const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect('mongodb+srv://sam:1234@cluster0.i2kdp.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;