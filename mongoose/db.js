let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');

let db = mongoose.connection;

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected');
})

