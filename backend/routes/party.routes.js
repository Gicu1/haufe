const express = require('express');
const { GetParties, CreateParty, UpdateParty, GetPartyById } = require('../controllers/party.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { GetUsersWithInvitationStatus, InviteUser } = require('../controllers/user.controller');
const { GetUserInvitations, AcceptInvitation } = require('../controllers/invitation.controller');

const router = express.Router();

router.get('/', authMiddleware, GetParties);
router.get('/getbyid/:id', authMiddleware, GetPartyById);
router.post('/', authMiddleware, CreateParty);
router.put('/editParty/:id', authMiddleware, UpdateParty);
router.get('/:partyId/invite/users', authMiddleware, GetUsersWithInvitationStatus);
router.post('/:partyId/invite', authMiddleware, InviteUser);
router.get('/invitations', authMiddleware, GetUserInvitations);
router.put('/invitations/:invitationId/accept', authMiddleware, AcceptInvitation);


module.exports = router;
