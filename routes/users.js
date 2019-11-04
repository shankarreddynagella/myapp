var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
let User = new userController();
//let session = express.session;
//console.log(session)
/* GET users listing. */
router.get('/',User.getUsers);
router.post('/', User.createUser)
module.exports = router;
