import { useEffect, useState } from "react";
import "../styles/admin.css";

function MediaCRUD() {
    const [media, setMedia] = useState([]);
    const [form, setForm] = useState({ title: "", url: "" });

    useEffect(() => { getMedia().then(setMedia); }, []);

    const handleCreate = async () => {
        const newMedia = await createMedia(form);
        setMedia([...media, newMedia]);
        setForm({ title: "", url: "" });
    };

    const handleUpdate = async (id) => {
        const updated = await updateMedia(id, form);
        setMedia(media.map(m => m.id === id ? updated : m));
    };

    const handleDelete = async (id) => {
        await deleteMedia(id);
        setMedia(media.filter(m => m.id !== id));
    };

    return (
        <div className="media-crud">
            <h1>Manage Media</h1>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="Image URL" />
            <button onClick={handleCreate}>Add Media</button>
            <ul>
                {media.map(m => (
                    <li key={m.id}>
                        {m.title}
                        <button onClick={() => handleUpdate(m.id)}>Edit</button>
                        <button onClick={() => handleDelete(m.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MediaCRUD;