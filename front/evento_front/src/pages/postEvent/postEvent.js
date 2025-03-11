import { loader } from '../../components/loader/loader'
import { Home } from '../Home/Home'
import { myEvents } from '../myEvents/myEvents'
import { registerForm } from '../Register/Register'
import './postEvent.css'

export const postEvent = () => {
  const main = document.querySelector('main')
  main.textContent = ''
  const postEventDiv = document.createElement('div')
  postEventDiv.id = 'postEvent'

  publish(postEventDiv)
  main.append(postEventDiv)
}

const publish = (mainElement) => {
  const form = document.createElement('form')
  form.innerHTML = ''
  const div = document.createElement('div')
  const userLoggedIn = localStorage.getItem('token')
  if (userLoggedIn) {
    const publicar = document.createElement('h2')
    const title = document.createElement('input')
    const date = document.createElement('input')
    const description = document.createElement('input')
    const image = document.createElement('input')
    const publishButton = document.createElement('button')
    publicar.textContent = 'PUBLICAR'
    title.placeholder = 'event title'
    date.placeholder = 'event date'
    date.type = 'date'
    image.type = 'file'
    description.placeholder = 'event description'
    publishButton.textContent = 'Publicar'
    const today = new Date().toISOString().split('T')[0]
    date.type = 'date'
    date.placeholder = 'Event date'
    date.min = today
    form.append(publicar, title, date, description, image, publishButton)

    form.addEventListener('submit', () => {
      submit(title.value, date.value, description.value, image.files[0], form)
    })
  } else {
    const accountNeedP = document.createElement('p')
    const accountNeedRegister = document.createElement('a')
    accountNeedP.textContent = `Necesitas hacer login para publicar  `
    accountNeedRegister.textContent = 'Login'
    accountNeedRegister.href = '#'
    div.append(accountNeedP)
    accountNeedRegister.addEventListener('click', (event) => {
      event.preventDefault()
      registerForm()
    })
    accountNeedP.append(accountNeedRegister)
  }

  mainElement.append(form)
  mainElement.append(div)
}

const submit = async (title, date, description, image, form) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    alert('Por favor, introduce una fecha válida en formato YYYY-MM-DD.')
    return
  }
  const main = document.querySelector('main')

  form.style.display = 'none'
  const loading = loader()
  loading.style.display = 'flex'
  loading.style.justifyContent = 'center'
  loading.style.alignItems = 'center'
  main.appendChild(loading)

  const formData = new FormData()
  formData.append('titulo', title)
  formData.append('fecha', date)
  formData.append('descripcion', description)
  formData.append('image', image)
  const token = localStorage.getItem('token')
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const res = await fetch('http://localhost:3000/api/v1/event/', options)
    loading.remove()
    const existingError = form.querySelector('.error')
    if (existingError) {
      existingError.remove()
    }
    if (res.status === 400) {
      const errorMessage = document.createElement('p')
      errorMessage.classList.add('error')
      errorMessage.textContent = 'not authorized'
      errorMessage.style = 'color: red'
      form.append(errorMessage)
      return
    }
    const finalres = await res.json()
    console.log(finalres)
    Home()
  } catch (error) {
    loading.remove()
    form.style.display = 'block'
    alert('Hubo un error al publicar el evento. Inténtalo de nuevo.')
  }
}
