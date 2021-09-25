import axios from "axios";
import { BASE_URL, APP_AUTHORIZATION_STORAGE_TOKEN } from "../../config/app";
import { errorHandler } from "../helpers";

const instance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem(APP_AUTHORIZATION_STORAGE_TOKEN);
        if (!config.headers['Authorization'] && authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => errorHandler(error)
);

instance.interceptors.response.use(
    (response) => response.data,
    (error) => errorHandler(error)
);

export default instance;
