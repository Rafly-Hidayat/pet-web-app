const express = require('express')
const router = express.Router()
const controller = require('../controller/user')
const validator = require('../validator/user/validation')

// Routes
router.post('/register', validator.register, controller.register)
router.post('/login', validator.login, controller.login)
router.get('/list-vet', controller.getListVet)

module.exports = router