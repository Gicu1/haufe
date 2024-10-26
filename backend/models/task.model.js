const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    details: String,
});

module.exports = mongoose.model('Task', taskSchema);
