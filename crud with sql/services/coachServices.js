
const connection = require('../connection');


const getCoachData = async () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT coach_name, expert FROM coach", (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


const createCoach = async (coachName, expert) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO coach (coach_name, expert) VALUES (?, ?)", [coachName, expert], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const getCoachById = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM coach WHERE id = ?", [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const updateCoachData = async (coach) => {
    return new Promise((resolve, reject) => {
        const { id, coach_name, expert } = coach;
        connection.query(
            "UPDATE coach SET coach_name = ?, expert = ? WHERE id = ?",
            [coach_name, expert, id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
        );
    });
};


const deleteCoach = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM coach WHERE id = ?", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


module.exports = {
    getCoachData,
    getCoachById,
    updateCoachData,
    createCoach,
    deleteCoach,
};