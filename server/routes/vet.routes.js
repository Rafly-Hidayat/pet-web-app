const express = require('express')
const router = express.Router()
const controller = require('../controller/vet.controller')

router.get('/list', controller.getData)

module.exports = router