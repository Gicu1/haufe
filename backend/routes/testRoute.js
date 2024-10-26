const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: "Backend is working! or not" });
});

module.exports = router;
