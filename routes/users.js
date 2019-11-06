var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
let User = new userController();
//let session = express.session;
//console.log(session)
/* GET users listing. */
router.get('/',User.getUsers);
router.post('/', User.createUser)
router.get('/:userId', User.getUsersById)
router.put('/:userId', User.updateUser)
router.put('/delete/:userId', User.deleteUser)
module.exports = router;
