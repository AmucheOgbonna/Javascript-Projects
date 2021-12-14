const router = require('express').Router();

//file imports 
const {protectedRoutes,myProfile } = require('../controllers/authController')

router.use(protectedRoutes)
router.get('/profile',  myProfile)

module.exports = router