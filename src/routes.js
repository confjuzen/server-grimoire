const express = require('express');
const router = express.Router();

const getBooks = require('./routes/getBooks');

router.use('/getBooks', getBooks);

module.exports = router;