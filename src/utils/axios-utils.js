import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3004",
    headers: {
        'Accept': 'application/json',
    },
});

export const request = ({ ...options }) => {
    // client.defaults.headers.common.Authorization = `Bearer token`;
    const onSuccess = response => response;
    const onError = error => {
        return error;
    }
    return client(options).then(onSuccess).catch(onError);
}