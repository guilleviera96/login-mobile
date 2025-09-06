import axios from "axios";
const axios = require('axios');
const URL = 'https://template-express-api.onrender.com';

const api = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

export default api
