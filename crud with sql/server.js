const connection = require('../crud with sql/connection')
const express = require("express")
const bodyParser = require("body-parser")
const coachesRoutes = require('./routes/coaches_management');
const interneecoachs=require("./routes/interneescoach")
const app = express();



app.use(bodyParser.json())


app.use("/api/internee",require("../crud with sql/routes/interness_management"));
app.use("/api/coaches",coachesRoutes);
app.use("/api/interneescoach",interneecoachs);
const port = 5000 ;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
