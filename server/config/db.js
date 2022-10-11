const { route } = require('../routes/auth.route');
const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${process.env.MONGO_URL}`);
}

module.exports = connectDB;
