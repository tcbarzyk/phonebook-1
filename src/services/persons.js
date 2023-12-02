import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = (person) => {
    const requst = axios.post(baseUrl, person)
    return requst.then(response => response.data)
}

const removePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (person, id) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAll, addPerson, removePerson, updatePerson }