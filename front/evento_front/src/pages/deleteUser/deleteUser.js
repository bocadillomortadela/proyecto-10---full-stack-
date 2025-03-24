import { apiFetch } from '../../components/apiFetch/apiFetch'
import { Header } from '../../components/Header/Header'

export const deleteUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  const res = await apiFetch(`users/delete/${user._id}`, options)
  if (res === 'user deleted') {
    alert('Eliminado correctamente')
    console.log('Eliminado correctamente')
    localStorage.clear()
    Header()
  } else {
    alert('Error al eliminar el usuario')
  }
}
