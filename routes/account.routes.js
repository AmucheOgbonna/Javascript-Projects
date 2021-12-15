const router = require('express').Router();

const {
  createAccount,
  disableUser,
  deleteAccount,
  getAllAccount,
  getUserAccount,
  depositTransaction,
  withdrawalTransaction
} = require('../controllers/accountController');
const {
  protectedRoutes,
  restrictRoutes,
} = require('../controllers/authController');

router.use(protectedRoutes);
router.post('/create', restrictRoutes('admin'), createAccount);//Adds users
router.post('/disable', restrictRoutes('admin'), disableUser);//Disable users
router.post('/delete', restrictRoutes('admin'), deleteAccount);//Delete users
router.get('/all-account', restrictRoutes('admin'), getAllAccount);

router.get('/user-account', getUserAccount);
router.post('/deposit', depositTransaction);
router.post('/withdrawal', withdrawalTransaction);

module.exports = router;
