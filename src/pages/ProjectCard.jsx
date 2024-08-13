import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css'; // Adjust path as necessary

const ProjectCard = ({ id, title, description, imageUrl, author, difficulty, type }) => {
  return (
    <Link to={`/files/${id}`} className="course-card-link">
      <div className="course-card">
        {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />}
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Author: {author}</small>
        <br />
        <small>Difficulty: {difficulty}</small>
        <br />
        <small>Type: {type}</small>
      </div>
    </Link>
  );
};

export default ProjectCard;
