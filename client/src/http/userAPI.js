import { $authhost, $host } from "./index";
import * as jwt_decode from 'jwt-decode';
export const registration = async (login, email, password) =>{
    const {data} = await $host.post('api/user/registration', {login, email,password, role: 'ADMIN'})
    return jwt_decode(data.token)
}
export const login = async (login, email, password) =>{
    const {data} = await $host.post('api/user/login', {login, email,password})
    return jwt_decode(data.token)
}
export const check = async () =>{
    const response = await $host.post('api/user/registration')
    return response
}