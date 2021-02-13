var seeder = require('mongoose-seed');


const seedDB = () => {
    seeder.connect('mongodb://localhost:27017/clickclack', function () {
        // Load Mongoose models
        seeder.loadModels([
            'models/User.js',
            'models/Channel.js',
            'models/Message.js'
        ]);

        // Clear specified collections
        seeder.clearModels(['User', 'Channel', 'Message'], function () {
            console.log(data);
            // Callback to populate DB once collections have been cleared
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });

        });
    });
    console.log("Seeded Database");
}
var data = [
    {
        'model': 'User',
        'documents': [
            {
                "_id" : "60278937fe1e4d0624490c86",
                'username': 'juandelacruz',
                'email': 'juandelacruz@upis.edu.ph',
                'password': "juandelacruz",
                'isTeacher': false,
                'bio': 'I\'m a Grade 7 student at UPIS. My favorite subject is Math and Philosophy.',
                'school': 'UP Integrated School',
                'country': 'Philippines',
            },
            {
                "_id" : "60278937fe1e4d0624490c85",
                'username': 'janedoe',
                'email': 'janedoe@ism.edu.es',
                'password': "janedoe",
                'isTeacher': false,
                'bio': 'I\'m a Grade 8 student at IS Madrid. I am a strong advocate for gender equality and climate change.',
                'school': 'International School of Madrid',
                'country': 'Spain',
            },
            {
                "_id" : "60278937fe1e4d0624490c87",
                'username': 'teacher_mathena',
                'email': 'teachermathena@ism.edu.es',
                'password': "teacher_mathena",
                'isTeacher': true,
                'bio': 'I teach Social Studies to middle school students in IS Madrid.',
                'school': 'International School of Madrid',
                'country': 'Spain',
             },
             {
                "_id" : "60278937fe1e4d0624490c88",
                'username': 'teacher_china',
                'email': 'teacherchina@upis.edu.ph',
                'password': "teacher_china",
                'isTeacher': true,
                'bio': 'I teach Pre-Algebra to Grade 7 students at UPIS.',
                'school': 'UP Integrated School',
                'country': 'Philippines',
            },
        ],
    },
    {
        'model': 'Channel',
        'documents': [
            {
                "_id" : "6027897f48f64b061b4bfc4f",
                'name': 'e-Education',
                'description': 'As the world shifts to online learning, teachers are struggling to motivate disengaged students remotely. How can we improve the remote education experience?',
                'participants': ["60278937fe1e4d0624490c86","60278937fe1e4d0624490c85","60278937fe1e4d0624490c87","60278937fe1e4d0624490c88"],
            },
        ],
    },
    {
        'model': 'Message',
        'documents': [
            {
                'userName': 'teacher_china',
                'school': 'UP Integrated School',
                'content': 'We created this channel so you guys can share your thoughts on the current state of e-Learning and how it can be used to lift up the educational sector in your respective countries.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.863Z",
            },
            {
                'userName': 'juandelacruz',
                'school': 'UP Integrated School',
                'content': 'Personally, I find that ClickClack has been a great help in that regard.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.864Z",
            },
            {
                'userName': 'juandelacruz',
                'school': 'UP Integrated School',
                'content': 'Being able to talk to other students from all walks of life has really helped concretize my learnings in the classroom.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.865Z",
            },
            {
                'userName': 'janedoe',
                'school': 'International School of Madrid',
                'content': 'Juan, I totally agree.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.866Z",
            },
            {
                'userName': 'janedoe',
                'school': 'International School of Madrid',
                'content': 'The new remote set-up can be really isolating but with ClickClack I feel more connected than ever.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.867Z",
            },
            {
                'userName': 'juandelacruz',
                'school': 'UP Integrated School',
                'content': 'It\'s interesting to hear about the context in each country and see how that shapes people\'s perspectives.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.868Z",
            },
            {
                'userName': 'teacher_mathena',
                'school': 'International School of Madrid',
                'content': 'Great insights, guys! We\'re happy to be able to engage our students in this way.',
                'channelId': "6027897f48f64b061b4bfc4f",
                "createdAt" : "2021-02-13T10:22:25.869Z",
            },
        ],
    },
];
seedDB()
module.exports = seedDB;