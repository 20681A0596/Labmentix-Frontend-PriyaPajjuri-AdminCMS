import { useEffect, useState } from "react";

import "../styles/admin.css";

function ExperienceCRUD() {
    const [experience, setExperience] = useState([]);
    const [form, setForm] = useState({ role: "", company: "", duration: "" });

    useEffect(() => { getExperience().then(setExperience); }, []);

    const handleCreate = async () => {
        const newExp = await createExperience(form);
        setExperience([...experience, newExp]);
        setForm({ role: "", company: "", duration: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateExperience(id, form);
        setExperience(experience.map(e => e.id === id ? updated : e));
    };

    const handleDelete = async (id) => {
        await deleteExperience(id);
        setExperience(experience.filter(e => e.id !== id));
    };

    return (
        <div className="experience-crud">
            <h1>Manage Experience</h1>
            <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role" />
            <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company" />
            <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="Duration" />
            <button onClick={handleCreate}>Add Experience</button>
            <ul>
                {experience.map(e => (
                    <li key={e.id}>
                        {e.role} at {e.company} ({e.duration})
                        <button onClick={() => handleUpdate(e.id)}>Edit</button>
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ExperienceCRUD;