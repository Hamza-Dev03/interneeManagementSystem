
const coachService = require('../services/coachServices');


const getCoachData = async (req, res) => {
    try {
        // Call the service method to get coach data
        const rows = await coachService.getCoachData(); 
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching coach data", error: err });
    }
};


const getCoachById = async (req, res) => {
    try {
        const rows = await coachService.getCoachById(req.params.id); 
        if (rows.length === 0) {
            return res.status(404).json({ message: "ID not found in database" });
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching coach data", error: err });
    }
};


const updateCoachData = async (req, res) => {
    const coach = req.body;
    
    // Check if ID is provided
    if (!coach.id) {
        return res.status(400).json({ message: "ID is required to update coach data" });
    }
    
    const { coach_name, expert } = req.body;

    // Validate 'coach_name'
    if (!coach_name || typeof coach_name !== 'string' || coach_name.trim() === '') {
        return res.status(400).json({ message: "Invalid or missing 'coach_name' field" });
    }
    
    // Validate 'expert'
    if (!expert || typeof expert !== 'string' || expert.trim() === '') {
        return res.status(400).json({ message: "Expert field must be a non-empty string" });
    }

    try {
        const result = await coachService.updateCoachData(coach);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID not found in database" });
        }
        res.json({ message: "Data updated successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Error updating coach data", error: err });
    }
};

const createCoach = async (req, res) => {
    // Check if id is present in the URL parameters
    if (req.params.id) {
        return res.status(400).json({ message: "ID should not be provided in the URL for creating data" });
    }

    const { coach_name, expert } = req.body;
    
    // Validate 'coach_name'
    if (!coach_name || typeof coach_name !== 'string' || coach_name.trim() === '') {
        return res.status(400).json({ message: "Invalid or missing 'coach_name' field" });
    }
    
    // Validate 'expert'
    if (!expert || typeof expert !== 'string' || expert.trim() === '') {
        return res.status(400).json({ message: "Expert field must be a non-empty string" });
    }

    try {
        const result = await coachService.createCoach(coach_name, expert);
        res.json({ message: "Data inserted successfully", insertId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: "Error inserting data", error: err });
    }
};


const deleteCoach = async (req, res) => {
    const id = req.params.id;

    // Check if id is provided and is not an empty string
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: "ID is required and cannot be empty to delete coach data" })
    }

    try {
    
        const result = await coachService.deleteCoach(id);

        // Check if the deletion affected any rows
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID not found in database" });
        }

        res.json({ message: "Data deleted successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Error deleting data", error: err.message });
    }
};

module.exports = {
    getCoachData,
    getCoachById,
    updateCoachData,
    createCoach,
    deleteCoach,
};