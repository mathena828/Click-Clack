var seeder = require('mongoose-seed');


const seedDB = () => {
    seeder.connect('mongodb://localhost:27017/hello_world', function () {

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
    console.log("Seeded database");
}
var data = [
    {
        'model': 'User',
        'documents': [
            {
                'username': 'raepineda',
                'email': 'raepineda@cvmig.edu.ph',
                'password': "raepineda",
                'isTeacher': false
            },
            {
                'username': 'franciscab',
                'email': 'franciscab@acl.edu.ph',
                'password': "franciscab",
                'isTeacher': false
            },
            {
                'username': 'teacher_chi',
                'email': 'teacherchi@acl.edu.ph',
                'password': "teacher_chi",
                'isTeacher': true
            },
            {
                'username': 'teacher_mathena',
                'email': 'teachermathena@cvmig.edu.ph',
                'password': "teacher_mathena",
                'isTeacher': true
            },
        ]
    }
];
module.exports = seedDB;