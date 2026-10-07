/*import { useEffect, useState } from "react";

import "../styles/admin.css";

function EducationCRUD() {
    const [education, setEducation] = useState([]);
    const [form, setForm] = useState({ degree: "", institution: "", year: "" });

    useEffect(() => { getEducation().then(setEducation); }, []);

    const handleCreate = async () => {
        const newEdu = await createEducation(form);
        setEducation([...education, newEdu]);
        setForm({ degree: "", institution: "", year: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateEducation(id, form);
        setEducation(education.map(e => e.id === id ? updated : e));
    };

    const handleDelete = async (id) => {
        await deleteEducation(id);
        setEducation(education.filter(e => e.id !== id));
    };

    return (
        <div className="education-crud">
            <h1>Manage Education</h1>
            <input value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} placeholder="Degree" />
            <input value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} placeholder="Institution" />
            <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Year" />
            <button onClick={handleCreate}>Add Education</button>
            <ul>
                {education.map(e => (
                    <li key={e.id}>
                        {e.degree} - {e.institution}
                        <button onClick={() => handleUpdate(e.id)}>Edit</button>
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default EducationCRUD;*/import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function EducationCRUD() {
    const [educationList, setEducationList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null);
    const [formData, setFormData] = useState({
        degree: "",
        institution: "",
        year: ""
    });

    // Fetch education entries
    useEffect(() => {
        fetch("http://localhost:8080/api/education")
            .then(res => res.json())
            .then(data => setEducationList(data))
            .catch(err => console.error(err));
    }, []);

    // Add or update education
    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editMode ? "PUT" : "POST";
        const url = editMode
            ? `http://localhost:8080/api/education/${currentEducation.id}`
            : "http://localhost:8080/api/education";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                setEditMode(false);
                setFormData({ degree: "", institution: "", year: "" });
                window.location.reload();
            });
    };

    // Delete education
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/education/${id}`, { method: "DELETE" })
            .then(() => window.location.reload());
    };

    // Edit education
    const handleEdit = (edu) => {
        setEditMode(true);
        setCurrentEducation(edu);
        setFormData({
            degree: edu.degree,
            institution: edu.institution,
            year: edu.year
        });
        setShowModal(true);
    };

    return (
        <div className="admin-main">
            <h1>Education</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Education</button>

            {/* Table */}
            <table className="crud-table">
                <thead>
                <tr>
                    <th>Degree</th>
                    <th>Institution</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {educationList.map(edu => (
                    <tr key={edu.id}>
                        <td>{edu.degree}</td>
                        <td>{edu.institution}</td>
                        <td>{edu.year}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(edu)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(edu.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editMode ? "Edit Education" : "Add Education"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Degree"
                                value={formData.degree}
                                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">{editMode ? "Update" : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EducationCRUD;