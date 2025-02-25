import { Header } from '../../components/Header/Header'

export const deleteUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  const res = await fetch(`http://localhost:3000/api/v1/users/delete/${user._id}`, options)
  if (res.ok) {
    alert('eliminado correctamente')
    console.log(`eliminado correctamente`)
    localStorage.clear()
    Header()
  }
}
