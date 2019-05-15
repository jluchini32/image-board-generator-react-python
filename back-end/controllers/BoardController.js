const router = require('express').Router();
const Board = require('../models/Board');

// index
router.get('/', async (req, res) => {
    try{
        const boards = await Board.find({});
        res.json({
            data: boards,
            status: 200
        })

    } catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
});

// new
router.post('/', async (req, res) => {
    try {
        const newBoard = await Board.create(req.body);
        res.json({
            status: 200,
            data: newBoard
        })

    } catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
});

// edit
router.put('/:id', async (req, res) => {
    try{
        const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body)
        await updatedBoard.save();
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })    
    }
})

module.exports = router;