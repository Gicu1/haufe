const express = require('express');
const { GetParties, CreateParty, UpdateParty, GetPartyById } = require('../controllers/party.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, GetParties); // Protect the route with authMiddleware
router.get('/getbyid/:id', authMiddleware, GetPartyById); // Protect the route with authMiddleware
router.post('/', authMiddleware, CreateParty); // Protect the route with authMiddleware
router.put('/editParty/:id', authMiddleware, UpdateParty); // Protect the route with authMiddleware


module.exports = router;
