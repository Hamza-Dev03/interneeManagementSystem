const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachInterness'); 


router.route("/").get(coachController.interneeCoach).post(coachController.createInterneeCoach);
router.route("/:id")
.get(coachController.getInterneeCoachById)
.patch(coachController.updateInterneeCoach)
.delete(coachController.deleteInterneeCoach);


module.exports = router;
