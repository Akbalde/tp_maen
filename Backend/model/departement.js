const mongoose = require("mongoose");

const { Schema } = mongoose

const DepartementShema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Departement',DepartementShema)
