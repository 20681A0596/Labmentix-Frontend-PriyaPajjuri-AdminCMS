/*import { createContext, useState, useEffect } from "react";
import { logout } from "../services/authService";
// Create the context
export const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
    });

    // Keep localStorage in sync when auth changes
    useEffect(() => {
        if (auth.token) {
            localStorage.setItem("token", auth.token);
            localStorage.setItem("role", auth.role);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }, [auth]);

    // Logout function
    const logout = () => {
        setAuth({ token: null, role: null });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}*/
import React, { createContext, useState, useEffect } from "react";
import { logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUser({ token });
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
