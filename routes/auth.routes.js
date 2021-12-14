const router = require('express').Router();

//file imports 
const {register} = require('../controllers/authController')


router.post('/register', register)



module.exports = router