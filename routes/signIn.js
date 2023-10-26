const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Define signin route
router.post('/', async (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

module.exports = router;