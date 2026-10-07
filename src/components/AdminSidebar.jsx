import { Link } from "react-router-dom";

import "../styles/admin.css";

function AdminSidebar() {
    return (
        <aside className="sidebar">


                <h2>CMS</h2>
                <div className="sidebar-buttons">

                <Link to="/projects"  className="sidebar-btn">Projects</Link>
                <Link to="/blogs" className="sidebar-btn">Blogs</Link>
                <Link to="/skills" className="sidebar-btn">Skills</Link>
                <Link to="/about" className="sidebar-btn">About</Link>
                <Link to="/experience" className="sidebar-btn">Experience</Link>
                <Link to="/media" className="sidebar-btn">Media</Link>
                <Link to="/messages"  className="sidebar-btn">Messages</Link>
                <Link to="/education" className="sidebar-btn">Education</Link>
                </div>
        </aside>
    );
}
export default AdminSidebar;

