const router = require('express').Router();
const Board = require('../models/Board');

// index
router.get('/', async (req, res) => {
    try{
        const boards = await Board.find({});
        res.json({
            status: 200,
            data: boards
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
        const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await updatedBoard.save();
        res.json({
            status: 200,
            data: updatedBoard
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })    
    }
});
// new put route?
// delete
router.delete('/:id', async (req, res) => {
    console.log('delete route');
    try{
        const deletedBoard = await Board.findByIdAndDelete(req.params.id);
        await updatedBoard.save();
        res.json({
            status: 200,
            data: deletedBoard
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