const express = require("express")
const app = express()
const router = express.Router();
const interneesController = require('../controllers/internes');

//const{getDataById,createInterne,updateInterneData,deleteInterne,getInterneeData}=require("../controllers/internes");


router.route("/").get(interneesController.getInterneeData).post(interneesController.createInterne);

router.route("/:id")
.get(interneesController.getDataById)
.patch(interneesController.updateInterneData)
.delete(interneesController.deleteInterne);



module.exports = router ;