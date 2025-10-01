import axios from "axios";

const URL = 'https://api.tvmaze.com';

const api = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

export default api
