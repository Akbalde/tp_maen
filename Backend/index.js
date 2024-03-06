const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser')
const deptRoute = require('./router/departement.route')
const etudiantRoute = require('./router/etudiant.route')

const app = express()

app.use(cors({ origin: "*" }))

mongoose.connect('mongodb://127.0.0.1:27017/gest_etudiant').then((response) => {
    console.log("connected successfully")
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())







app.use('/departement/', deptRoute)
app.use('/etudiant/', etudiantRoute)



app.use((req, res) => {
    res.status(404).send("Route inexistante !")
})


app.listen(3000, () => {
    console.log("lisen on port 3000")
})