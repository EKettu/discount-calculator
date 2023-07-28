import axios from 'axios'

const getAll = (url) => {
  return axios.get(url)
}

const create = (url, newObject) => {
  return axios.post(url, newObject)
}

const update = (url, id, newObject) => {
  return axios.put(`${url}/${id}`, newObject
  );
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}