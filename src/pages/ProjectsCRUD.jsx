/*import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../services/projectService";

function ProjectsCRUD() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", githubUrl: "" });

    useEffect(() => { getProjects().then(setProjects); }, []);

    const handleCreate = async () => {
        const newProj = await createProject(form);
        setProjects([...projects, newProj]);
        setForm({ title: "", description: "", githubUrl: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateProject(id, form);
        setProjects(projects.map(p => p.id === id ? updated : p));
    };

    const handleDelete = async (id) => {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
    };

    return (
        <div className="page">
            <h1>Manage Projects</h1>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
            <input value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} placeholder="GitHub URL" />
            <button onClick={handleCreate}>Add Project</button>
            <ul>
                {projects.map(p => (
                    <li key={p.id}>
                        {p.title} - {p.description}
                        <button onClick={() => handleUpdate(p.id)}>Edit</button>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ProjectsCRUD;*/
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/admin.css";

function ProjectsCRUD() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });

    useEffect(() => {
        api.get("/projects").then((res) => setProjects(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await api.post("/projects", form);
        setProjects([...projects, data]);
        setForm({ title: "", description: "" });
    };

    const handleDelete = async (id) => {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter((p) => p.id !== id));
    };

    return (
        <div className="crud-page">
            <h2>Manage Projects</h2>
            <form onSubmit={handleSubmit} className="crud-form">
                <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                <button type="submit">Add Project</button>
            </form>

            <ul className="crud-list">
                {projects.map((p) => (
                    <li key={p.id}>
                        <strong>{p.title}</strong> - {p.description}
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectsCRUD;
