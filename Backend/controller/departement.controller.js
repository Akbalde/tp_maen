const Departement = require('../model/departement')


const create = async (req,res)=>{
   try{
    const dept = await Departement.create(req.body);
    res.send(dept)
   }catch(error){
    res.send("une erreur s'est produite")
    console.log(error)
   }
    
}

const getAll = async (req,res)=>{
    const departements = await Departement.find();
    res.send(departements)
}


module.exports = {
    create,
    getAll
}