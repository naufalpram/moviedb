import axios from "axios";
import { BASE_URL, IMAGE_FETCH_URL } from "../config";

const instance = axios.create();

instance.defaults.baseURL = BASE_URL;
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept-Language'] = 'en-US';

export default instance;