const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/hello_world', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("MongoDB is connected");
};
  
module.exports = connectDB;