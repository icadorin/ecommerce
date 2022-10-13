const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose
    .connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log(`MongoDB Connected: ${process.env.MONGO_URL}`))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
