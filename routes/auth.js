const express = require('express');
const router = express.Router(); 
const authcontroller = require('../controllers/auth');

router.get('/log-in',authcontroller.getlogin);
router.post('/log-in',authcontroller.postlogin);
router.post('/log-out',authcontroller.postlogout);
router.get('/sign-up',authcontroller.getsignup);
router.post('/sign-up',authcontroller.postsignup);

module.exports = router;
