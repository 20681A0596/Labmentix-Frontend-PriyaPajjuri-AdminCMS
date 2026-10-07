/*import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api", // change if deployed
});

// Attach token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or unauthorized → clear storage and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // your backend API
});

// Add token to headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;*/
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // adjust to your backend
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;

