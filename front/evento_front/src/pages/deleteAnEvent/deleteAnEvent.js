import { apiFetch } from '../../components/apiFetch/apiFetch'
import { Home } from '../Home/Home'

export const deleteAnEvent = async (eventId) => {
  const confirmDelete = confirm('estas seguro de eliminar este evento?')

  if (!confirmDelete) {
    return
  }
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  try {
    const data = await apiFetch(`event/delete/${eventId}`, options)
    if (!data.ok) {
      alert(data)
    } else {
      alert('se ha eliminado')
    }

    Home()
  } catch (error) {
    alert('Error al intentar eliminar el evento o no tienes permiso.')
  }
}
