import { deleteUser } from '../../pages/deleteUser/deleteUser'
import { Home } from '../../pages/Home/Home'
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister'
import { myEvents } from '../../pages/myEvents/myEvents'
import { postEvent } from '../../pages/postEvent/postEvent'
import { registerForm } from '../../pages/Register/Register'
import './Header.css'

const routes = [
  {
    texto: 'Home',
    funcion: Home
  },
  {
    texto: 'myEvents',
    funcion: myEvents
  },
  {
    texto: 'Publicar',
    funcion: postEvent
  },
  {
    texto: 'Register',
    funcion: registerForm
  },
  {
    texto: 'Login',
    funcion: LoginRegister
  }
]

export const Header = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const nav = document.createElement('nav')

  for (const route of routes) {
    if (route.texto === 'Register' && localStorage.getItem('token')) {
      continue
    }
    const a = document.createElement('a')
    a.href = '#'
    if (route.texto === 'Login' && localStorage.getItem('token')) {
      a.textContent = 'Logout'
      a.addEventListener('click', () => {
        localStorage.clear()
        Header()
      })
    } else {
      if (!localStorage.getItem('token') && route.texto === 'myEvents') {
        continue
      } else {
        a.textContent = route.texto
        a.addEventListener('click', route.funcion)
      }
    }
    nav.append(a)
  }
  if (localStorage.getItem('token')) {
    const deleteAccountBtn = document.createElement('button')
    deleteAccountBtn.textContent = 'Eliminar Cuenta'
    deleteAccountBtn.className = 'delete-account-btn'

    deleteAccountBtn.addEventListener('click', async () => {
      const confirmDelete = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')
      if (confirmDelete) {
        deleteUser()
      }
    })
    nav.append(deleteAccountBtn)
  }
  header.append(nav)
}
