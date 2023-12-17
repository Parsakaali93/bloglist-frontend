import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllForUser = (user) => {
  const request = axios.get(baseUrl, user)
  return request.then(response => response.data)
}

export default { getAll, getAllForUser }