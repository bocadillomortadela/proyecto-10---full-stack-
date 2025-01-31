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
  const form = document.createElement('form')
  const email = document.createElement('input')
  const inputUserName = document.createElement('input')
  const inputPass = document.createElement('input')
  const button = document.createElement('button')
  const backtoLogin = document.createElement('a')

  email.placeholder = 'email'
  inputUserName.placeholder = 'username'
  inputPass.placeholder = '******'
  inputPass.type = 'password'
  button.textContent = 'Register'
  backtoLogin.textContent = 'Volver a login'
  backtoLogin.href = '#'

  form.append(email, inputUserName, inputPass, button, backtoLogin)

  form.addEventListener('submit', () => {
    submit(email.value, inputUserName.value, inputPass.value)
  })
  backtoLogin.addEventListener('click', () => {
    LoginRegister()
  })

  mainElement.append(form)
}

const submit = async (email, userName, password) => {
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
  localStorage.setItem('token', finalRes.token)
  localStorage.setItem('user', JSON.stringify(finalRes))
  LoginRegister()
  Header()
}
