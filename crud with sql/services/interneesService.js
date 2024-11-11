// services/interneesService.js

const connection = require('../connection');

const getInterneeData = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name, skills, duration FROM internees", (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getDataById = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM internees WHERE id = ?", [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const updateInterneData = async (intern) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE internees SET ? WHERE id = ?", [intern, intern.id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const createInterne = async (name, skills, duration) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO internees (name, skills, duration) VALUES (?, ?, ?)", [name, skills, duration], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


const deleteInterne = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM internees WHERE id = ?", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};



module.exports = {
    getInterneeData,
    getDataById,
    updateInterneData,
    createInterne,
    deleteInterne,
};
