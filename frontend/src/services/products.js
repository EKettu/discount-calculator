import axios from 'axios'
import { BASE_URL } from './config';

const baseUrl = `${BASE_URL}/products`

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject
  );
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}