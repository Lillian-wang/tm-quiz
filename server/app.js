var express = require('express')
var app = express()

var port = process.env.PORT || 9000
var router = express.Router()

// Unsafely enable cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


// Simple in memory database
const database = {
    fieldNames: ['id', 'name', 'number', 'uid', 'uid1', 'user', 'sex', 'time', 'url', 'messages', 'messages1', 'messages2', 'messages3', 'messages4', 'messages5'],
    tableData: [
        { id: 0, name: 'Tea Chats', number: 12342354545, uid: 0234332, uid1: 34234235245345, user: 'Ryan', sex: 'male', time: 'Wed Mar 14 2018', url: 'This is not a link', urlLink: '', messages: 'legoooo', messages1: 'legoooo hiiii', messages2: 'He likes pizza! cool~', messages3: 'I don\'t like sweets.', messages4: 'yellow.', messages5: 'Hello. Nice to see you.' },
        { id: 1, name: 'Coffee Chats', number: 6546474563, uid: 2345, uid1: 453463245223, user: 'Jessye', sex: 'male', time: 'Wed Mar 10 2018', url: 'This is a link', urlLink: 'https://www.threatmetrix.com/', messages: 'He likes pizza! cool~~~', messages1: 'legoooo hii', messages2: 'legoooo', messages3: 'My favourate stuff is cakes', messages4: 'NA', messages5: 'See you later!' },
        { id: 2, name: 'Coffee Chats', number: 2343423543, uid: 354, uid1: 432423525435, user: 'Jim', sex: 'male', time: 'Wed Mar 18 2018', url: 'This is a link', urlLink: 'https://www.threatmetrix.com/', messages: 'He likes pizza! cool!!!!', messages1: 'legoo hiiiiiii', messages2: 'legoooo', messages3: 'Red', messages4: ' I hate spice food.', messages5: 'Happy birthday!' },
        { id: 3, name: 'Coffee Chats', number: 65436746554, uid: 65363454352334, uid1: 4324234123423524, user: 'Cat', sex: 'female', time: 'Wed Jul 10 2018', url: 'This is a link', urlLink: 'https://www.threatmetrix.com/', messages: 'He likes pizza!', messages1: 'legoo hiiii', messages2: 'legoooo', messages3: 'NA', messages4: 'I don\'t like sweets.', messages5: 'Happy everyday!' },
    ]
}

// API Routes
router.get('/table', function (req, res) {
    const result = database;
    console.log('Response:', result)
    res.json(result)
})

app.use('/', router)
app.listen(port)
console.log(`API running at localhost:${port}/api`)