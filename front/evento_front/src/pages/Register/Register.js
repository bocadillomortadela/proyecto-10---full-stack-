import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import { LoginRegister } from '../LoginRegister/LoginRegister'
import './Register.css'

export const registerForm = () => {
  const main = document.querySelector('main')
  main.textContent = ''
  const registerDiv = document.createElement('div')
  registerDiv.id = 'register'
  register(registerDiv)

  main.append(registerDiv)
}

const register = (mainElement) => {
  const registerText = document.createElement('h2')
  const form = document.createElement('form')
  const email = document.createElement('input')
  const inputUserName = document.createElement('input')
  const inputPass = document.createElement('input')
  const button = document.createElement('button')
  const backtoLogin = document.createElement('a')
  const errorMsg = document.createElement('p')

  registerText.textContent = 'REGISTER'
  email.placeholder = 'email'
  inputUserName.placeholder = 'username'
  inputPass.placeholder = '******'
  inputPass.type = 'password'
  button.textContent = 'Register'
  backtoLogin.textContent = 'Volver a login'
  backtoLogin.href = '#'
  errorMsg.style.color = 'red'
  errorMsg.style.display = 'none'

  form.append(registerText, email, errorMsg, inputUserName, inputPass, button, backtoLogin)

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await submit(email.value, inputUserName.value, inputPass.value, errorMsg)
  })
  backtoLogin.addEventListener('click', () => {
    LoginRegister()
  })

  mainElement.append(form)
}

const submit = async (email, userName, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert('Por favor, introduce un email válido.')
    return
  }
  const finalObject = JSON.stringify({
    email,
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
  const res = await fetch('http://localhost:3000/api/v1/users/register', options)
  const finalRes = await res.json()
  console.log(finalRes)

  if (typeof finalRes === 'string' && finalRes.toLowerCase().includes('user already exists')) {
    alert('El usuario ya existe. Prueba con otro email o usuario.')
    return
  }

  localStorage.setItem('token', finalRes.token)
  localStorage.setItem('user', JSON.stringify(finalRes.user))

  Header()
  LoginRegister()
  Home()
}
