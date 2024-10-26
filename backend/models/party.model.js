const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    acceptedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Party', partySchema);
