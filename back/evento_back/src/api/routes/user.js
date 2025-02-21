const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { getUsers, login, register, updateUserRole, deleteUser, updateUser, getUserById, removeEventFromUser } = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.get('/', [isAuth], getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.put('/update/:userId', updateUserRole)
userRoutes.put('/:id', isAuth, updateUser)
userRoutes.delete('/delete/:userId', deleteUser)
userRoutes.put('/removeEvent/:id', removeEventFromUser)
module.exports = { userRoutes }
