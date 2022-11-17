import axios from 'axios'

const getToken = () => {
    let token = localStorage.getItem("token")
    return token ? token : ''
}

const axiosCharacters = () => axios.create({
    baseURL: 'http://localhost:8080/characters',
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
})

const index = () => {
    return axiosCharacters().get('/index')
}

const add = (newCharacter) => {
    return axiosCharacters().post('/add', newCharacter)
}

const deleteCharacter = (id) => {
    return axiosCharacters().delete(`/${id}/delete`)
}

const editCharacter = (id, newCharacter) => {
    return axiosCharacters().put(`/${id}/edit`, newCharacter)
}

const getCharacter = (id) => {
    return axiosCharacters().get(`/${id}`)
}

const services = {
    index,
    add,
    deleteCharacter,
    editCharacter,
    getCharacter
}

export default services