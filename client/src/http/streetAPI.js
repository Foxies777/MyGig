import { $authhost, $host } from "./index";

export const createStreet = async (street_name, description) => {
    const { data } = await $authhost.post('api/street', { street_name, description });
    return data
};

export const fetchStreet = async () => {
    const { data } = await $host.get('api/street');
    return data
};

export const updateStreet = async (id, street_name, description) => {
    const { data } = await $authhost.put(`api/street/update/${id}`, { street_name, description });
    return data;
};

export const deleteStreet = async (id) => {
    const { data } = await $authhost.delete(`api/street/delete/${id}`);
    return data;
};

export const searchStreetsByName = async (street_name) => {
    const { data } = await $host.get(`api/street/search`, {
        params: {
            street_name
        }
    });
    return data;
};