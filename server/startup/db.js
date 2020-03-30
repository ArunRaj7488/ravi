const mongoose = require('mongoose');

module.exports = mongoose.connect("mongodb+srv://Arun:7408866244@cluster0-ocsge.mongodb.net/files?retryWrites=true&w=majority")
.then(() => console.log('Connected to the mongodb'))
.catch( err => console.log('Not connected to mongodb', err));