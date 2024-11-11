const express = require("express")
const router = express.Router();
const coachControllers = require('../controllers/coaches');


//coach
router.route("/").get(coachControllers.getCoachData).post(coachControllers.createCoach);

router.route("/:id")
.get(coachControllers.getCoachById)
.patch(coachControllers.updateCoachData)
.delete(coachControllers.deleteCoach);

module.exports = router ;