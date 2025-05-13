const express = require("express");
const router = express.Router();
const path = require("path")
const data = require(path.join(__dirname, "../data/test.json"));


router.get('/', (req, res) => {
    res.json(data)
})

module.exports = router;