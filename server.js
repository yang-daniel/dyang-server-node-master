require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
const remoteUri = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@whiteboard.udx05.mongodb.net/whiteboard?retryWrites=true&w=majority`
// const remoteUri = `mongodb+srv://:@whiteboard.udx05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

try {
    mongoose.connect(remoteUri,
        {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log('connected to db'));
} catch (err) {
    console.log('failed to connect to db')
}

app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Content-Type, X-Requested-With, Origin');
        res.header('Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        next();
    }
)

require('./controllers/quizzes-controller')(app);
require('./controllers/question-controller')(app);
require('./controllers/quiz-attempts-controller')(app);

app.listen(process.env.PORT || 3001);





// const express = require('express')
// const app = express()
//
// app.listen(process.env.PORT || 3001)
// const mongoose = require('mongoose');
// mongoose.connect(
//     `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@whiteboard.udx05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
//     {useNewUrlParser: true, useUnifiedTopology: true});
//
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
//
// // Configures CORS
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers',
//       'Content-Type, X-Requested-With, Origin');
//   res.header('Access-Control-Allow-Methods',
//       'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   next();
// });
//
// // an available endpoint to see if the server is running
// app.get('/', (req, res) => {
//   res.send('connected to server')
// });
//
//
// require('./controllers/quizzes-controller')(app)
// require('./controllers/question-controller')(app)
// require('./controllers/quiz-attempts-controller')(app)
//
// app.listen(4000)