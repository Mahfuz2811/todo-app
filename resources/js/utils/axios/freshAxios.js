import axios from "axios";
import { BASE_URL } from "../../config/app";
import { errorHandler } from "../helpers";

const instance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => errorHandler(error)
);

instance.interceptors.response.use(
    (response) => response.data,
    (error) => errorHandler(error)
);

export default instance;
