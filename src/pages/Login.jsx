/*import { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "./admin.css";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(form.username, form.password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            setAuth({ token: data.token, role: data.role });
            window.location.href = "/admin";
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="page">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;
import React, { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

function Login() {
    const { setUser } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(form);
        setUser(data.user);
        window.location.href = "/dashboard";
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;*/
/*
import { useState } from "react";
import "../styles/admin.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "/admin"; // Redirect to dashboard
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server not reachable. Check backend connection.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;*/
/*
import { useState } from "react";
import "../styles/admin.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }), // send username instead of email
            });

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "/admin"; // Redirect to dashboard
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server not reachable. Check backend connection.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;*/
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/admin.css";

function Login() {
    const [email, setEmail] = useState("");       // ✅ use email
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // ✅ send email + password
            });

            if (response.ok) {
                const data = await response.json(); // backend returns user info
                setUser(data);                      // save user in context
                navigate("/dashboard");             // ✅ redirect to dashboard
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server not reachable. Check backend connection.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
