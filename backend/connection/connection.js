require('dotenv').config(); // 👈 Add this line

const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URI);

connection.then(() => {
    console.log('Database Connected...!!!');
});

connection.catch((error) => {
    console.error(error);
});

module.exports = connection;
