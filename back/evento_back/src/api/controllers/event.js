const { deleteFile } = require('../../utils/delete')
const Event = require('../models/event')

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('asistentes')
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const postEvent = async (req, res, next) => {
  try {
    const { titulo, fecha, descripcion } = req.body
    const userId = req.user.id
    const imagePath = req.file.path
    const newEvent = await Event.create({
      titulo,
      fecha,
      descripcion,
      image: imagePath,
      creator: userId
    })
    return res.status(201).json(newEvent)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldEvent = await Event.findById(id)
    const newEvent = new Event(req.body)
    newEvent._id = id
    newEvent.asistentes = [...oldEvent.asistentes, ...newEvent.asistentes]

    if (req.file) {
      newEvent.image = req.file.path
      deleteFile(oldEvent.image)
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    })
    return res.status(200).json(updatedEvent)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const userRole = req.user.rol

    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    if (event.creator.toString() !== userId.toString() && userRole !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este evento' })
    }

    await Event.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Evento eliminado correctamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Error al intentar eliminar el evento' })
  }
}

module.exports = { getEvents, postEvent, updateEvent, deleteEvent }
