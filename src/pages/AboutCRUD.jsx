/*import { useEffect, useState } from "react";

import "../styles/admin.css";


function AboutCRUD() {
    const [about, setAbout] = useState({ description: "" });

    useEffect(() => { getAbout().then(setAbout); }, []);

    const handleUpdate = async () => {
        const updated = await updateAbout(about.id, about);
        setAbout(updated);
    };

    return (
        <div className="page">
            <h1>Manage About</h1>
            <textarea value={about.description} onChange={e => setAbout({ ...about, description: e.target.value })}></textarea>
            <button onClick={handleUpdate}>Update About</button>
        </div>
    );
}
export default AboutCRUD;*/

import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function AboutCRUD() {
    const [aboutList, setAboutList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentAbout, setCurrentAbout] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "" });

    // Fetch About entries
    useEffect(() => {
        fetch("http://localhost:8080/api/about")
            .then(res => res.json())
            .then(data => setAboutList(data))
            .catch(err => console.error(err));
    }, []);

    // Add or update About
    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editMode ? "PUT" : "POST";
        const url = editMode
            ? `http://localhost:8080/api/about/${currentAbout.id}`
            : "http://localhost:8080/api/about";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                setEditMode(false);
                setFormData({ title: "", description: "" });
                window.location.reload();
            });
    };

    // Delete About
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/about/${id}`, { method: "DELETE" })
            .then(() => window.location.reload());
    };

    // Edit About
    const handleEdit = (about) => {
        setEditMode(true);
        setCurrentAbout(about);
        setFormData({ title: about.title, description: about.description });
        setShowModal(true);
    };

    return (
        <div className="admin-main">
            <h1>About</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add About</button>

            {/* Table */}
            <table className="crud-table">
                <thead>
                <tr>

                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {aboutList.map(about => (
                    <tr key={about.id}>

                        <td>{about.description}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(about)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(about.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editMode ? "Edit About" : "Add About"}</h2>
                        <form onSubmit={handleSubmit}>

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

export default AboutCRUD;