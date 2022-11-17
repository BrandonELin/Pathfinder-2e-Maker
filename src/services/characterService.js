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

const services = {
    index,
    add
}

export default services