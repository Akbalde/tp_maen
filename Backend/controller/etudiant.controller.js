const Etudiant = require('../model/etudiant')


const create = async (req,res)=>{
   try{
    const etudiant = await Etudiant.create(req.body);
    res.send(etudiant)
   }catch(error){
    res.send("une erreur s'est produite")
    console.log(error)
   }
    
}

const getAll = async (req,res)=>{
    const etudiants = await Etudiant.find().populate('departement');
    res.send(etudiants)
}

const update = async (req, res) => {
    console.log("ok");
    const etudiantId = req.params.id;
    const newData = req.body; // Les données mises à jour du formulaire
  
    try {
      // Trouver l'étudiant dans la base de données par ID
      const etudiant = await Etudiant.findById(etudiantId);
  
      if (!etudiant) {
        return res.status(404).json({ message: 'Étudiant non trouvé' });
      }
  
      // Mettez à jour les propriétés nécessaires de l'étudiant
      etudiant.firstname = newData.firstname;
      etudiant.lastname = newData.lastname;
      etudiant.matricule = newData.matricule;
      etudiant.departement = newData.departement;
  
      // Sauvegarder les modifications dans la base de données
      const updatedEtudiant = await etudiant.save();
  
      res.status(200).json(updatedEtudiant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'étudiant' });
    }
  };
  const supprimer = (async (req, res) => {
    const etudiantId = req.params.id;
  
    try {
      // Supprimez l'étudiant de la base de données en utilisant l'ID

      const etudiant = await Etudiant.findByIdAndDelete(etudiantId);
    
      res.status(200).json({ message: 'Étudiant supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'étudiant' });
    }
  });
  


module.exports = {
    create,
    getAll,
    update,
    supprimer
}