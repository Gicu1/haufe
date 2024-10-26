const Party = require('../models/party.model');

const GetParties = async (req, res) => {
    try {
        const parties = await Party.find({ invitedUsers: req.user.id });
        res.status(200).json(parties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const CreateParty = async (req, res) => {
    const party = new Party(req.body);

    try {
        await party.save();
        res.status(201).json(party);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { GetParties, CreateParty };