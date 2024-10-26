const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party', required: true },
    invitedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
});

module.exports = mongoose.model('Invitation', invitationSchema);
