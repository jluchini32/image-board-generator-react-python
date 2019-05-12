const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
require('./db/db');
// const store = new MongoDBStore({
//     uri: 'mongodb://localhost:27017/buzzed',
//     collection: 'mySessions'
//   });
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))
// app.use(session({
//     saveUninitialized: true,
//     secret: "keepitsafe",
//     resave: false,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//       },
// }))
app.use(morgan('short'));
app.use(bodyParser.json());
// app.use((req, res, next)=>{
//     console.log(`request incoming from user ${req.session.userId}`)
//     next();
// })

const userController = require('./controllers/UserController');
const boardController = require('./controllers/BoardController'); 
app.use('/users', userController);
app.use('/boards', boardController);

// app.listen(process.env.PORT || 9000, ()=>{

app.listen(9000, ()=>{
    console.log("back-end server working")
})