const DeptController = require('../controller/departement.controller')
const express = require('express')
const router = express.Router()

router.post('/',DeptController.create)
router.get('/',DeptController.getAll)


module.exports = router

