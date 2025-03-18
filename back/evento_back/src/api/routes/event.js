const { isAuth, isAdmin, isAdminOrCreator } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { getEvents, postEvent, deleteEvent, updateEvent } = require('../controllers/event')

const eventRoutes = require('express').Router()

eventRoutes.get('/', getEvents)
eventRoutes.post('/', [isAuth], upload.single('image'), postEvent)
eventRoutes.put('/:id', [isAuth], upload.single('image'), updateEvent)
eventRoutes.delete('/delete/:id', [isAuth], deleteEvent)

module.exports = { eventRoutes }
