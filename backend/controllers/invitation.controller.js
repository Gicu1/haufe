const Invitation = require('../models/invitation.model');

// Get all invitations for the logged-in user
const GetUserInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find({ invitedUser: req.user.id }).populate('party', 'name date location');
        res.status(200).json(invitations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Accept an invitation
const AcceptInvitation = async (req, res) => {
    const { invitationId } = req.params;

    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }

        if (invitation.invitedUser.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to accept this invitation' });
        }

        invitation.status = 'accepted';
        await invitation.save();

        res.status(200).json(invitation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { GetUserInvitations, AcceptInvitation };