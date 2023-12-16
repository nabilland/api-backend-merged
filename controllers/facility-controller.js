// controllers/facility-controller.js

const db = require('../lib/db.js');

module.exports = {

    updateFacilityName: (req, res) => {
        const userId = req.params.id;

        if(!userId){
            return res.status(400).json({
                error: 'Bad request: Missing user ID',
            });
        }

        const { facility_name } = req.body;

        // Check if data for the user already exists in collectors table
        const selectQuery = `SELECT * FROM facilities WHERE user_id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error checking facility data:', error);
                return res.status(500).json({
                    error: 'An internal server error has occurred',
                });
            }
            if (results && results.length > 0) {
                // Data already exists, perform UPDATE
                const updateQuery = `UPDATE facilities SET facility_name = ? WHERE user_id = ?`;
                db.query(updateQuery, [facility_name, userId], (error) => {
                    if (error) {
                        console.error('Error updating facility name:', error);
                        return res.status(500).json({
                            error: 'An internal server error has occurred',
                        });
                    }
                    res.status(200).json({
                        message: 'Facility Name updated successfully',
                    });
                });
            }
        });
    },

    getUserDataByID: (req, res) => {
        const facilityId  = req.params.id;

        if(!facilityId){
            return res.status(400).json({
                error: 'Bad request: Missing facility ID',
            });
        }

        const selectQuery = `SELECT * FROM facilities OUTER JOIN users ON facilities.user_id = users.id WHERE id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user profile:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            const userData = results.map(user => ({
                collector_name: user.name,
                email: user.email,
                phone: user.phone,
                facility_name: user.facility_name,
            }));
            res.status(200).json(userData);
        });
    },

    getFacilityNameById: (req, res) => {
        const facilityId  = req.params.id;

        if(!facilityId){
            return res.status(400).json({
                error: 'Bad request: Missing facility ID',
            });
        }

        const selectQuery = `SELECT facility_name FROM facilities WHERE id = ?`;
        
        db.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user profile:', error);
                return res.status(500).json({
                    error: 'An internal server error occured',
                });
            }
            const userData = results.map(facility => ({
                facility_name: facility.facility_name,
            }));
            res.status(200).json(userData);
        });
    },

}