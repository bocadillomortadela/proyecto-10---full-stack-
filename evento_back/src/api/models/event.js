const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true },
    image: { type: String, required: true },
    asistentes: [{ type: mongoose.Types.ObjectId, required: false, ref: 'user' }]
  },
  {
    timestamps: true,
    collection: 'events'
  }
)

const Event = mongoose.model('event', eventSchema, 'event')
module.exports = Event
