const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

(mongoUri = "mongodb+srv://admin:123@messagedb.zd6ummv.mongodb.net/?retryWrites=true&w=majority"),
    mongoose.connect(mongoUri);
  
mongoose.connection
.once('open', () => console.log('Connected to databse'))
.on('error', (error) => {
    console.log('Database error start-------------------');
    console.log(error);
    console.log('Database error end-------------------');
});
  
