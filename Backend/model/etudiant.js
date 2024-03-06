const mongoose = require("mongoose");

const { Schema } = mongoose

const EtudiantShema = new Schema({
    firstname:String,
    lastname:String,
    matricule:{
        type:String,
        unique:true
    },
    departement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Departement'
    }
},{timestamps:true})

module.exports = mongoose.model('Etudiant',EtudiantShema)


