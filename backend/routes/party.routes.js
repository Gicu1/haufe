const express = require('express');
const { GetParties } = require('../controllers/party.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, GetParties); // Protect the route with authMiddleware

module.exports = router;
