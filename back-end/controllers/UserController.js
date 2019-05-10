const router = require('express').Router();

// index
router.get('/', (req, res) => {
    res.send('hit1')
})

module.exports = router;