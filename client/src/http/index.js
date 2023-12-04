import axios from 'axios'

const $host = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL

})
const $authhost = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

const authInterceptor = config =>{
    config.header.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authhost.interceptors.request.use(authInterceptor)

export{
    $host,
    $authhost
}