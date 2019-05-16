const router = require('express').Router();
const cors = require('cors');
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
router.post('/', cors(), async (req, res) => {
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
router.put('/:id', cors(), async (req, res) => {
    console.log('backend edit', req.body);
    try{
        const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await updatedBoard.save();
        res.json({
            data: updatedBoard,
            status: 200
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