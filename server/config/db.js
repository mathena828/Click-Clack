const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/clickclack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }).then(()=>{
    
  });
  console.log("MongoDB is connected");
  // Connect to MongoDB via Mongoose
/*   seeder.connect('mongodb://localhost:27017/hello_world', function () {

    // Load Mongoose models
    seeder.loadModels([
      'models/User.js',
      'models/Channel.js'
    ]);
  
    // Clear specified collections
    seeder.clearModels(['User', 'Channel'], function () {
  
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
  
    });
  });
  console.log("Seeded database"); */
};


var data = [
  {
    'model': 'User',
    'documents': [
      {
        'username': 'raepineda',
        'email': 'raepineda@cvmig.edu.ph',
        'password': "raepineda",
        'isTeacher': false,
        'bio': 'I am a student from the University of the Philippines. I like to read and travel. I love talking about zoology and philosophy.',
        'school': 'University of the Philippines',
        'country': 'Philippines',
      },
      {
        'username': 'franciscab',
        'email': 'franciscab@acl.edu.ph',
        'password': "franciscab",
        'isTeacher': false,
        'bio': 'I am a student from the University of the Philippines. I enjoy public speaking and I am very passionate about climate change.',
        'school': 'University of the Philippines',
        'country': 'Philippines',
      },
      {
        'username': 'teacher_chi',
        'email': 'teacherchi@acl.edu.ph',
        'password': "teacher_chi",
        'isTeacher': true,
        'bio': 'I am an Algorithm and Complexities Laboratory professor from the University of the Philippines.',
        'school': 'University of the Philippines',
        'country': 'Philippines',
      },
      {
        'username': 'teacher_mathena',
        'email': 'teachermathena@cvmig.edu.ph',
        'password': "teacher_mathena",
        'isTeacher': true,
        'bio': 'I am a Computer Vision and Machine Intelligence professor from the University of the Philippines.',
        'school': 'University of the Philippines',
        'country': 'Philippines',
      },
    ]
  }
];
module.exports = connectDB;