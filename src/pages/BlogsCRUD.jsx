/*import { useEffect, useState } from "react";

import "../styles/admin.css";

function BlogsCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => { getBlogs().then(setBlogs); }, []);

    const handleCreate = async () => {
        const newBlog = await createBlog(form);
        setBlogs([...blogs, newBlog]);
        setForm({ title: "", content: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateBlog(id, form);
        setBlogs(blogs.map(b => b.id === id ? updated : b));
    };

    const handleDelete = async (id) => {
        await deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
    };

    return (
        <div className="blogs-crud">
            <h1>Manage Blogs</h1>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content"></textarea>
            <button onClick={handleCreate}>Add Blog</button>
            <ul>
                {blogs.map(b => (
                    <li key={b.id}>
                        {b.title}
                        <button onClick={() => handleUpdate(b.id)}>Edit</button>
                        <button onClick={() => handleDelete(b.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BlogsCRUD;*/
import React, { useState, useEffect } from "react";
import "../styles/admin.css";

function BlogsCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });

    // Fetch blogs
    useEffect(() => {
        fetch("http://localhost:8080/api/blogs")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error(err));
    }, []);

    // Add or update blog
    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editMode ? "PUT" : "POST";
        const url = editMode
            ? `http://localhost:8080/api/blogs/${currentBlog.id}`
            : "http://localhost:8080/api/blogs";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                setEditMode(false);
                setFormData({ title: "", content: "", category: "" });
                window.location.reload();
            });
    };

    // Delete blog
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/blogs/${id}`, { method: "DELETE" })
            .then(() => window.location.reload());
    };

    // Edit blog
    const handleEdit = (blog) => {
        setEditMode(true);
        setCurrentBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            category: blog.category
        });
        setShowModal(true);
    };

    return (
        <div className="admin-main">
            <h1>Blogs</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Blog</button>

            {/* Table */}
            <table className="crud-table">
                <thead>
                <tr>
                    <th>Title</th>

                    <th>Content</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map(blog => (
                    <tr key={blog.id}>
                        <td>{blog.title}</td>

                        <td>{blog.content}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(blog)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(blog.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editMode ? "Edit Blog" : "Add Blog"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Blog Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            <textarea
                                placeholder="Content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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

export default BlogsCRUD;