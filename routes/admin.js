var express = require('express');
const {adminsearch,adduser,sessionlogin,adminsignout,adduserpost,deleteuser,editUsers,edituser,adminlogin,adminhome} = require('../middleware/adminmidleware');
var router = express.Router();



router.get('/',sessionlogin);

router.get('/signout',adminsignout);

router.get('/adduser',adduser)

router.post('/adduserpost',adduserpost)

router.get('/adminhome',adminhome);

router.post('/adminlogin',adminlogin)

router.get('/edituser',edituser)

router.put('/edituser',editUsers)

router.get('/deleteuser',deleteuser)

router.get('/adminsearch',adminsearch)



module.exports = router;






























// const userhelper = require('../helper/userhelper');
// const sessionsignout = require('../middleware/adminmidleware');