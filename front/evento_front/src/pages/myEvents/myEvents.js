import { apiFetch } from '../../components/apiFetch/apiFetch'
import { createEvent, Home } from '../Home/Home'
import './myEvents.css'

export const myEvents = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  main.className = 'main-container'
  const user = JSON.parse(localStorage.getItem('user'))

  const message = document.createElement('h2')
  const addEventP = document.createElement('a')
  message.textContent = 'aqui veras los eventos que asistes '
  addEventP.textContent = 'añadir'
  addEventP.className = 'hoverP'
  addEventP.addEventListener('click', (event) => {
    event.preventDefault()
    Home()
  })

  message.append(addEventP)
  main.append(message)
  try {
    const res = await apiFetch(`users/${user._id}`)
    console.log(res)

    if (res.events.length > 0) {
      message.style.display = 'none'
      createEvent(res.events, main)
    }
  } catch (error) {
    alert('Hubo un problema al ver eventos.')
  }
}
