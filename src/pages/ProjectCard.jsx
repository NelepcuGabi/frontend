import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css'; // Adjust path as necessary

const ProjectCard = ({ id, title, description, imageUrl, author, difficulty, type }) => {
  return (
    <Link to={`/project/${id}`} className="course-card-link">
      <div className="course-card">
        {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />}
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Autor: {author}</small>
        <br />
        <small>Dificultate: {difficulty}</small>
        <br />
        <small>Tip: {type}</small>
      </div>
    </Link>
  );
};

export default ProjectCard;
