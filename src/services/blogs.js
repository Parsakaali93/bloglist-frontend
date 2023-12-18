import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllForUser = (user) => {
  const request = axios.get(baseUrl, user)
  return request.then(response => response.data)
}

const addBlogService = async (user, blog) => {
  console.log('config in addblog service ', JSON.stringify(user))

  const response = await axios.post(baseUrl, blog, user)
  return response.data
}

export default { getAll, getAllForUser, addBlogService }