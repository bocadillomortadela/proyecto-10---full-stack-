const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const { generateToken } = require('../../utils/jwt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('events')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('events')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName })

    if (userDuplicated) {
      return res.status(400).json('User already exists')
    }

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
      rol: 'user'
    })

    const user = await newUser.save()
    const token = generateToken(user._id)
    return res.status(201).json({ user, token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })

    if (!user) {
      return res.status(400).json('usuario o contraseña incorrectos')
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id)
      return res.status(200).json({ token, user })
    } else {
      return res.status(400).json('usuario o contraseña incorrectos')
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { events } = req.body

    if (!events) {
      return res.status(400).json({ error: "El campo 'events' es obligatorio" })
    }

    const eventsArray = Array.isArray(events) ? events : [events]

    const userUpdated = await User.findByIdAndUpdate(id, { $addToSet: { events: { $each: eventsArray } } }, { new: true })

    if (!userUpdated) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(200).json(userUpdated)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Ocurrió un error en el servidor' })
  }
}

const updateUserRole = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const { rol } = req.body
    const user = await User.findByIdAndUpdate(userId, { rol }, { new: true })
    if (!user) {
      return res.status(400).json('user not found')
    }
    return res.status(200).json('updated')
  } catch (error) {
    return res.status(400).json(error.status)
  }
}
const removeEventFromUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { eventId } = req.body

    if (!eventId) {
      return res.status(400).json('eventId es obligatorio')
    }
    const userUpdated = await User.findByIdAndUpdate(id, { $pull: { events: eventId } }, { new: true })

    if (!userUpdated) {
      return res.status(404).json('usuario no encontrado')
    }
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(500).json('error con el servidor')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = req.params.userId

    const userDeleted = await User.findByIdAndDelete(deleteUser)
    if (!userDeleted) {
      return res.status(400).json('user not found')
    }
    return res.status(200).json('user deleted')
  } catch (error) {
    return res.status(400).json('error')
  }
}

module.exports = { getUsers, login, register, updateUserRole, deleteUser, updateUser, getUserById, removeEventFromUser }
