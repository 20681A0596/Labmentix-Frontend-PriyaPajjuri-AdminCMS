/*import api from "./api";

// Login request
export const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    return res.data; // { token, role }
};

// Logout (optional helper)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
};

*/
import api from "./api";

export const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
};
