import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/Edit.css';

function Edits() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProject() {
            if (!id) {
                setError('No project ID provided');
                return;
            }

            try {
                const metadataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/files/${id}`);
                if (!metadataResponse.ok) {
                    throw new Error('Failed to fetch project metadata. Status: ' + metadataResponse.status);
                }
                const file = await metadataResponse.json();
                setProject(file);
                setTitle(file.metadata?.title || '');
                setDescription(file.metadata?.description || '');
            } catch (error) {
                setError(error.message);
                console.error('Error fetching project:', error);
            }
        }

        fetchProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/files/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
            if (!response.ok) {
                throw new Error('Nu s-a putut realiza editarea: ' + response.status);
            }
            navigate(`/project/${id}`);
        } catch (error) {
            setError(error.message);
            console.error('Eroare la actualizarea proiectului:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-project-page">
            <div className="edit-project-content">
                <h2>Edit Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titlu:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descriere:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Salveaza</button>
                    </div>
                </form>
                <div className="project-metadata">
                    <div>Creat de: {project.metadata?.createdBy || 'Unknown'}</div>
                    {/* Afișează "Last modified by" doar dacă a fost modificat */}
                    {project.metadata?.modifiedBy && (
                        <div>Modificat de: {project.metadata.modifiedBy}</div>
                    )}
                    {project.metadata?.modifiedOn && (
                        <div>Ultima modificare pe: {new Date(project.metadata.modifiedOn).toLocaleString()}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Edits;
