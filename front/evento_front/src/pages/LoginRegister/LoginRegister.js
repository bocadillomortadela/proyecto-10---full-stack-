import { apiFetch } from '../../components/apiFetch/apiFetch'
import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import { registerForm } from '../Register/Register'
import './LoginRegister.css'

export const LoginRegister = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loginDiv = document.createElement('div')

  login(loginDiv)
  loginDiv.id = 'login'

  main.append(loginDiv)
}

const login = (mainElement) => {
  const LoginText = document.createElement('h2')
  const form = document.createElement('form')
  const input = document.createElement('input')
  const inputpass = document.createElement('input')
  const button = document.createElement('button')
  const p = document.createElement('p')
  const registerLink = document.createElement('a')

  LoginText.textContent = 'LOGIN'
  p.textContent = `No tienes cuenta? `
  registerLink.textContent = 'Registrarse'
  registerLink.href = '#'

  input.placeholder = 'username'
  inputpass.placeholder = `******`
  inputpass.type = 'password'
  button.textContent = 'Login'
  mainElement.append(form)

  p.append(registerLink)
  form.append(LoginText)
  form.append(input)
  form.append(inputpass)
  form.append(button)
  form.append(p)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    submit(input.value, inputpass.value, form)
  })

  registerLink.addEventListener('click', (event) => {
    event.preventDefault()
    registerForm()
  })
}

const submit = async (userName, password, form) => {
  const finalObject = JSON.stringify({
    userName,
    password
  })

  const options = {
    method: 'POST',
    body: finalObject,
    headers: {
      'content-Type': 'application/json'
    }
  }
  const res = await apiFetch('users/login', options)

  if (res.status === 400) {
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('error')
    errorMessage.textContent = 'Wrong username or password'
    errorMessage.style = 'color: red'
    form.append(errorMessage)
    return
  }
  const errorMessage = document.querySelector('.error')
  if (errorMessage) {
    errorMessage.remove()
  }

  localStorage.setItem('token', res.token)
  localStorage.setItem('user', JSON.stringify(res.user))
  Home()
  Header()
}
