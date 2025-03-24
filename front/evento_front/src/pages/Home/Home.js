import { apiFetch } from '../../components/apiFetch/apiFetch'
import { loader } from '../../components/loader/loader'
import { deleteAnEvent } from '../deleteAnEvent/deleteAnEvent'
import { myEvents } from '../myEvents/myEvents'
import './Home.css'

export const Home = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const main = document.querySelector('main')
  main.innerHTML = ''
  main.className = 'main-container'
  const loading = loader()
  main.appendChild(loading)

  try {
    const event = await apiFetch('event')
    console.log(event)

    loading.remove()
    if (!user) {
      const mensaje = document.createElement('p')
      mensaje.textContent = 'inicia sesión para ver los eventos'
      main.append(mensaje)
    } else {
      createEvent(event, main)
    }
  } catch (error) {
    loading.remove()
  }
}

export const createEvent = (events, mainElement) => {
  const user = JSON.parse(localStorage.getItem('user')) || null

  for (const event of events) {
    const eventDiv = document.createElement('div')
    const title = document.createElement('h3')
    const date = document.createElement('p')
    const formattedDate = new Date(event.fecha).toISOString().split('T')[0]
    const description = document.createElement('p')
    const image = document.createElement('img')
    const like = document.createElement('img')
    like.className = 'like'
    const deleteEventButton = document.createElement('button')
    deleteEventButton.textContent = 'Eliminar evento'

    if (user && user.events) {
      like.addEventListener('click', () => {
        if (user.events.includes(event._id)) {
          removeAsistentes(event._id)
        } else {
          addAsistentes(event._id)
        }
      })
      like.src = user.events.includes(event._id) ? '/assets/accept.png' : '/assets/dry-clean.png'
    }

    eventDiv.className = 'event'
    title.textContent = event.titulo
    date.textContent = formattedDate
    description.textContent = event.descripcion
    image.src = event.image

    eventDiv.append(title, date, description, image, like)

    if ((user && user._id === event.creator) || user.rol === 'admin') {
      deleteEventButton.addEventListener('click', () => {
        deleteAnEvent(event._id)
      })
      eventDiv.append(deleteEventButton)
    } else {
      deleteEventButton.style.display = 'none'
    }
    mainElement.append(eventDiv)
  }
}

const addAsistentes = async (eventId) => {
  const user = JSON.parse(localStorage.getItem('user'))
  user.events = [...user.events, eventId]

  const finalObject = JSON.stringify({
    events: [eventId]
  })
  console.log('finalObject:', finalObject)
  const options = {
    method: 'PUT',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: finalObject
  }
  try {
    const res = await apiFetch(`users/${user._id}`, options)
    console.log(res)
    localStorage.setItem('user', JSON.stringify(user))
    myEvents()
  } catch (error) {
    console.error('Error al añadir asistente:', error)
  }
}

const removeAsistentes = async (eventId) => {
  const user = JSON.parse(localStorage.getItem('user'))

  user.events = user.events.filter((id) => id !== eventId)

  const finalObject = JSON.stringify({
    eventId
  })

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: finalObject
  }
  try {
    const res = await apiFetch(`users/removeEvent/${user._id}`, options)
    localStorage.setItem('user', JSON.stringify(user))
    myEvents()
  } catch (error) {
    console.error('Error al remover asistente:', error)
  }
}
