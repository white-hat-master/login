const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/form",
 { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
  });
const db = mongoose.connection
console.log("Connectiion Done");
module.exports = db;
