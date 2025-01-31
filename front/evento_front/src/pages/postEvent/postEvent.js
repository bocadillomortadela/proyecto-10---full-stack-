import { myEvents } from '../myEvents/myEvents'
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
  const title = document.createElement('input')
  const date = document.createElement('input')
  const description = document.createElement('input')
  const image = document.createElement('input')
  const publishButton = document.createElement('button')
  const accountNeedP = document.createElement('p')
  const accountNeedRegister = document.createElement('a')

  title.placeholder = 'event title'
  date.placeholder = 'event date'
  image.type = 'file'
  description.placeholder = 'event description'
  publishButton.textContent = 'Publicar'
  accountNeedP.textContent = `Necesitas hacer login para publicar `
  accountNeedRegister.textContent = 'Login'

  form.append(title, date, description, image, publishButton, accountNeedP, accountNeedRegister)
  form.addEventListener('submit', () => {
    submit(title.value, date.value, description.value, image.files[0], form)
  })
  mainElement.append(form)
}

const submit = async (title, date, description, image, form) => {
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

  const res = await fetch('http://localhost:3000/api/v1/event/', options)
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
}
