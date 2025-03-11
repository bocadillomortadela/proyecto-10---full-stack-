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

  const res = await fetch(`http://localhost:3000/api/v1/users/${user._id}`)
  console.log(res)

  const userId = await res.json()

  if (userId.events.length > 0) {
    message.style.display = 'none'
    createEvent(userId.events, main)
  }
}
