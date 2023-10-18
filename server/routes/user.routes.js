const express = require('express')
const router = express.Router()
const controller = require('../controller/user.controller')
const validator = require('../validator/user/validation')
const upload = require('../middleware/multer')

// Routes
router.post('/register', validator.register, controller.register)
router.post('/login', validator.login, controller.login)
router.get('/picture/:id', controller.getPicture)
router.post('/upload/:id', upload.single('file'), controller.updatePicture)

module.exports = router