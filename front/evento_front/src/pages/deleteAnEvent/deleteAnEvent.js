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
    const response = await apiFetch(`event/delete/${eventId}`, options)
    console.log(response)

    if (response.message === 'No tienes permiso para eliminar este evento') {
      alert(response.message)
      return
    }
    alert(response.message || 'Evento eliminado correctamente')
    Home()
  } catch (error) {
    alert('Error al intentar eliminar el evento o no tienes permiso.')
  }
}
