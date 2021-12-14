const router = require('express').Router();

//file imports 
const {register, login, restrictRoutes, protectedRoutes} = require('../controllers/authController')


router.post('/register',register)
router.post('/login', login)




module.exports = router