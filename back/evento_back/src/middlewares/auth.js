const { User } = require('../api/models/user')
const { Event } = require('../api/models/event')
const { verifyToken } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyToken(parsedToken)

    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyToken(parsedToken)

    const user = await User.findById(id)
    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('only admins')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

// const isAdminOrCreator = async (req, res, next) => {
//   try {
//     console.log('Usuario:', req.user)
//     const { id } = req.params
//     console.log('ID evento:', id)
//     const event = await Event.findById(id)
//     const isCreator = req.user._id.toString() === event.creator.toString()
//     const isAdmin = req.user.rol === 'admin'
//     if (!isCreator && !isAdmin) {
//       return res.status(403).json({ message: 'No tienes permisos para eliminar este evento' })
//     }
//     next()
//   } catch (error) {
//     return res.status(400).json({ message: 'Error al verificar pssermisos', error: error.message })
//   }
// }

module.exports = { isAuth, isAdmin }
