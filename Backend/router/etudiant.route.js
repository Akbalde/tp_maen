const EtudiantController = require('../controller/etudiant.controller')
const express = require('express')
const router = express.Router()

router.post('/',EtudiantController.create)
router.get('/',EtudiantController.getAll)
router.put('/:id',EtudiantController.update)
router.delete('/:id',EtudiantController.supprimer)




module.exports = router

