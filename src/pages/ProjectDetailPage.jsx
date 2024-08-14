import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProjectDetailPage.css';
import Comments from '../components/Comments';

function ProjectDetailPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        async function fetchProject() {
            if (!id) {
                setError('Niciun proiect disponibil');
                return;
            }

            try {
                const metadataResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/files/${id}`);
                if (!metadataResponse.ok) {
                    throw new Error('Nu s-au putut prelua datele fisierului: ' + metadataResponse.status);
                }
                const file = await metadataResponse.json();
                setProject(file);
            } catch (error) {
                setError(error.message);
                console.error('Eroare preluare proiecte:', error);
            }
        }

        fetchProject();
    }, [id]);

    if (error) {
        return <div>Eroare: {error}</div>;
    }

    if (!project) {
        return <div>Incarcare...</div>;
    }

    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}/api/files/${project.filename}`;

    const renderPreview = () => {
        switch (project.contentType) {
            case 'application/pdf':
                return (
                    <div className="preview-container">
                        <iframe src={fileUrl} title="PDF Preview" frameBorder="0" className="file-preview pdf-preview" />
                    </div>
                );
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return (
                    <div className="preview-container">
                        <img src={fileUrl} alt={project.metadata?.title || 'No title available'} className="file-preview image-preview" />
                    </div>
                );
            case 'text/plain':
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return (
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="view-button">
                        Vizualizati Docomunet
                    </a>
                );
            default:
                return <div>Previzualizarea nu este disponiibila.</div>;
        }
    };

    return (
        <div className="project-detail-page">
            <div className="project-content">
                <div className="project-metadata">
                    <h2>{project.metadata?.title || 'No title available'}</h2>
                    <p>{project.metadata?.description || 'No description available'}</p>
                    <div>Author: {project.metadata?.name || 'No author information'}</div>
                    <div>Type: {project.metadata?.type || 'No type information'}</div>
                    <div>Difficulty: {project.metadata?.difficulty || 'No difficulty information'}</div>
                </div>
                <div className="project-file">
                    {renderPreview()}
                </div>
                {isAuthenticated && (
                    <Link to={`/edit/${id}`} className="edit-button">Editare Proiect</Link>
                )}
            </div>
            <div className="comments-section">
            {project.filename ? (
                    <Comments filename={project.filename} />
                ) : (
                    <div>Niciun fisier disponibil penru comentarii.</div>
                )}
            </div>
        </div>
    );
}

export default ProjectDetailPage;
