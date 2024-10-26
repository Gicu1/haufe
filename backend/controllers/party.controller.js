const Party = require('../models/party.model');

const GetParties = async (req, res) => {
    try {
        const parties = await Party.find({ acceptedUsers: req.user.id });
        res.status(200).json(parties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const GetPartyById = async (req, res) => {
    const { id } = req.params;

    try {

        const party = await Party.findById(id);
        if (!party) {
            return res.status(404).json({ message: "Party not found" });
        }
        res.status(200).json(party);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const CreateParty = async (req, res) => {
    const { name, date, location, budget, invitedUsers } = req.body;

    // Check if the date is in the past
    if (new Date(date) < new Date()) {
        return res.status(400).json({ message: "Date cannot be in the past" });
    }
    if (!name || !date || !location || !budget) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const newParty = await Party.create({
            name,
            date,
            location,
            budget,
            creator: req.user.id,
            acceptedUsers: [req.user.id], // Automatically accept the creator
            tasks: [], // Initialize with an empty tasks array
        });

        res.status(201).json(newParty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const UpdateParty = async (req, res) => {
    const { id } = req.params;
    const { name, date, location, budget } = req.body;

    // Check if the date is in the past
    if (new Date(date) <= new Date()) {
        return res.status(400).json({ message: "Date cannot be in the past" });
    }

    try {
        // Find the party to check if the user is the creator
        const party = await Party.findById(id);
        if (!party) {
            return res.status(404).json({ message: "Party not found" });
        }

        // Check if the logged-in user is the creator of the party
        if (party.creator.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to edit this party" });
        }

        // Proceed to update the party
        const updatedParty = await Party.findByIdAndUpdate(
            id,
            {
                name,
                date,
                location,
                budget
            },
            { new: true }
        );

        res.status(200).json(updatedParty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { GetParties, CreateParty, UpdateParty, GetPartyById };