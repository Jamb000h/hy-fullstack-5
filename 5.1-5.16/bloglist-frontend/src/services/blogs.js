import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject, id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, create, update, setToken }