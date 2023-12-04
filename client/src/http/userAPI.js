import { $authhost, $host } from "./index";

export const registration = async (login, email, password) =>{
    const response = await $host.post('api/user/registration', {login, email,password, role: 'ADMIN'})
    return response
}
export const login = async (login, email, password) =>{
    const response = await $host.post('api/user/login', {login, email,password})
    return response
}
export const check = async () =>{
    const response = await $host.post('api/user/registration')
    return response
}