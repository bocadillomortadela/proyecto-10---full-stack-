export const apiFetch = async (endpoint, options = {}) => {
  const url = 'http://localhost:3000/api/v1'
  const res = await fetch(`${url}/${endpoint}`, options)
  return res.json()
}
