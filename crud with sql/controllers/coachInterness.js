
const coachinternees = require('../services/coachInternees');
const { interneeCoachById } = require('../services/coachInternees');
const asyncHandler = require('express-async-handler');

const getInterneeCoachById = asyncHandler(async (req, res) => {
    const interneeId = req.params.id;
    try {
        const data = await interneeCoachById(interneeId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
});

const interneeCoach = async (req, res) => {
    try {
        const rows = await coachinternees.interneeCoach();

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
};



const createInterneeCoach = asyncHandler(async (req, res) => {
    const { interneeId, coachId } = req.body;

    // Validate the input
    if (!interneeId || !coachId) {
        return res.status(400).json({ message: 'Internee ID and Coach ID are required' });
    }

    try {
        // Use the service to add a new internee-coach link
        const newInterneeCoachId = await coachinternees.addInterneeCoach(interneeId, coachId);

        res.status(201).json({
            message: 'Internee-Coach link created successfully',
            interneeCoachId: newInterneeCoachId,
        });
    } catch (err) {
        
        res.status(500).json({ message: 'Error creating internee-coach link', error: err.message });
    }
});


const updateInterneeCoach = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const { interneeId, coachId } = req.body; 

    // Validate the input
    if (!interneeId || !coachId) {
        return res.status(400).json({ message: 'Internee ID and Coach ID are required' });
    }

    try {
    
        const affectedRows = await coachinternees.updateInterneeCoach(id, interneeId, coachId);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'No internee-coach link found with the provided ID' });
        }

        res.status(200).json({
            message: 'Internee-Coach link updated successfully',
            affectedRows,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating internee-coach link', error: err.message });
    }
});

const deleteInterneeCoach = asyncHandler(async (req, res) => {
    const { id } = req.params; 

    try {
        
        const affectedRows = await coachinternees.deleteInterneeCoach(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Internee-Coach link not found' });
        }

        res.status(200).json({
            message: 'Internee-Coach link deleted successfully',
            affectedRows,
        });
    } catch (err) {
    
        res.status(500).json({ message: 'Error deleting internee-coach link', error: err.message });
    }
});

module.exports = {
    interneeCoach,
    getInterneeCoachById,
    createInterneeCoach,
    updateInterneeCoach,
    deleteInterneeCoach
}