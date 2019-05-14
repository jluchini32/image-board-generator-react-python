const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/", {useNewUrlParser: true});
mongoose.connect("mongodb://localhost/image-board-creator", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


mongoose.connection.on('connected', ()=>{
    console.log("Mongoose is connected.")
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

mongoose.connection.on('disconnected', ()=>{
    console.log("Mongoose disconnected.")
})