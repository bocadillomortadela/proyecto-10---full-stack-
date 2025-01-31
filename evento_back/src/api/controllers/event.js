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
    const imagePath = req.file.path
    const newEvent = await Event.create({
      titulo,
      fecha,
      descripcion,
      image: imagePath
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
    const event = await Event.findByIdAndDelete(id)
    return res.status(200).json({ eventoEliminado: event })
  } catch (error) {
    return res.status(400).json('error')
  }
}

module.exports = { getEvents, postEvent, updateEvent, deleteEvent }
