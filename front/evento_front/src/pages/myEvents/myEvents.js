import { createEvent } from '../Home/Home'
import './myEvents.css'

export const myEvents = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''
  main.className = 'main-container'

  const user = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(`http://localhost:3000/api/v1/users/${user._id}`)

  const userId = await res.json()
  createEvent(userId.events, main)
}
