import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsCRUD from "./pages/ProjectsCRUD";
import BlogsCRUD from "./pages/BlogsCRUD";
import SkillsCRUD from "./pages/SkillsCRUD";
import AboutCRUD from "./pages/AboutCRUD";
import ExperienceCRUD from "./pages/ExperienceCRUD";
import MediaCRUD from "./pages/MediaCRUD";
import MessagesCRUD from "./pages/MessagesCRUD";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                {user ? (
                    <>
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        <Route path="/projects" element={<ProjectsCRUD />} />
                        <Route path="/blogs" element={<BlogsCRUD />} />
                        <Route path="/skills" element={<SkillsCRUD />} />
                        <Route path="/about" element={<AboutCRUD />} />
                        <Route path="/experience" element={<ExperienceCRUD />} />
                        <Route path="/media" element={<MediaCRUD />} />
                        <Route path="/messages" element={<MessagesCRUD />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
