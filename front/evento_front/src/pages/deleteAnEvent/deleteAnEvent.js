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
  const res = await fetch(`http://localhost:3000/api/v1/event/delete/${eventId}`, options)
  const response = await res.json()
  console.log(response)

  if (res.ok) {
    alert('se ha eliminado')
    Home()
  }
}
