/*import { useEffect, useState } from "react";

import "../styles/admin.css";

function SkillsCRUD() {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({ name: "" });

    useEffect(() => { getSkills().then(setSkills); }, []);

    const handleCreate = async () => {
        const newSkill = await createSkill(form);
        setSkills([...skills, newSkill]);
        setForm({ name: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateSkill(id, form);
        setSkills(skills.map(s => s.id === id ? updated : s));
    };

    const handleDelete = async (id) => {
        await deleteSkill(id);
        setSkills(skills.filter(s => s.id !== id));
    };

    return (
        <div className="skills-crud">
            <h1>Manage Skills</h1>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Skill Name" />
            <button onClick={handleCreate}>Add Skill</button>
            <ul>
                {skills.map(s => (
                    <li key={s.id}>
                        {s.name}
                        <button onClick={() => handleUpdate(s.id)}>Edit</button>
                        <button onClick={() => handleDelete(s.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SkillsCRUD*/
/*
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function SkillsCRUD() {
    const [skills, setSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        proficiency: "",
        description: ""
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/skills")
            .then(res => res.json())
            .then(data => setSkills(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                setFormData({ name: "", category: "", proficiency: "", description: "" });
                window.location.reload(); // refresh table
            });
    };

    return (
        <div className="admin-main">
            <h1>Skills</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Skill</button>


            <table className="skills-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Category</th>
                    <th>Proficiency</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {skills.map(skill => (
                    <tr key={skill.id}>
                        <td>{skill.name}</td>
                        <td>{skill.category}</td>
                        <td>{skill.proficiency}%</td>
                        <td>
                            <button className="edit-btn">✏️</button>
                            <button className="delete-btn">🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Skill</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="tools">Tools</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Proficiency (%)"
                                value={formData.proficiency}
                                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SkillsCRUD;*/
/*import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function SkillsCRUD() {
    const [skills, setSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentSkill, setCurrentSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        level: "",
    });

    // Fetch skills from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/skills")
            .then((res) => res.json())
            .then((data) => setSkills(data))
            .catch((err) => console.error(err));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editMode ? "PUT" : "POST";
        const url = editMode
            ? `http://localhost:8080/api/skills/${currentSkill.id}`
            : "http://localhost:8080/api/skills";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                setShowModal(false);
                setEditMode(false);
                setFormData({ name: "", level: "" });
                window.location.reload();
            });
    };

    // Delete skill
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/skills/${id}`, { method: "DELETE" })
            .then(() => window.location.reload());
    };

    // Edit skill
    const handleEdit = (skill) => {
        setEditMode(true);
        setCurrentSkill(skill);
        setFormData({ name: skill.name, level: skill.level });
        setShowModal(true);
    };

    return (
        <div className="admin-main">
            <h1>Skills</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
                + Add Skill
            </button>


            <table className="skills-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {skills.map((skill) => (
                    <tr key={skill.id}>
                        <td>{skill.name}</td>
                        <td>{skill.level}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(skill)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(skill.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editMode ? "Edit Skill" : "Add Skill"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Skill Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <select
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                required
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">
                                    {editMode ? "Update" : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SkillsCRUD;*/
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function SkillsCRUD() {
    const [skills, setSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        level: "",
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/skills")
            .then((res) => res.json())
            .then((data) => setSkills(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                setShowModal(false);
                setFormData({ name: "", level: "" });
                window.location.reload();
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/skills/${id}`, { method: "DELETE" })
            .then(() => window.location.reload());
    };

    return (
        <div className="admin-main">
            <h1>Skills</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
                + Add Skill
            </button>

            {/* Skills Table */}
            <table className="skills-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {skills.map((skill) => (
                    <tr key={skill.id}>
                        <td>{skill.name}</td>
                        <td>{skill.level}</td>
                        <td>
                            <button className="edit-btn">Edit✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(skill.id)}>Delete🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Skill</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Skill Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <select
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                required
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SkillsCRUD;