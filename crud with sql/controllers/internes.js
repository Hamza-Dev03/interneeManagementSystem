
// controllers/interneesController.js

const interneesService = require('../services/interneesService');

const getInterneeData = async (req, res) => {
    try {
        const rows = await interneesService.getInterneeData();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
    }
};

const getDataById = async (req, res) => {
    try {
        const rows = await interneesService.getDataById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: "ID not found in database" });
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
    }
};


const createInterne = async (req, res) => {
    // Check if id is present in the URL parameters
    if (req.params.id) {
        return res.status(400).json({ message: "ID should not be provided in the URL for creating data" });
    }

    const { name, skills, duration } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: "Invalid or missing 'name' field" });
    }
    if (!skills || typeof skills !== 'string' || skills.trim() === '') {
        return res.status(400).json({ message: "Skills must be a non-empty string" });
    }
    if (!duration || typeof duration !== 'number' || duration <= 0) {
        return res.status(400).json({ message: "Duration must be a positive number" });
    }

    try {
        const result = await interneesService.createInterne(name, skills, duration);
        res.json({ message: "Data inserted successfully", insertId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: "Error inserting data", error: err });
    }
};

const updateInterneData = async (req, res) => {
    const intern = req.body;
    if (!intern.id) {
        return res.status(400).json({ message: "ID is required to update interne data" });
    }
    const { name, skills, duration } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: "Invalid or missing 'name' field" });
    }
    if (!skills || typeof skills !== 'string' || skills.trim() === '') {
        return res.status(400).json({ message: "Skills must be a non-empty string" });
    }
    if (!duration || typeof duration !== 'number' || duration <= 0) {
        return res.status(400).json({ message: "Duration must be a positive number" });
    }
    try {
        const result = await interneesService.updateInterneData(intern);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID not found in database" });
        }
        res.json({ message: "Data updated successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Error updating data", error: err });
    }
};


const deleteInterne = async (req, res) => {
    const id = req.params.id;

    // Check if id is provided and is not an empty string
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: "ID is required and cannot be empty to delete interne data" });
    }

    try {
    
        const result = await interneesService.deleteInterne(id);

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
    getInterneeData,
    getDataById,
    updateInterneData,
    createInterne,
    deleteInterne,
};
