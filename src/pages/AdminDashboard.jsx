import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";
import {useEffect, useState} from "react";

function AdminDashboard() {

        const [counts, setCounts] = useState({
            skills: 0,
            projects: 0,
            blogs: 0,
            messages: 0,
        });

    // Fetch counts from backend
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [skillsRes, projectsRes, blogsRes, messagesRes] = await Promise.all([
                    fetch("http://localhost:8080/api/skills"),
                    fetch("http://localhost:8080/api/projects"),
                    fetch("http://localhost:8080/api/blogs"),
                    fetch("http://localhost:8080/api/messages"),
                ]);

                const skillsData = await skillsRes.json();
                const projectsData = await projectsRes.json();
                const blogsData = await blogsRes.json();
                const messagesData = await messagesRes.json();

                setCounts({
                    skills: skillsData.length,
                    projects: projectsData.length,
                    blogs: blogsData.length,
                    messages: messagesData.length,
                });
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
    }, []);


    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="admin-main">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Portfolio</h1>
                </div>
                <div className="header-right">
                    <p className= "header-date">{new Date().toLocaleDateString()}</p>
                    <p className="header-user">Priya</p>
                    <p className="header-email">admin@example.com</p>
                </div>
            </div>
                <h2> Dashboard</h2>
                <div className="dashboard-cards">
                    <div className="card skills">
                        <h3>Skills</h3>
                        <p>{counts.skills}</p>
                    </div>
                    <div className="card projects">
                        <h3>Projects</h3>
                        <p>{counts.projects}</p>
                    </div>
                    <div className="card blogs">
                        <h3>Blogs</h3>
                        <p>{counts.blogs}</p>
                    </div>
                    <div className="card messages">
                        <h3>Messages</h3>
                        <p>{counts.messages}</p>
                    </div>

                </div>

                <h3> Welcome to CMS </h3>
                <p> Use the sidebar to navigate through different sections and manage your portfolio</p>

            </main>
        </div>
    );
}
export default AdminDashboard;