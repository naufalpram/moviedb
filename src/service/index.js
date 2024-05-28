import axios from "axios";
const { VITE_API_URL: BASE_URL } = import.meta.env;

const instance = axios.create();

instance.defaults.baseURL = BASE_URL;
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept-Language'] = 'en-US';

export default instance;