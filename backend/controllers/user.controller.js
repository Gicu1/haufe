const User = require('../models/user.model');
const Invitation = require('../models/invitation.model');

const GetUsersWithInvitationStatus = async (req, res) => {
    const { partyId } = req.params;

    try {
        const users = await User.find(); // Fetch all users
        const invitations = await Invitation.find({ party: partyId }); // Fetch all invitations for the party

        const usersWithStatus = users.map(user => {
            const invitation = invitations.find(inv => inv.invitedUser.toString() === user._id.toString());
            return {
                _id: user._id,
                username: user.username,
                invited: !!invitation,
                status: invitation ? invitation.status : null
            };
        });

        res.status(200).json(usersWithStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const InviteUser = async (req, res) => {
    const { partyId } = req.params;
    const { userId } = req.body;

    try {
        // Check if the user is already invited
        const existingInvitation = await Invitation.findOne({ party: partyId, invitedUser: userId });
        if (existingInvitation) {
            return res.status(400).json({ message: 'User is already invited' });
        }

        // Create a new invitation
        const newInvitation = await Invitation.create({
            party: partyId,
            invitedUser: userId
        });

        res.status(201).json(newInvitation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { GetUsersWithInvitationStatus, InviteUser };

