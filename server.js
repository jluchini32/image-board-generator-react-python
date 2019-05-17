const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
require('./db/db');
// const store = new MongoDBStore({
//     uri: 'mongodb://localhost:27017/buzzed',
//     collection: 'mySessions'
//   });
app.use(express.static(path.join(__dirname, 'client/build')));
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: "1fe232c10d045efb942c686798a897086057edb740c100d8ee47adf69d77c998",
  secret: "8e580bcf031fd093e5d435b4451b9fa0f05d7bb74eba277608d04fef202f284e"
});
const whitelist = [process.env.REACT_ADDRESS, "https://api.unsplash.com/search/photos"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(session({
    saveUninitialized: true,
    secret: "supersecretsafestuff",
    resave: false,
    // store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
}))
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
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log("back-end server working")
})


// unsplash api user id 1fe232c10d045efb942c686798a897086057edb740c100d8ee47adf69d77c998
