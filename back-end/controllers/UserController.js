const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')

// index
router.get('/', (req, res) => {
    res.send('hello')
});

// login
// router.post('/login', async (req, res) => {
//     try{
//         const foundUser = await User.findOne({username: req.body.username})

//     }catch(err){
//         console.log(err);
            // res.json({
            //     status: 500,
            //     data: err
//     }
// })

// register
router.post("/", async (req, res)=>{
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        newUser.password = null;
        req.session.userId = newUser._id;
        res.json({
            status: 200,
            data: newUser
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})

module.exports = router;