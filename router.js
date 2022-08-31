const express = require('express')
const router = express.Router();
const { checkAdmin, checkLoggedIn, checkLoggedUser } = require('./middleware/check')
const { editLoggedUser, editUser, deleteUser, findAllUsers, findUser, login, register } = require('./controller/user');
var bodyParser = require('body-parser')
const notFound = (error, req, res) => {
    res.send(error)
}

router.use(bodyParser.json())
router.post('/login', login)
router.post('/register', register)
//router.post('/user', createUser)
router.get('/users',checkLoggedIn ,findAllUsers)
router.get('/user', findUser)
router.put('/editme', checkLoggedUser, editLoggedUser)
router.put('/user', checkAdmin,editUser)
router.delete('/user',checkAdmin, deleteUser)
router.use(notFound);

module.exports = router;