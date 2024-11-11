
const connection = require('../connection');


const interneeCoach = async () => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT 
                internees.name,
                internees.skills,
                coach.coach_name,
                coach.expert
            FROM 
                coach_internees
            JOIN 
                internees 
            ON 
                internees.id = coach_internees.internee_id
            JOIN 
                coach 
            ON 
                coach.id = coach_internees.coach_id
            ORDER BY 
                internees.name
        `);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching internee-coach data: ${error.message}`);
    }
};

//coaches not in object 
/*
const interneeCoachById = async (interneeId) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT 
                internees.name,
                internees.skills,
                coach.coach_name,
                coach.expert
            FROM 
                coach_internees
            JOIN 
                internees 
            ON 
                internees.id = coach_internees.internee_id
            JOIN 
                coach 
            ON 
                coach.id = coach_internees.coach_id
            WHERE 
                internees.id = ?
            ORDER BY 
                internees.name
        `, [interneeId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching internee-coach data by internee ID: ${error.message}`);
    }
};

*/

// for each internee seprate coaches

/*
const interneeCoachById = async (interneeId) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT 
                internees.name,
                internees.skills,
                coach.coach_name,
                coach.expert
            FROM 
                coach_internees
            JOIN 
                internees 
            ON 
                internees.id = coach_internees.internee_id
            JOIN 
                coach 
            ON 
                coach.id = coach_internees.coach_id
            WHERE 
                internees.id = ?
            ORDER BY 
                internees.name
        `, [interneeId]);
    
        
        // Transform the data to include the course details as an object
        const result = rows.map(row => ({
            name: row.name,
            skills: row.skills,
            coach: {
                coach_name: row.coach_name,
                expert: row.expert
            }
        }));
        
        return {result} ;
    } catch (error) {
        throw new Error(`Error fetching internee-coach data by internee ID: ${error.message}`);
    }
};
*/

const interneeCoachById = async (interneeId) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT 
                internees.id AS internee_id,
                internees.name,
                internees.skills,
                coach.coach_name,
                coach.expert
            FROM 
                coach_internees
            JOIN 
                internees 
            ON 
                internees.id = coach_internees.internee_id
            JOIN 
                coach 
            ON 
                coach.id = coach_internees.coach_id
            WHERE 
                internees.id = ?
            ORDER BY 
                internees.name
        `, [interneeId]);
    
        // Group the results by internee ID
        const interneeMap = rows.reduce((acc, row) => {
            const { internee_id, name, skills, coach_name, expert } = row;

            if (!acc[internee_id]) {
                acc[internee_id] = {
                    name,
                    skills,
                    coaches: []
                };
            }

            acc[internee_id].coaches.push({
                coach_name,
                expert
            });

            return acc;
        }, {});

        // Convert the map to an array of results
        const result = Object.values(interneeMap);
        
        return { result };
    } catch (error) {
        throw new Error(`Error fetching internee-coach data by internee ID: ${error.message}`);
    }
};


const addInterneeCoach = async (interneeId, coachId) => {
    try {
        const [result] = await connection.promise().query(`
            INSERT INTO coach_internees (internee_id, coach_id)
            VALUES (?, ?)
        `, [interneeId, coachId]);

        return result.insertId; 
    } catch (error) {
        throw new Error(`Error adding internee-coach link: ${error.message}`);
    }
};


const updateInterneeCoach = async (id, newInterneeId, newCoachId) => {
    try {
        const [result] = await connection.promise().query(`
            UPDATE coach_internees
            SET internee_id = ?, coach_id = ?
            WHERE id = ?
        `, [newInterneeId, newCoachId, id]);

        if (result.affectedRows === 0) {
            throw new Error('No records updated. Please check if the provided ID exists.');
        }

        return result.insertId; 
    } catch (error) {
        throw new Error(`Error updating internee-coach link: ${error.message}`);
    }
};


const deleteInterneeCoach = async (id) => {
    try {
        const result = await connection.promise().query(`
            DELETE FROM coach_internees
            WHERE id = ?
        `, [id]);

        
        if (result.affectedRows === 0) {
            throw new Error('No records deleted. Please check if the provided ID exists.');
        }

        return result.insertId; 
    } catch (error) {
        throw new Error(`Error deleting internee-coach link: ${error.message}`);
    }
};



module.exports = {
    interneeCoach,
    interneeCoachById,
    addInterneeCoach,
    updateInterneeCoach,
    deleteInterneeCoach
};
