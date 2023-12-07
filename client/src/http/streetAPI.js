import { $authhost, $host } from "./index";

export const createStreet = async (street_name, description) => {
    const { data } = await $authhost.post('api/street', { street_name, description });
    return data
};

export const fetchStreet = async () => {
    const { data } = await $host.post('api/street');
    return data
};


