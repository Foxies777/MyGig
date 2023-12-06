import { $authhost, $host } from "./index";

export const createStreet = async (street, description) => {
    const { data } = await $authhost.post('api/street', { street, description });
    return data
};

export const fetchStreet = async () => {
    const { data } = await $host.post('api/street');
    return data
};


